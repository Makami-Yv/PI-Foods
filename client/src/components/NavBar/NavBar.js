import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

import { SortFilter } from "../Sort_Filter/Sort_Filter";
import styles from "./NavBar.module.css";

export function NavBar() {
    return (
        <div className={styles.nav_container}>
                <div className={styles.logo}>
                    <Link to="/home" style={{ textDecoration: "none" }}>
                        <p>Food App</p>
                    </Link>
                </div>
                <Link to="/create" style={{ textDecoration: "none" }}>
                    Create a new recipe
                </Link>
                <SortFilter/>
                <SearchBar/>
        </div>
    );
}