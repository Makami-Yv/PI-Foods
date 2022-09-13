import styles from "./Error.module.css"
import { Link } from "react-router-dom";

export function Error() {
    return (
        <div className={styles.error_container}>
            <Link to={"/home"}> 
                <h1>Error, there's nothing here...</h1>
                <h1>Go back to Home!</h1>
            </Link>
        </div>
    );
}