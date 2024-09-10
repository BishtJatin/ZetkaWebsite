// src/App.js
import React, { useState, useEffect } from "react";
import NewPage from './components/NewPage';
import Card from "./components/Card";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import RecruiterBox from "./components/RecruiterBox";
import './App.css'; // Import the CSS file

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mocki.io/v1/84c8c12a-4ee4-472b-b51f-a020823b2925');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result?.books || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const itemsPerPage = 10; // Set this to however many items you want per page
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="app-background text-white w-full h-screen overflow-y-hidden">
      <Navbar toggleMenu={toggleMenu} menuActive={menuActive} />
      
      <div className="flex flex-row h-full">
        <div className="flex flex-row overflow-x-auto w-full">
          <div className="flex flex-col sticky top-0">
            <Sidebar />
            <RecruiterBox />
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row min-w-[100vw] h-full overflow-x-auto no-scrollbar">
              <Card data={data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)} />
            </div>
          </div>
        </div>

        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
          <NewPage
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
