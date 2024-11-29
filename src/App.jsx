import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import TV from "./pages/TV";
import SignUp from "./pages/SignUp";
import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import UserLiked from "./pages/UserLiked";

import Family from "./pages/Family";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Netflix />}></Route>
        <Route exact path="/player" element={<Player />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<SignUp />}></Route>
        <Route exact path="/movies" element={<Movies />}></Route>
        <Route exact path="/tv" element={<TV />}></Route>
        <Route exact path="/mylist" element={<UserLiked />}></Route>
        <Route exact path="/familywanttowatch" element={<Family />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
