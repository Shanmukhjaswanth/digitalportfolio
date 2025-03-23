import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "", link: "" });
  const [editId, setEditId] = useState(null);
  const userId = localStorage.getItem("userId") || "1"; // Replace with actual authentication method

  const fetchPortfolios = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/portfolio/${userId}`);
      setPortfolios(response.data);
    } catch (error) {
      alert("Error fetching portfolios");
    }
  }, [userId]); 

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/portfolio/${editId}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/portfolio", { ...formData, userId });
      }
      fetchPortfolios();
      setFormData({ title: "", description: "", link: "" });
      setEditId(null);
    } catch (error) {
      alert("Error saving portfolio");
    }
  };

  const handleEdit = (portfolio) => {
    setFormData({ title: portfolio.title, description: portfolio.description, link: portfolio.link });
    setEditId(portfolio.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/portfolio/${id}`);
      fetchPortfolios();
    } catch (error) {
      alert("Error deleting portfolio");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center py-10">
      <h2 className="text-4xl font-extrabold text-white text-center mb-6">Your Portfolio</h2>
      
      {/* Portfolio Form */}
      <div className="bg-white/80 backdrop-blur-md p-6 shadow-lg rounded-xl max-w-lg w-full mx-4 transition hover:scale-105">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="title" 
            placeholder="Project Title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <textarea 
            name="description" 
            placeholder="Project Description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          />
          <input 
            type="url" 
            name="link" 
            placeholder="Project Link" 
            value={formData.link} 
            onChange={handleChange} 
            required 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            {editId ? "Update Project" : "Add Project"}
          </button>
        </form>
      </div>

      {/* Portfolio Items */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {portfolios.length > 0 ? (
          portfolios.map((portfolio) => (
            <div 
              key={portfolio.id} 
              className="bg-white/80 backdrop-blur-md p-6 shadow-lg rounded-xl transition hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-2xl font-semibold text-gray-800">{portfolio.title}</h3>
              <p className="text-gray-600 mt-2">{portfolio.description}</p>
              <a 
                href={portfolio.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 font-medium hover:underline mt-3 inline-block"
              >
                View Project
              </a>
              <div className="mt-4 flex space-x-3">
                <button 
                  onClick={() => handleEdit(portfolio)} 
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(portfolio.id)} 
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center w-full col-span-3">No projects found. Start adding now!</p>
        )}
      </div>
    </div>
  );
}

export default Portfolio;




