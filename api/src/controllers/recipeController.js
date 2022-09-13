// importamos los modelos y las dependencias
const { Recipe, Diet, Op } = require('../db.js');
require("dotenv").config();
const { API_KEY } = process.env;
const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=12`;
const axios = require('axios');

// Obtenemos las recetas desde la api
const recipeApi = async () => {
    try {
        const response = await axios.get(URL)                           // Devuelve a las recetas de la api
        let recipe = response.data.results?.map(recp => {
            return {
                id: recp.id,
                name: recp.title,
                image: recp.image,
                diets: recp.diets,
            }
        });                                                             // Devuelve los datos de cada receta
        
        return recipe
        
    } catch (error) {
        console.error(error);
        throw new Error ("There's no Recipes to show in the API")
    }
}

// Obtenemos las recetas desde la DB
const recipeDB = async () => {
    try { 
        const response = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
            }
        })

        return response
        
    } catch (error) {
        console.error(error)
        throw new Error ("There's no Recipes to show in the DB")
    }
}

// Mandamos todas las recetas
async function getAllRecipes () {
    try {
        const apiRecipe = await recipeApi()
        const dbRecipe = await recipeDB()
        const recipe = [...apiRecipe, dbRecipe]
        
        return recipe.flat()
        
    } catch (error) {
        console.error(error)
        throw new Error ("There's no Recipes to show right now")
    }
}

// Buscamos recetas por nombre
async function getRecipeByName (title) {
    try {
        const response = await axios.get(URL);
        let recipes = response.data.results?.map(recp => {
            return {
                id: recp.id,
                name: recp.title,
                image: recp.image,
                diets: recp.diets,
            }
        });               
        const recipeApi = recipes.filter
            (r => r.name.toLowerCase().includes(title.toLowerCase()))

        if(recipeApi.flat().length > 0) {
            return recipeApi
        } else {
            const response = await Recipe.findAll({
                include: {
                    model: Diet,
                    attributes: ['name'],
                }
            })
            console.log("pasamos api")
            const recipeDB = response.filter
                (r => r.title.toLowerCase().includes(title.toLowerCase()))
            if(recipeDB.flat().length > 0) {
                return recipeDB
            } else throw new Error ("There's no Recipe with that name")
        }

            
    } catch (error) {
        console.error(error) 
        throw new Error ("There's no Recipe with that name")
    }
}

// Buscamos recetas por ID
async function getRecipeByID (id) {
    try {
        const dbres = await recipeDB();
        const dbRecipe = dbres.filter(res => res.id == id)
        
        if(dbRecipe.length > 0) {
            return dbRecipe
        } else {
            const apires = await axios.get(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
                const detail = apires.data
                return {
                    id: id,
                    image: detail.image,
                    name: detail.title,
                    diets: detail.diets,
                    summary: detail.summary,
                    healthScore: detail.healthScore,
                    instructions: detail.instructions,
            }
        }

    } catch (error) {
        console.error(error)
        throw new Error ("There's no Recipe with that ID")
    }
}

// Creamos una nueva receta
async function createRecipe (recipe) {
    try {
        if(recipe) {
            const { name, image, summary, healthScore, instructions, diets } = recipe;
            let recipeFound = await Recipe.findOne({
                where: {
                    name: name.toLowerCase()
                }
            })
            if(recipeFound) {
                throw new Error ("This Recipe title already Exists, try another")
            }
            let newRecipe = await Recipe.create({
                name: name.toLowerCase(),
                image: image,
                summary: summary,
                healthScore: healthScore,
                instructions: instructions,
            });

            const dietDB = await Diet.findAll({
                where: {
                    name: diets
                }
            })
            const recipeDiet = await newRecipe.addDiet(dietDB)
            const recipeCreated = await Recipe.findOne({
                where: {
                    id: recipeDiet[0].dataValues.recipeId
                },
                include: {
                    model: Diet,
                    attributes: ['name'],
                }
            })
            return recipeCreated
        }
        
    } catch(e) {
        console.error(e)
        throw new Error (e)
    }
}

module.exports = {
    getAllRecipes,
    getRecipeByName,
    getRecipeByID,
    createRecipe,
}