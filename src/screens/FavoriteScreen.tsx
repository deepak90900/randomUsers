import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeFavorite } from "../redux/favoriteSlice";

const FavoriteScreen: React.FC = () => {
  const favoriteUsers = useSelector(
    (state: RootState) => state.favorites.favoriteUsers
  );
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-pink-500">Favorite Users</h2>

      {/* Empty State */}
      {favoriteUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-12">
          <img
            src="https://via.placeholder.com/200x150?text=No+Favorites"
            alt="No Favorites"
            className="mb-4"
          />
          <p className="text-gray-500 text-center text-lg">
            You have no favorite users yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3 animate-fade-in">
          {favoriteUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-md shadow-md  transition-transform duration-300 hover:bg-pink-50"
            >
              {/* User Info */}
              <div className="flex items-center">
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-14 h-14 rounded-full border-2 border-pink-300"
                />
                <div className="ml-4">
                  <h3 className="font-bold text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.location}</p>

                  {/* Display Tags */}
                  <div className="flex gap-2 mt-1">
                    {user.tags &&
                      user.tags.map((tag, index) => (
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

              {/* Remove Favorite Button */}
              <button
                onClick={() => dispatch(removeFavorite(user.id))}
                className="text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition-all duration-200"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteScreen;
