import React from "react";
import { Link } from "react-router-dom";

function BrandLogo() {
  return (
    <Link
      to="/"
      aria-label="zoMeels home"
      className="inline-flex items-center rounded-[1.4rem] bg-[#dd7476] px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.14)] transition-transform hover:scale-[1.01]"
    >
      <span className="flex items-end text-[1.5rem] font-black leading-none tracking-[-0.08em] text-black sm:text-[1.9rem]">
        <span>zo</span>
        <span className="mx-[0.02em] text-[#ffd3d5]">M</span>
        <span>eels</span>
      </span>
    </Link>
  );
}

export default BrandLogo;
