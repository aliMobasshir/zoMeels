import React, { useEffect, useState } from "react";
import api from "../../lib/api";
import FeedStatus from "./components/FeedStatus";
import ReelFeed from "./components/ReelFeed";

const FEED_ENDPOINT = "/api/food";

const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function likeVideo(item) {
    try {
      const response = await api.post("/api/food/like", { foodId: item._id });

      if (response.data.like) {
        console.log("video liked");
        setFoodItems((prev) =>
          prev.map((f) =>
            f._id === item._id ? { ...f, likesCount: (f.likesCount ?? 0) + 1 } : f
          )
        );
      } else {
        console.log("video unliked");
        setFoodItems((prev) =>
          prev.map((f) =>
            f._id === item._id
              ? { ...f, likesCount: Math.max(0, (f.likesCount ?? 0) - 1) }
              : f
          )
        );
      }
    } catch (err) {
      console.error("Failed to like/unlike video:", err);
    }
  }

  async function saveVideo(item) {
    try {
      const response = await api.post("/api/food/save", { foodId: item._id });

      console.log("Save response data:", response.data);

      if (response.data.save) {
        console.log("video saved");
        setFoodItems((prev) =>
          prev.map((f) =>
            f._id === item._id ? { ...f, savedCount: (f.savedCount ?? 0) + 1 } : f
          )
        );
      } else {
        console.log("video unsaved");
        setFoodItems((prev) =>
          prev.map((f) =>
            f._id === item._id
              ? { ...f, savedCount: Math.max(0, (f.savedCount ?? 0) - 1) }
              : f
          )
        );
      }
    } catch (err) {
      console.error("Failed to save/unsave video:", err);
    }
  }

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await api.get(FEED_ENDPOINT);

        setFoodItems(response.data?.foodItems ?? []);
        setError("");
      } catch (err) {
        const message =
          err.response?.status === 401
            ? "Please login as a user to view the food reels feed."
            : "We could not load the video feed right now.";

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  if (loading) {
    return (
      <FeedStatus
        title="Loading reels..."
        message="Preparing your fullscreen video feed."
        compact
      />
    );
  }

  if (error) {
    return (
      <FeedStatus
        title="Feed unavailable"
        message={error}
        showLogin={error.includes("Please login")}
      />
    );
   
  }

  if (!foodItems.length) {
    return (
      <FeedStatus
        title="No reels yet"
        message="Food partner videos will appear here once they are uploaded."
      />
    );
  }

  return <ReelFeed foodItems={foodItems} onLike={likeVideo} onSave={saveVideo} />;
};

export default Home;
