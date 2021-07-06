import React from 'react';


const Search = ({ search, searchInput, handleSearch }) => {
  return (
    <div className="search">
      <input placeholder="Search by name..."
        className="searchbar--input" type="text" value={search} ref={searchInput} onChange={handleSearch} />
    </div>
  );
}

export default Search;