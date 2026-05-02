import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppShell from "../components/AppShell";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import Home from "../pages/general/Home";
import Saved from "../pages/general/Saved";
import CreateFood from "../pages/foodPartner/CreateFood";
import Profile from "../pages/foodPartner/Profile";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/createFood" element={<CreateFood />} />
          <Route path="/foodPartner/:id" element={<Profile />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/foodPartner/register" element={<FoodPartnerRegister />} />
          <Route path="/foodPartner/login" element={<FoodPartnerLogin />} />
          <Route path="/user/saved" element={<Saved />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
