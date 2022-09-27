import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/recipes");
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data,
    });
  };
}

export function getDiets() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/diets");
    return dispatch({
      type: "GET_DIETS",
      payload: json.data,
    });
  };
}
export function sortByName(payload) {
  return {
    type: "SORT_BY_NAME",
    payload,
  };
}
export function sortByHS(payload) {
  return {
    type: "SORT_BY_HS",
    payload,
  };
}
export function sortByDiet(payload) {
  return {
    type: "SORT_BY_DIET",
    payload,
  };
}
export function getDetail(id) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/recipes/${id}`);
    return dispatch({
      type: "GET_DETAIL",
      payload: json.data,
    });
  };
}
export function getByName(name) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
    return dispatch({
      type: "GET_BY_NAME",
      payload: json.data,
    });
  };
}
export function createRecipe(payload) {
  return async function (dispatch) {
    let response = await axios.post("http://localhost:3001/recipes", payload);
    return response;
  };
}
