const { Router } = require('express');
// Importar todos los routers;
const recipeRouter = require('./recipesRoutes')
const dietRouter = require('./dietsRoutes')

const router = Router();

// Configurar los routers
router.use('/recipes', recipeRouter)
router.use('/diets', dietRouter)

module.exports = router;
