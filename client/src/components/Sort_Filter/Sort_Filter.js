import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    filterByDiets,
    filterBySource,
    orderByName,
    orderByHealthScore,
    reset,
    changePage,
} from "../../redux/actions";

import styles from "./Sort_Filter.module.css";

export function SortFilter() {
    
    const dispatch = useDispatch();
    const allDiets = useSelector(state => state.diets);
    
    const [, setScore] = useState("NONE");
    const [, setName] = useState("ANY")
    const [, setDiet] = useState("ALL");
    const [, setSource] = useState("AllSource")

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    // filtramos por dietas
    function handleFilterByDiet(e) {
        e.preventDefault();
        handleReset();
        dispatch(filterByDiets(e.target.value));
        setDiet(e.target.value)
        dispatch(changePage(1))
    }

    // filtramos por origen
    function handleFilterBySource(e) {
        e.preventDefault();
        dispatch(filterBySource(e.target.value));
        setSource(e.target.value)
        dispatch(changePage(1))
    }

    // ordenamos por nombres
    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setName(e.target.value)
        dispatch(changePage(1))
    }

    // ordenamos por score
    function handleOrderByHealthScore(e) {
        e.preventDefault();
        dispatch(orderByHealthScore(e.target.value));
        setScore(e.target.value)
        dispatch(changePage(1))
    }

    // reseteamos los filtros y sorts
    function handleReset() {
        dispatch(reset());
        setDiet("ALL")
        setName("ANY")
        setScore("NONE")
        setSource("AllSource")
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