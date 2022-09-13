import styles from "./Home.module.css"
import { Recipes } from "../Recipes/Recipes"

export function Home() {
    return (
        <div className={styles.home_container}>
            <Recipes />
        </div>
    );
}