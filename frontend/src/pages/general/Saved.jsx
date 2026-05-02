import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedStatus from "./components/FeedStatus";
import ReelFeed from "./components/ReelFeed";

const FEED_ENDPOINT = "http://localhost:3000/api/food/saved";

function normalizeSavedFoods(savedVideos) {
  return (savedVideos ?? [])
    .map((savedItem) => savedItem?.food)
    .filter(Boolean);
}

const Saved = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function likeVideo(item) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/like",
        { foodId: item._id },
        { withCredentials: true }
      );

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
      const response = await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId: item._id },
        { withCredentials: true }
      );

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
        setFoodItems((prev) => prev.filter((f) => f._id !== item._id));
      }
    } catch (err) {
      console.error("Failed to save/unsave video:", err);
    }
  }

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(FEED_ENDPOINT, {
          withCredentials: true,
        });

        setFoodItems(normalizeSavedFoods(response.data?.savedVideos));
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
    return <FeedStatus title="Feed unavailable" message={error} />;
  }

  if (!foodItems.length) {
    return <FeedStatus title="No reels yet" message="No reels saved yet" />;
  }

  return <ReelFeed foodItems={foodItems} onLike={likeVideo} onSave={saveVideo} />;
};

export default Saved;
