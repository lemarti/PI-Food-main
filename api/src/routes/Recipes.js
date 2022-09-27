require("dotenv").config();
const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, DietType } = require("../db");
const { Op } = require("sequelize");

const PromiseApi = async () => {
  const resp = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );

  const recipes = await resp.data.results?.map(
    ({
      id,
      title,
      image,
      summary,
      analyzedInstructions,
      dishTypes,
      healthScore,
      diets,
    }) => ({
      id,
      title,
      image,
      summary,
      dishTypes,
      healthScore,
      diets:diets.map(e=>e.replace(/ /g, "").toLowerCase()),
      stepByStep: analyzedInstructions[0]?.steps.map(({ number, step }) =>
        formatData(number, step)
      ),
    })
  );

  return recipes;
};

const PromiseDB = async () => {
  return await Recipe.findAll({
    include: {
      model: DietType,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
};

const NameByQuery = async (name) => {
  let resp = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100&query=${name}`
  );

  let ApiRecipes = await resp.data.results?.map(
    ({
      id,
      title,
      image,
      summary,
      analyzedInstructions,
      dishTypes,
      healthScore,
      diets,
    }) => ({
      id,
      title,
      image,
      summary,
      dishTypes,
      healthScore,
      diets,
      stepByStep: analyzedInstructions[0]?.steps.map(({ number, step }) =>
        formatData(number, step)
      ),
    })
  );

  let DbRecipes = async () => {
    return await Recipe.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: {
        model: DietType,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
  };

  let Db = await DbRecipes();
  let AllByName = await ApiRecipes.concat(Db);
  return AllByName;
};

let formatData = (number, step) => {
  let text = number.toString();
  let cleanNumber = "Step: " + text;

  let cleanStep = step.replaceAll("&amp", "");
  let join = [cleanNumber].concat(cleanStep).join().replace(",", " - ");

  return join;
};
router.get("", async (req, res) => {
  let { name } = req.query;

  if (name) {
    let recipes = await NameByQuery(name);
    recipes.length
      ? res.json(recipes)
      : res.send("lo siento, no se han encontrado resultados");
  } else {
    const ApiInfo = await PromiseApi();
    const DbInfo = await PromiseDB();
    let GetAllRecipes = ApiInfo.concat(DbInfo);

    res.send(GetAllRecipes);
  }
});

router.get("/:id", async (req, res) => {
 
    let { id } = req.params;
    if (id) {

      try {
      let findInDb = await Recipe.findByPk(id, {
        attributes: ["name", "summary", "stepByStep", "healthScore", "image"],
        include: {
          model: DietType,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });

      if (findInDb) return res.json(findInDb)
    } catch (error) {console.log}
    try {
      
    
    let searchInApi = async (id) => {
      let resp = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
     
      if (resp.data){
        let ={
        title,
        image,
        summary,
        analyzedInstructions,
        dishTypes,
        healthScore,
        diets,
      }=resp.data 
      

      let found = {
        id,
        title,
        image,
        summary:summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
        dishTypes:dishTypes?dishTypes:"no classified",
        healthScore,
        diets:diets?diets:"no classified",
        stepByStep: analyzedInstructions[0]?.steps.map(
          ({ number, step }) => {
            return formatData(number, step);
          }
        ),
      };
      
      found?res.send(found)
      :res.json("no encontramos resutados")
    }
    }
    searchInApi(id); 
  } catch (error) {
      console.log(error)
  }   
    }
    else{res.send("coloca un numero de id a continuacion de la barra")}
     
  
});

router.post("", async (req, res) => {
  let { name, summary, stepByStep, healthScore, dietType } = req.body;
  if ((!name, !summary, !stepByStep, !healthScore, !dietType)) {
    res.send("all the fields are required");
  } else {
    let newRecipe = await Recipe.create({
      name,
      summary,
      stepByStep,
      healthScore,
    });
    for (let i = 0; i < dietType.length; i++) {
      let Dtype = await DietType.findAll({ where: { name: dietType[i] } });
      newRecipe.addDietType(Dtype);
    }
    res.send(`${name} was created succesfully`);
  }
});
module.exports = router;
/* Únicos Endpoints/Flags que pueden utilizar
GET https://api.spoonacular.com/recipes/complexSearch
Para obtener mayor información sobre las recetas, como por ejemplo el tipo de dieta deben agregar el flag &addRecipeInformation=true a este endpoint
Para los tipos de dieta deben tener en cuenta las propiedades vegetarian, vegan, glutenFree por un lado y también analizar las que se incluyan dentro de la propiedad diets
GET https://api.spoonacular.com/recipes/{id}/information */
