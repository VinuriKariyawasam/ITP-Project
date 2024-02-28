import React from "react";
import "./SearchBar.css";

export default function SearchBar() {
  return (
    <div className="search-bar">
      <form
        className="search-form d-flex align-item-center"
        method="POST"
        action="#"
      >
        <input
          type="text"
          name="query"
          placeholder="Search"
          title="Enter serch keyword"
        />
        <button type="submit" title="Search">
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  );
}
