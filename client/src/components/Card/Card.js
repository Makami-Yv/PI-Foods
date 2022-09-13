import React from "react";
import style from "./Card.module.css";

export function Card({ id, image, name, diets }) {
    return (
    <div className={style.card_container} key={id}>
        <div>
            <img className={style.image} 
            src={image
                || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/MissingNo.png/320px-MissingNo.png"} 
            alt="recipe_image"/>
        </div>
        <h3 className={style.name}>{name}</h3>
        <div>
            <h4 className={style.diets}>
                <p>Diets: </p>
                {Array.isArray(diets) ? diets.map((e) => e).join(", ") : diets}
            </h4>
        </div>
    </div>
    );
}