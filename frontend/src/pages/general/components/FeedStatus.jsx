import React from "react";
import { Link } from "react-router-dom";

function FeedStatus({ title, message, compact = false, showLogin = false }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-center text-white">
      <div
        className={
          compact
            ? ""
            : "max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
        }
      >
        <p className="text-lg font-semibold">{title}</p>
        <p className="mt-2 text-sm leading-6 text-white/70">{message}</p>
        {showLogin ? (
          <Link to="/user/login">
            <button className="bg-red-400 text-black px-3 py-1 mt-2 rounded-xl cursor-pointer text-md font-semibold">
              Login
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default FeedStatus;
