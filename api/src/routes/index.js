const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const RecipesRoute = require("./Recipes");
const DietsRoute = require("./Diets");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", RecipesRoute);
 router.use("/diets", DietsRoute); 

module.exports = router;
