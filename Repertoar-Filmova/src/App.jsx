import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import About from "./Components/About";
import MoviesList from "./Components/MoviesList";
import MovieForm from "./Components/MovieForm";
import "./Styles/main.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/*" element={<About />} />
          <Route path="/movies" element={<MoviesList />} />
          <Route path="/movies/add" element={<MovieForm />} />
          <Route path="/movies/edit/:id" element={<MovieForm />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;