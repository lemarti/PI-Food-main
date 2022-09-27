require("dotenv").config();
const { Router } = require("express");
const { DietType } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
const router = Router();
let basicDiets = [
  "glutenfree",
  "ketogenic",
  "vegetarian",
  "lactovegetarian",
  "ovovegetarian",
  "vegan",
  "pescetarian",
  "paleo",
  "primal",
  "lowfodmap",
  "whole30",
  "lactoovovegetarian",
  "dairyfree",
  "paleolithic",
];

let formatData = basicDiets.map((diet) => {
  return { name: `${diet}` };
});

/* let search = (arr) => {
  arr.forEach((element) => {
    if (basicDiets.indexOf(element) === -1) {
      basicDiets.push(element);
    }
  });
  return basicDiets;
}; */
/* 
let getMoreDiets = async () => {
  try {
    let promiseAPI = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=30`
    );
    let diets = await promiseAPI.data.results?.map(({ diets }) => {
      return diets?.map((e) => e.replace(/ /g, "").toLowerCase());
    });

    return diets;
  } catch (error) {
    console.log(error);
  }
}; */

router.get("", async (req, res) => {
  try {
    const promiseDB = await DietType.findAll({
      //devuelve tabla como arr obj
      attributes: ["name"],
    });

    if (promiseDB.length === 0) {
      let basic = await DietType.bulkCreate(formatData);
      res.json(basic);
    } else {
      res.json(promiseDB);
      /*  let moreDiets = await getMoreDiets();
      let merged = moreDiets.flat(1);
      merged = merged.filter((e) => {
        return basicDiets.indexOf(e) == -1 ? true : false;
      });
      res.send(merged); */
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
