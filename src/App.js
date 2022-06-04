import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/comp/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Movie from './components/pages/Movie';
import MovieDetail from './components/pages/MovieDetails';
import Search from './components/pages/Search';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile';
//import Rated from './components/pages/ARate';
//import Footer from './components/comp/Footer';

function App() {
  // the main routing function
  return (
  <BrowserRouter>
    <Navbar />
  <Routes>
    <Route exact path="/" element={<Home />}></Route>
    <Route exact path="/about" element={<About /> }></Route>
    <Route exact path="/register" element={<Register /> }></Route>
    <Route exact path="/login" element={<Login /> }></Route>
    <Route exact path="/profile/:id" element={<Profile /> }></Route>
    <Route exact path="/movieList" element={<Movie /> }> </Route>
    <Route exact path="/movie/:id" element={<MovieDetail /> }> </Route>
    <Route exact path="/search/:keyword" element={<Search /> }> </Route>
    {/*<Route exact path="/rate/movieID=:id&rate=:rate" element={<Rated /> }></Route>*/}
  </Routes>
  </BrowserRouter>
  );
}

export default App;
