// importamos los modelos y las dependencias
const { Diet, Op } = require('../db.js');
require("dotenv").config();
const { API_KEY } = process.env;
const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`;
const axios = require('axios');

// Obtenemos las dietas desde las recetas de la API
const DietApi = async () => {
    try {
        const response = await axios.get(URL)                           // Devuelve a las recetas de la api
        let diets = response.data.results?.map(recp => {
            return {
                diets: recp.diets,
            }
        });                                                             // Devuelve los datos de cada receta
        
        return diets
        
    } catch (error) {
        console.error(error);
        throw new Error ("There's no diets to show in the API")
    }
}

// Creamos las dietas en la BD
async function createDiets () {
    try {
        const response = await DietApi()
        const onlyDiets = response.map(d => d.diets)
        const noRepeated = new Set(onlyDiets.flat())
        noRepeated.forEach(async d => {
            await Diet.findOrCreate({ where: {name: d}})
        })
    } catch (error) {
        console.error(error)
        throw new Error ("The Diets can't be created")
    }
}

// Obtenemos las dietas de la BD
async function getAllDiets () {
    try {
        const response = await Diet.findAll();
        return response
    } catch(error) {
        console.error(error)
        throw new Error ("There's no Diets to show in the DB")
    }
}

module.exports = {
    createDiets,
    getAllDiets,
}