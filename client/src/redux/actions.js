// Importamos las dependencias
import axios from "axios";

// Exportamos los types de las actions
export  const 
    GET_RECIPES = "GET_RECIPES", GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME",
    GET_DETAILS = "GET_DETAILS", GET_DIETS = "GET_DIETS",
    CREATE_RECIPE = "CREATE_RECIPE", FILTER_BY_DIETS = "FILTER_BY_DIETS",
    FILTER_BY_SOURCE = "FILTER_BY_SOURCE", ORDER_BY_NAME = "ORDER_BY_NAME",
    ORDER_BY_HEALTHSCORE = "ORDER_BY_HEALTHSCORE", RESET = "RESET",
    CLEAN_DETAILS = "CLEAN_DETAILS"

// Rutas del Back
const
    URL_RECIPES = "http://localhost:3001/recipes",
    URL_CREATE_RECIPE = "http://localhost:3001/recipes/create",
    URL_DIETS = "http://localhost:3001/diets"

// Conseguimos todas las recetas
export function getAllRecipes() {
    return async function(dispatch) {
        try {
            const recipes = await axios.get(URL_RECIPES);             // Llamamos al backend
            return dispatch({
                type: GET_RECIPES,
                payload: recipes.data                              // Mandamos los datos
            });
        } catch (e) {
            console.error(e)
            return alert("An error has occured. There's no Recipes to show right now")
        }
    }
}

// Conseguimos las recetas por nombre
export function getRecipesByName(name) {
    return async function(dispatch) {
        console.log(name)
        try {
            const recipes = await axios.get(URL_RECIPES + `?title=${name}`);   // Llamamos a la ruta buscando con un nombre
            console.log(recipes)
            return dispatch({
                type: GET_RECIPE_BY_NAME,
                payload: recipes.data                              // Mandamos los datos
            });
        } catch (e) {
            console.error(e)
            return alert("An error has occured. There's no Recipes whit that name")
        }
    }
}

// Conseguimos la receta por id para mostrar los detalles
export function getRecipeDetails(id) {
    return async function(dispatch) {
        try {
            const recipe = await axios.get(URL_RECIPES + `/${id}`);   // Llamamos a la ruta buscando con su id
            return dispatch({
                type: GET_DETAILS,
                payload: recipe.data                              // Mandamos los datos
            });
        } catch (e) {
            console.error(e)
            return alert("An error has occured. There's no Recipe whit that id")
        }
    }
}

// Conseguimos las dietas
export function getAllDiets() {
    return async function(dispatch) {
        try {
            const diets = await axios.get(URL_DIETS)
            return dispatch({
                type: GET_DIETS,
                payload: diets.data
            })
        } catch (e) {
            console.error(e)
            return alert("An error has ocurred. Can't get the diets rigth now")
        }
    }
}

// Creamos una nueva receta
export function createRecipe(recipe) {
    return async function(dispatch) {
        try {
            const createdRecipe = await axios.post(URL_CREATE_RECIPE, recipe);   // Mandamos los datos a la ruta
            return dispatch({
                type: CREATE_RECIPE,
                payload: createdRecipe.data                              // Mandamos los datos obtenidos
            });
        } catch (e) {
            console.error(e)
            return alert("An error has occured. The new recipe wasn't created, try again")
        }
    }
}

// Filtramos por Dietas
export function filterByDiets(diet) {
    try {
        return {
            type: FILTER_BY_DIETS,
            payload: diet
        }
    } catch (e) {
        console.error(e)
        return alert("An error has occured. Can't filter by diets")
    }
}

// Filtramos entre las recetas por su origen
export function filterBySource(source) {
    try {
        return {
            type: FILTER_BY_SOURCE,
            payload: source
        }
    } catch (e) {
        console.error(e)
        return alert("An error has occured. Can't filter by source")
    }
}

// Ordenamos por nombre
export function orderByName(order) {
    try {
        return {
            type: ORDER_BY_NAME,
            payload: order
        }
    } catch (e) {
        console.error(e)
        return alert("An error has occured. Can't order by name")
    }
}

// Ordenamos por HealthScore
export function orderByHealthScore(score) {
    try {
        return {
            type: ORDER_BY_HEALTHSCORE,
            payload: score
        }
    } catch (e) {
        console.error(e)
        return alert("An error has occured. Can't order by HealthScore")
    }
}

// Reseteamos el state (filtros, ordenamiento)
export function reset() {
    try {
        return {
            type: RESET,
        }
    } catch (e) {
        console.error(e)
        return alert("An error has occured. Can't reset the state")
    }
}

// Limpiamos los detalles de la raza para que no se muestre el de una anterior
export function cleanDetails() {
    try {
        return {
            type: CLEAN_DETAILS,
        }
    } catch (e) {
        console.error(e)
        return alert("An error has occured. Can't clean the details")
    }
}