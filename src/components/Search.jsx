import React from 'react';

const Search = (props) => {
  return (
    <div className="search">
      <input
      	type="search"
        className="search__input"
        name="search"
        placeholder="🔍 busca tu taco o categoría"
        onChange={event => props.onSearch(event.target.value)}
      />
    </div>
  );
};

export default Search;