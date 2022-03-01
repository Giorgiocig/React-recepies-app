import "./Create.css";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState(""); //it contains the ingredient inputted by the user So we're tracking what they're typing, to be afterwards pushed inside the ingredients array
  const [ingredients, setIngredients] = useState([]); //ingredients array
  const ingredientInput = useRef(null);
  const history = useHistory();

  const { postData, data, error } = useFetch(
    " http://localhost:3000/recipes",
    "POST"
  );
  //we are importing useData from our hook

  const handleSubmit = function (e) {
    e.preventDefault();
    postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    });
    //it is a function to send data to the db. Note that the argument of post data is an object containing all the specifies for one recepy We don t need a key value beause json file will add it automatically
  };

  const handleAdd = function (e) {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  //redirect the user when we get a response

  useEffect(() => {
    if (data) {
      history.push("/");
    }
  }, [data]);

  return (
    <div className="create">
      <h2 className="page-title"> Add a new recipes</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipes ingredients: </span>{" "}
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button className="btn" onClick={handleAdd}>
              add
            </button>
          </div>
        </label>

        <p>
          current ingredient
          {ingredients.map((el) => (
            <em key={el.key}>{el},</em>
          ))}
        </p>

        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking Time(min)</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn">submit</button>
      </form>
    </div>
  );
}
