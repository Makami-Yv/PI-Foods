// Importamos las actions
import {
    GET_RECIPES, GET_DIETS, 
    GET_RECIPE_BY_NAME, GET_DETAILS, 
    CREATE_RECIPE, FILTER_BY_DIETS,
    FILTER_BY_SOURCE, ORDER_BY_NAME, 
    ORDER_BY_HEALTHSCORE, 
    RESET, CLEAN_DETAILS, CHANGE_PAGE
} from './actions'

const initialState= {
    recipes: [],
    copy: [],
    diets: [],
    details: {},
    page: 1,
}

function rootReducer(state= initialState, action) {
    switch(action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                copy: action.payload
            };
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload,
            };
        case GET_RECIPE_BY_NAME:
            return {
                ...state,
                copy: action.payload
            };
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            };
        case CREATE_RECIPE:
            return {
                ...state,
                details: action.payload
            };
        case FILTER_BY_DIETS:
            const dietFiltered =
            action.payload === "ALL"
            ? state.recipes
            : state.copy.filter(r => r.diets.includes(action.payload))  
            
            console.log(dietFiltered)
            if(dietFiltered.length === 0) {
                alert("There's no Recipes with that diet.")
                return {
                    ...state,
                    copy: state.recipes
                };
            }
            return {
                ...state,
                copy: dietFiltered
            };
        case FILTER_BY_SOURCE:
            const sourceFiltered = 
                action.payload === "AllSource"
                ? state.recipes
                : action.payload === "API"
                ? state.copy.filter(r => isNaN(Number(r.id)) === false)
                : state.copy.filter(r => isNaN(Number(r.id)) === true)
            if(sourceFiltered.length === 0) {
                alert("There's no Recipes with that Source.")
                return {
                    ...state,
                    copy: state.recipes
                }
            }
            return {
                ...state,
                copy: sourceFiltered
            };
        case ORDER_BY_NAME:
            const nameSort =
                action.payload === "ANY"
                ? state.recipes
                : action.payload === "A-Z"
                ? state.copy.sort(function (a, b) {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1;
                    return 0;
                    })
                : state.copy.sort(function (a, b) {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                    })
            return {
                ...state,
                copy: nameSort,
            };
        case ORDER_BY_HEALTHSCORE:
            const healthSort =
                action.payload === "NONE"
                ? state.recipes
                : action.payload === "MIN-MAX"
                ? state.copy.sort(function (a, b) {
                    if (a.healthScore > b.healthScore) return 1;
                    if (b.healthScore > a.healthScore) return -1;
                    return 0;
                    })
                : state.copy.sort(function (a, b) {
                    if (a.healthScore > b.healthScore) return -1;
                    if (b.healthScore > a.healthScore) return 1;
                    return 0;
                    });
            return {
                ...state,
                copy: healthSort,
            };
        case RESET:
            return {
                ...state,
                copy: state.recipes
            };
        case CLEAN_DETAILS:
            return {
                ...state,
                details: {}
            };
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;