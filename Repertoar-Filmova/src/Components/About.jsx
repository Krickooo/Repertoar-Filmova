import React from "react";
import { Routes, Route } from "react-router-dom";
import AppInfo from "./AppInfo";
import AuthorInfo from "./AuthorInfo";

const About = () => {
  return (
    <div>
      <h2>O aplikaciji</h2>
      <Routes>
        <Route path="app" element={<AppInfo />} />
        <Route path="author" element={<AuthorInfo />} />
      </Routes>
    </div>
  );
};

export default About;