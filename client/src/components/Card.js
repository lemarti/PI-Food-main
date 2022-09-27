import React from "react";
import CardS from "../CSS/CardS.module.css"
import { Link } from "react-router-dom";
export default function Card({ title, image, diets,id }) {
  return (
    <div className={CardS.Container}>
      <Link to={`/recipe/${id}`}>
        <h3>{title}</h3>
      </Link>
      <ul>
        {diets?.map((diet) => {
          return (
            <li>
              <h5>{diet}</h5>
            </li>
          );
        })}
      </ul>
      <Link to={`/recipe/${id}`}>
        <img className={CardS.Image} src={image} alt="img not found" width="200px" height="200px" />
      </Link>
    </div>
  );
}
