import React from "react";
import { Outlet } from "react-router-dom";
import BrandLogo from "./BrandLogo";

function AppShell() {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed top-4 left-4 z-50 sm:top-5 sm:left-5">
        <div className="pointer-events-auto">
          <BrandLogo />
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default AppShell;
