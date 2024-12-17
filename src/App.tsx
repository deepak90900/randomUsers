import React, { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHome, FaHeart } from "react-icons/fa"; // Importing icons

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<"home" | "favorite">("home");

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={2000} />

      {/* Screen Content */}
      <div className="flex-grow overflow-auto">
        {currentTab === "home" ? <HomeScreen /> : <FavoriteScreen />}
      </div>

      {/* Bottom Navigation */}
      <div className="h-20 bg-white fixed bottom-0 left-0 w-full flex justify-around items-center border-t shadow-lg">
        <button
          onClick={() => setCurrentTab("home")}
          className={`flex flex-col items-center justify-center ${
            currentTab === "home"
              ? "text-pink-500 font-bold"
              : "text-gray-400 hover:text-pink-500"
          } transition-all duration-300`}
        >
          <FaHome className="text-2xl mb-1" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setCurrentTab("favorite")}
          className={`flex flex-col items-center justify-center ${
            currentTab === "favorite"
              ? "text-pink-500 font-bold"
              : "text-gray-400 hover:text-pink-500"
          } transition-all duration-300`}
        >
          <FaHeart className="text-2xl mb-1" />
          <span>Favorite</span>
        </button>
      </div>
    </div>
  );
};

export default App;
