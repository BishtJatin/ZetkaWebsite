import React, { useEffect, useState } from 'react';



const Navbar = ({ toggleMenu, menuActive}) => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [xp, setXp] = useState({}); // Set the initial state to an empty object

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('https://mocki.io/v1/9859978d-3317-4920-aa81-f55c2045f6b6');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setXp(result.account || {}); // Make sure to set as an object
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);

console.log(xp);

return (
  <nav className="navbar flex flex-col md:flex-row items-center justify-between p-4 bg-black text-white">
    {/* Logo */}
    <div className="text-2xl font-bold">Zetka</div>

    {/* Mobile Menu Icon */}
    <div className="menu-icon md:hidden flex items-center cursor-pointer" onClick={toggleMenu}>
      <i className="fas fa-bars text-2xl"></i>
    </div>

    {/* Navbar Menu */}
    <div className={`navbar-menu flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 ${menuActive ? 'block' : 'hidden'} md:flex`}>
      <a href="#" className="hover:text-gray-400 transition">Rewards</a>
      <a href="#" className="hover:text-gray-400 transition">Collection</a>
      <a href="#" className="hover:text-gray-400 transition">Blog</a>
      <a href="#" className="hover:text-gray-400 transition">About</a>

      {/* Profile Info */}
      <div className="profile-info flex items-center mt-4 md:mt-0 md:ml-auto">
        <i className="fas fa-user-circle text-2xl mr-2"></i>
        <span className="hidden md:block mr-2">Jatin</span>
        <div className="bg-gray-800 p-2 rounded-full text-xs text-white">
          {xp.xp ? `${xp.xp} TLOS` : 'Loading TLOS'}
        </div> {/* Use xp.xp or another valid property here */}
      </div>
    </div>
  </nav>
)

}

export default Navbar



