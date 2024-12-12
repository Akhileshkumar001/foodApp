import React, { useState, useEffect, useContext } from 'react';
import { FoodContext } from '../component/ContextReducer'; // Adjust import path if needed
import Card from '../component/Cardss'; // Adjust import path if needed
import './Search.css'; // Add your styles here

const Search = ({ category }) => { // Accept category as a prop
  const { foodItems } = useContext(FoodContext); // Get foodItems from context
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    let results = foodItems;

    // Filter by category if provided
    if (category) {
      results = results.filter(item => item.CategoryName === category);
    }

    // Filter by search term
    if (searchTerm.trim() !== '') {
      results = results.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Remove duplicate items based on _id using a Set
    const uniqueResults = Array.from(new Set(results.map(item => item._id)))
      .map(id => results.find(item => item._id === id));

    setFilteredItems(uniqueResults);
  }, [searchTerm, category, foodItems]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // No need to set searchTriggered state here
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for food items..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="search-results">
        {searchTerm && filteredItems.length > 0 ? (
          filteredItems.map(item => <Card key={item._id} item={item} />)
        ) : searchTerm && filteredItems.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <p>Type something to start searching.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
