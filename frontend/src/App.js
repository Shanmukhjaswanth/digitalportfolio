import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Portfolio from "./components/Portfolio";

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-wide">Createfolio</h1>
          <div className="space-x-6">
            <Link to="/" className="hover:text-gray-300 transition duration-200">Home</Link>
            <Link to="/signup" className="hover:text-gray-300 transition duration-200">Signup</Link>
            <Link to="/login" className="hover:text-gray-300 transition duration-200">Login</Link>
            <Link to="/portfolio" className="hover:text-gray-300 transition duration-200">Portfolio</Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mx-auto">
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-white text-center">
                <h1 className="text-6xl font-extrabold text-gray-800 mb-6 animate-fadeIn">
                  Welcome to <span className="text-blue-600">Createfolio</span>
                </h1>
                <p className="text-lg text-gray-600 italic mb-6 animate-fadeIn delay-200">
                  "Showcase your talent with a stunning portfolio."
                </p>
                <Link 
                  to="/signup" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg shadow-md transition duration-300"
                >
                  Get Started
                </Link>
              </div>
            } 
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;







