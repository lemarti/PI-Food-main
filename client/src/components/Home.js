import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDiets,
  getRecipes,
  sortByName,
  sortByHS,
  sortByDiet,
} from "../actions/index";
import { Link } from "react-router-dom";
import Card from "./Card";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import HomeS from "../CSS/HomeS.module.css";
export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const diets = useSelector((state) => state.diets);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const lastRecipe = currentPage * recipesPerPage;
  const firstRecipe = lastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(firstRecipe, lastRecipe);
  const [order, setOrder] = useState("");
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]); //si no usamos los brackets vacíos rerenderiza sin parar
  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }
  function orderByName(e) {
    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Sort by ${e.target.value}`);
  }
  function orderByHS(e) {
    dispatch(sortByHS(e.target.value));
    setCurrentPage(1);
    setOrder(`Sort by ${e.target.value}`);
  }
  function orderByDiet(e) {
    dispatch(sortByDiet(e.target.value));
    setCurrentPage(1);
    setOrder(`Sort by ${e.target.value}`);
  }
  return (
    <div>
      
      <div className={HomeS.Header}>
      <h1 className={HomeS.Title}>
        Welcome!! Enjoy a large amount of classified recipes and create your
        owns
      </h1>
      <SearchBar></SearchBar>
        <select
          onChange={(e) => {
            orderByName(e);
          }}
        >
          {/* <option label="Select your city">Select your city</option> */}
          {/* <option selected="selected"> sort alphabetically</option> */}
          <option selected hidden>
            Sort alphabetically
          </option>
          <option value="asc">ascending</option>
          <option value="des">descending</option>
        </select>
        <select
          onChange={(e) => {
            orderByHS(e);
          }}
        >
          <option selected hidden>
            Sort by healthScore
          </option>
          <option value="ascH">lowest HS</option>
          <option value="desH">highest HS</option>
        </select>
        <select
          onChange={(e) => {
            orderByDiet(e);
          }}
        >
          <option selected hidden>
            Sort by diet type
          </option>
          {diets?.map((el) => {
            return <option value={el.name}>{el.name}</option>;
          })}
        </select>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Refresh all recipes
        </button>
        <div>
          <Link to="/create">Add your own recipe!</Link>
        </div>
      </div>

      <div className={HomeS.CardsContainer}>
        {currentRecipes?.map((el) => {
          return (
            <React.Fragment>
              <Card
                title={el.title}
                image={el.image}
                diets={el.diets}
                id={el.id}
                key={el.id}
              />
            </React.Fragment>
          );
        })}
      </div>
      <div className={HomeS.paginationContainer}>
        <Pagination
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          pagination={pagination}
        />
      </div>
    </div>
  );
}
