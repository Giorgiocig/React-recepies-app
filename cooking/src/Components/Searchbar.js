import "./Searchbar.css";
import { useState } from "react";
import React from "react";
import { useHistory } from "react-router-dom";

export default function Searchbar() {
  const [term, setTerm] = useState("");
  const history = useHistory();

  const handleSubmit = function (e) {
    e.preventDefault();
    history.push(`/search?q=${term}`);
  };

  //?q is a query parameter. ie ?q=pizza but pizza is gonna be a dynamic parameter. /search because in App.js we set it in Route

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">search for</label>
        <input
          type="text"
          id="search"
          onChange={(e) => setTerm(e.target.value)}
          required
        />
      </form>
    </div>
  );
}
