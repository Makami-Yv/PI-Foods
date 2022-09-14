import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    filterByDiets,
    filterBySource,
    orderByName,
    orderByHealthScore,
    reset,
} from "../../redux/actions";

import styles from "./Sort_Filter.module.css";

export function SortFilter() {
    const [, setScore] = useState("Any");
    const [, setName] = useState("Any")
    const [, setDiet] = useState("All");
    const [, setSource] = useState("AllSource")

    const dispatch = useDispatch();
    const allDiets = useSelector(state => state.diets);

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    // filtramos por tipos
    function handleFilterByDiet(e) {
        e.preventDefault();
        handleReset();
        dispatch(filterByDiets(e.target.value));
        setDiet(e.target.value)
    }

    // filtramos por origen
    function handleFilterBySource(e) {
        e.preventDefault();
        dispatch(filterBySource(e.target.value));
        setSource(e.target.value)
    }

    // ordenamos por nombres
    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setName(e.target.value)
    }

    // ordenamos por ataque
    function handleOrderByHealthScore(e) {
        e.preventDefault();
        dispatch(orderByHealthScore(e.target.value));
        setScore(e.target.value)
    }

    // reseteamos los filtros y sorts
    function handleReset() {
        dispatch(reset());
        
    }

    return (
        <div>
            <div className={styles.sortFilter_container}>
                <h3>Filtrar por:</h3>
                <div className={styles.selectors}>
                    <select
                        className={styles.case}
                        defaultValue="ALL"
                        onChange={(e) => handleFilterByDiet(e)}
                    >
                        <option value="ALL">
                            All Diets
                        </option>
                        {
                            allDiets.map((d, index) => (
                                <option value={d.name} key={index}>
                                    {d.name}
                                </option>
                            ))
                        }
                    </select>

                    <select 
                        className={styles.case}
                        defaultValue="AllSource"
                        onChange={(e) => handleFilterBySource(e)}
                    >
                        <option value="AllSource">
                            All Source
                        </option>
                        <option value="API">
                            Spoonacular
                        </option>
                        <option value="DB">
                            Database
                        </option>
                    </select>
                </div>
                <h3>Ordenar por:</h3>
                <div className={styles.selectors}>
                    <select
                        className={styles.case}
                        defaultValue="ANY"
                        onChange={(e) => handleOrderByName(e)}
                    >
                        <option value="ANY">
                            Name
                        </option>
                        <option value="A-Z">
                            A-Z
                        </option>
                        <option value="Z-A">
                            Z-A
                        </option>
                    </select>

                    <select
                        className={styles.case}
                        defaultValue="NONE"
                        onChange={(e) => handleOrderByHealthScore(e)}
                    >
                        <option value="NONE">
                            Score
                        </option>
                        <option value="MIN-MAX">
                            Min-Max
                        </option>
                        <option value="MAX-MIN">
                            Max-Min
                        </option>
                    </select>
                </div>
                <button className={styles.btn} onClick={() => handleReset()}>
                    Reset
                </button>
            </div>
        </div>
    )
}