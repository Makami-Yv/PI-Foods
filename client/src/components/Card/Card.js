import React from "react";
import style from "./Card.module.css";
import Food_placeholder from "../../images/food.png"

export function Card({ id, image, name, diets, healthScore }) {
    return (
    <div className={style.card_container} key={id}>
        <div>
            <img className={style.image} 
            src={image
                || Food_placeholder} 
            alt="recipe_image"/>
        </div>
        <h3 className={style.name}>{name}</h3>
        <h3>Score: {healthScore}</h3>
        <div>
            <h4 className={style.diets}>
                <p>Type of diet: </p>
                {Array.isArray(diets) ? diets.map((e) => e).join(", ") : diets}
            </h4>
        </div>
    </div>
    );
}