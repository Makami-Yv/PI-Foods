// Importamos los controllers y dependencias necesarias
const { Router } = require("express");
const { 
    getAllRecipes,
    getRecipeByName,
    getRecipeByID,
    createRecipe,
    } = require ('../controllers/recipeController')

const recipeRouter = Router();

// Configuramos los Routers
    // GET
    recipeRouter.get('/', async (req, res) => {
        try {
            const { title } = req.query;
            if(!title) {
                const response = await getAllRecipes();
                return res.status(200).send(response)
            } else {
                const response = await getRecipeByName(title);
                if (response) {
                    return res.status(200).send(response)
                }
            }

        } catch (error) {
            console.error(error)
            return res.status(400).send("There's no Recipe to show right now")
        }
    });

    recipeRouter.get('/:id', async (req, res) => {
        try {
            const { id } = req.params
            const response = await getRecipeByID(id);
            return res.status(200).send(response)

        } catch (error) {
            console.error(error)
            throw new Error ("There's no Recipe to show with that ID")
        }
    })

    // POST
    recipeRouter.post('/create', async (req, res) => {
        try {
            const recipe = req.body
            if(recipe) {
                const recipePost = await createRecipe(recipe)
                if(recipePost) {
                    return res.status(200).json(recipePost)
                }
            }

        } catch (error) {
            console.error(error) 
            throw new Error ("The new Recipe can't be created")
        }
    })

module.exports = recipeRouter;