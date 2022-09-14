// Importamos las dependencias, actions y componentes
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
    getAllRecipes,
    getAllDiets,
} from "../../redux/actions";

import { Card } from "../Card/Card";
import { Loader } from "../Loader/Loader";
import { NavBar } from "../NavBar/NavBar"
import { Error } from "../Error/Error"
import styles from "./Recipes.module.css";

export function Recipes() {
    let dispatch = useDispatch();
    let allRecipes = useSelector(state => state.copy);
    let errorRender = useSelector(state => state.copy);
    let page = useSelector(state => state.page)

    let [currentPage, setCurrentPage] = useState(page);     // Pagina en la que estamos
    const [recipePerPage] = useState(9);                  // Cuantas recipes tendremos por pagina

    let lastRecipe = currentPage * recipePerPage;             // el indice mayor por pagina
    if(allRecipes.length < 9) lastRecipe =  allRecipes.length;

    let firstRecipe = lastRecipe - recipePerPage;                // el indice menor por pagina
    if(firstRecipe < 1) firstRecipe = 0;
    
    const recipeData = useSelector((state) =>
    state.copy.length > 1 
    ? state.copy.slice(firstRecipe, lastRecipe) 
    : [state.copy]                                     // las recetas de la pagina actual
    );
    
    const indexPages = Math.ceil(allRecipes.length / recipePerPage);   // Numero de paginas en total
    
    useEffect(() => {
        dispatch(getAllRecipes());
        dispatch(getAllDiets());
    }, [dispatch]);

    if (recipeData.flat().length === 0) {
        if(errorRender.length === 0) {
            return (
                <Loader/>
            );
        }
    } else {
        return (
        <div className={styles.mainpage}>
            <NavBar/>
            <div className={styles.recipes_card}>
                {recipeData.length === 0 ? (
                    <Error/>
                ) : (
                    recipeData.map((r, index) => (
                        <Link key={index} to={"/recipes/" + r.id} style={{ textDecoration: "none" }}>
                            <Card
                            key={index}
                            id={r.id}
                            healthScore={r.healthScore}
                            name={r.name}
                            diets={r.diets}
                            image={r.image}
                            />
                        </Link>
                    ))
                )}
            </div>
            <div className={styles.pagination}>
                <button onClick={() => setCurrentPage(currentPage = 1)}>
                    {"<<"}
                </button>
                <button onClick={() => currentPage === 1?
                    null
                    : setCurrentPage(--currentPage)}>
                    {"<"}
                </button>
                <p>
                    {currentPage} of {indexPages}
                </p>
                <button onClick={() => currentPage === indexPages?
                    null 
                    : setCurrentPage(++currentPage)}>
                    {">"}
                </button>
                <button onClick={() => setCurrentPage(indexPages)}>
                    {">>"}
                </button>
            </div>
        </div>
        );
    }
}