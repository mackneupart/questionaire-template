import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Introduction />
      <Footer />
    </div>
  );
}

export default App;
