import "./RecipeList.css";
import { Link } from "react-router-dom";
import React from "react";

export default function RecipeList({ recipes }) {
  if (recipes.length === 0) {
    return <div className="error">No recepies :( </div>;
  }
  //we are returning something is we don t have any recepies
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="card">
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipe/${recipe.id}`}>Cook this</Link>
        </div>
      ))}
    </div>
  );
}

//substring is generating a new string made of 100 characters. It for showing only the first 100 characters
