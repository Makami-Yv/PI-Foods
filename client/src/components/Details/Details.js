import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { 
    getRecipeDetails, 
    cleanDetails 
} from "../../redux/actions";

import { Loader } from "../Loader/Loader";
import { Error } from "../Error/Error"
import { NavBar } from "../NavBar/NavBar";
import styles from "./Details.module.css";

export function Details() {
    const dispatch = useDispatch();
    const params = useParams();             // desde aqui obtenemos el id de la receta
    const recipe = useSelector((state) => state.details);

    useEffect(() => {
        dispatch(cleanDetails());
        dispatch(getRecipeDetails(params.id));
    }, [dispatch, params.id]);

    console.log(recipe)
    console.log(recipe.name)

    if (!recipe.name) {
        return (
        <div>
            <div>
                <Loader/>
            </div>
        </div>
        );
    } else if (recipe.length !== 0) {
        return (
        <div className={styles.background}>
            <NavBar/>
            <div className={styles.frame}>
                <div className={styles.recipebox}>
                    <div className={styles.name}>
                        <h3>
                            {recipe.name}
                        </h3>
                    </div>
                    <div className={styles.data_container}>
                        <div className={styles.recipe_container}>
                            <img src={recipe.image} alt={recipe.name} />
                            <p>
                            {`Diets: ${Array.isArray(recipe.diets)
                                ? recipe.diets.map((e) => e).join(", ")
                                : recipe.diets}`}
                            </p>
                            <h4>{`Score: ${recipe.healthScore}`}</h4>
                        </div>
                        <div className={styles.text_container}>
                            <h4>Summary:</h4>
                            {recipe.summary?.replace(/<[^>]+>/g, '')}
                            <br/>
                            <h4>Instructions:</h4>
                            {recipe.instructions?.replace(/<[^>]+>/g, '')}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.button_container}>
                <button>
                    <Link to="/home" style={{ textDecoration: "none"}}>
                        Back to Home
                    </Link>
                </button>
            </div>
        </div>
        );
    } else if (!recipe.length) {
        return (
        <div>
            <NavBar/>
            <Error/>
        </div>
        );
    }
}