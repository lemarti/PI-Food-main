import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function DetailsPage(props) {
  const dispatch = useDispatch();
  const { id } = props.match.params;

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const recipe = useSelector((state) => state.detail);
  return (
    <div>
      {recipe.length > 0 ? (
        <div>
          <h1>{recipe[0].title}</h1>
          <img
            src={recipe[0].image}
            alt="altern"
            width="500px"
            height="700px"
          />

          <h2>Diet type: {recipe[0].diets?.map((e) => e + " ")}</h2>
          <h2>
            DishTypes:
            {recipe[0].dishTypes?.map((e) => {
              return (
                <ul>
                  <li>{e}</li>
                </ul>
              );
            })}
          </h2>

          <h2>
            summary:<p>{recipe[0].summary}</p>
          </h2>
         
          <h2>Healthscore:{recipe[0].healthScore}</h2>

          <h2>
            Step by step:
            <p>{recipe[0].stepByStep}</p>
          </h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home">
        <button>Volver</button>
      </Link>
    </div>
  );
}
/* [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
[ ] Resumen del plato
[ ] Nivel de "comida saludable" (health score)
[ ] Paso a paso */
