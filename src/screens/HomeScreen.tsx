import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addFavorite } from "../redux/favoriteSlice";
import { toast } from "react-toastify";

interface User {
  id: string;
  name: string;
  profilePicture: string;
  location: string;
  tags: string[];
}

const HomeScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const dispatch = useDispatch();
  const favoriteUsers = useSelector(
    (state: RootState) => state.favorites.favoriteUsers
  );

  const generateTags = (): string[] => {
    const tagsPool = [
      "Music",
      "Travel",
      "Photography",
      "Hiking",
      "Coding",
      "Gaming",
    ];
    return [tagsPool[Math.floor(Math.random() * tagsPool.length)]];
  };

  const fetchUsers = async (isRefresh = false) => {
    if (loading || (!hasMore && !isRefresh)) return;

    setLoading(true);
    setError(false);

    const MAX_RETRIES = 3;
    let retries = 0;

    while (retries < MAX_RETRIES) {
      try {
        const response = await fetch(
          `https://randomuser.me/api/?results=10&page=${isRefresh ? 1 : page}`
        );

        if (!response.ok) throw new Error("API Error");

        const data = await response.json();

        if (data.results.length === 0) {
          setHasMore(false);
          break;
        }

        const formattedUsers = data.results.map((user: any) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          profilePicture: user.picture.medium,
          location: `${user.location.city}, ${user.location.country}`,
          tags: generateTags(),
        }));

        if (isRefresh) {
          setUsers(formattedUsers);
          setPage(2);
          setHasMore(true);
        } else {
          setUsers((prev) => [...prev, ...formattedUsers]);
          setPage((prev) => prev + 1);
        }
        break;
      } catch (err) {
        retries++;
        if (retries >= MAX_RETRIES) {
          setError(true);
          toast.error("Failed to load users after multiple attempts.");
        }
      }
    }

    setLoading(false);
  };

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      const threshold = 100; // pixels from bottom

      if (
        !loading &&
        hasMore &&
        scrollHeight - scrollTop <= clientHeight + threshold
      ) {
        fetchUsers();
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRefresh = () => {
    setHasMore(true);
    fetchUsers(true);
  };

  return (
    <div
      className="p-4 h-full overflow-auto"
      onScroll={handleScroll}
      style={{ minHeight: "100vh" }}
    >
      <button
        onClick={handleRefresh}
        className="mb-4 p-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
      >
        Refresh Users
      </button>

      {error && (
        <p className="text-red-500 text-center mb-4">
          Something went wrong. Please try again.
        </p>
      )}

      {users.map((user) => {
        const isFavorited = favoriteUsers.some((fav) => fav.id === user.id);

        return (
          <div
            key={user.id}
            className="flex items-center justify-between bg-gray-100 p-3 mb-2 rounded-md shadow transition-transform duration-300 hover:bg-pink-50"
          >
            <div className="flex items-center">
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-12 h-12 rounded-full"
                loading="lazy"
              />
              <div className="ml-4">
                <h3 className="font-bold">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.location}</p>
                <div className="flex gap-2 mt-1">
                  {user.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-pink-100 text-pink-500 text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                dispatch(addFavorite(user));
                toast.success(`${user.name} added to favorites!`);
              }}
              disabled={isFavorited}
              className={`text-pink-500 ${
                isFavorited
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-110"
              } text-3xl flex items-center justify-center transition-transform`}
            >
              {isFavorited ? "★" : "☆"}
            </button>
          </div>
        );
      })}

      {loading && (
        <div className="text-center my-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500 mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading...</p>
        </div>
      )}

      {!hasMore && users.length > 0 && (
        <p className="text-center text-gray-500 my-4">No more users to load</p>
      )}
    </div>
  );
};

export default HomeScreen;
