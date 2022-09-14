import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    createRecipe,
    getAllDiets,
    getAllRecipes,
} from "../../redux/actions";

import { NavBar } from "../NavBar/NavBar";
import styles from "./Form.module.css";


export function Form() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allDiets = useSelector((state) => state.diets);
    const allRecipes = useSelector((state) => state.copy);
    
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: ``,
        image: ``,
        summary: ``,
        healthScore: ``,
        instructions: ``,
        diets: [],
    });
    
    // Validacion del formulario:
    let noEmpty = /\S+/;
    let validateName = /^[a-z]+$/i;
    let validateNum = /^\d+$/;
    let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;
    
    useEffect(() => {
        dispatch(getAllDiets());
        dispatch(getAllRecipes());
    }, [dispatch]);

    function validate(input) {
        let errors = {};
        if (!noEmpty.test(input.name) || !validateName.test(input.name) || input.name.length < 3) {
        errors.name = "Recipe Name required. Only strings, at least more than 2 characters";
        }
        if (!validateUrl.test(input.image)) {
        errors.image = "URL required";
        }
        if (!noEmpty.test(input.summary)) {
            errors.summary = "Summary required. Add some description";
        }
        if (!validateNum.test(input.healthScore)) {
            errors.healthScore = "Score required. Add the Score";
        }
        if (!noEmpty.test(input.instructions)) {
            errors.instructions = "Instructions required. Add the step by step"
        }

        return errors;
    };

    function handleInputChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    };

    function handleDeleteDiet(e, diet) {
        e.preventDefault()
        setInput({
            ...input,
            diets: input.diets.filter(d => d !== diet),
        });
    };

    function handleDietsChange(e) {
        if(!input.diets.includes(e.target.value)){
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
            e.target.value = 'Select Diet';
        } else {
            e.target.value = 'Select Diet';
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        try {
            let foundName = allRecipes.filter(
                (e) => e.name.toLowerCase() === input.name.toLowerCase()
            );
            console.log(errors)
        
            if (!foundName) {
                return alert("There's already a Recipe with this name, try another one");
            } else if(Object.keys(errors).length) {
                return alert(Object.values(errors));
            } else {
                const newRecipe = {
                    name: input.name,
                    image: input.image,
                    summary: input.summary,
                    healthScore: input.healthScore,
                    instructions: input.instructions,
                    diets: input.diets,
                };
                dispatch(createRecipe(newRecipe));
                dispatch(getAllRecipes());
            }

            setInput({
                name: ``,
                image: ``,
                summary: ``,
                healthScore: ``,
                instructions: ``,
                diets: ``,
            });

            return (
                alert(`The new Recipe was created`), history.push("/home")
            );
        } catch (e) {
            console.error(e)
            return alert("An Error has occurred, the new Recipe can't be created")
        }
    }

    return (
        <div>
            <NavBar />
            <div className={styles.formCreate}>
                <form className={styles} onSubmit={e => {handleSubmit(e)}}>
                    <h2 className={styles}>Create a new Recipe!</h2>
                    <div className={styles}>
                        <div className={styles.stats}>
                            <label>Name:</label>
                            <input type="text" value={input.name} name='name' onChange={e => {handleInputChange(e)}} placeholder="Name" />
                            <p>{errors.name}</p>

                            <label>Image:</label>
                            <input type="text" value={input.image} name='image' onChange={e => {handleInputChange(e)}} placeholder="Image URL" />
                            <p>{errors.image}</p>

                            <label>Summary:</label>
                            <input type="text" value={input.summary} name='summary' onChange={e => {handleInputChange(e)}} placeholder="Recipe summary" />
                            <p>{errors.summary}</p>

                            <label>Score:</label>
                            <input type="number" value={input.healthScore} name='healthScore' onChange={e => {handleInputChange(e)}} placeholder="Recipe score" />
                            <p>{errors.healthScore}</p>

                            <label>Instructions:</label>
                            <input type="text" value={input.instructions} name='instructions' onChange={e => {handleInputChange(e)}} placeholder="Recipe instructions" />
                            <p>{errors.instructions}</p>
                        </div>
                    </div>
                    <div>
                        <select onChange={e => {handleDietsChange(e)}}>
                            <option>Select Diet</option>
                            {
                                allDiets?.map((diet, index) => {
                                    return (
                                        <option key={index} value={diet.name}>{diet.name}</option>
                                    )
                                })
                            }
                        </select>
                                {                                    
                                    input.diets?.map(diet => {
                                        return (
                                            <div className={styles.dietsSelect}>
                                                <p className={styles.pDiets}>{diet}</p>
                                                <button className={styles.btnDelete} onClick={(e) => {handleDeleteDiet(e, diet)}}>x</button>
                                            </div>
                                        )
                                    }) 
                                }
                    </div>
                    <br/>
                    <button className={styles.btnCreate} type='submit'>Create!</button>
                    <br/>
                </form>
            </div>
        </div>
    );
}