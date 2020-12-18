import styles from "./Styles.module.css"
import Nav from "./navbar"
import ReactMenu from "./react-menu"
import { useContext } from "react"
import { ThemeContext } from "../../providers/theme/"

const Home = ({ children } = {}) => {
    const { bodyClassNames } = useContext(ThemeContext)

    return (
        <div className={[styles.grid, ...bodyClassNames].join(" ")}>
            <Nav />
            <main className={styles.main}>{children}</main>
        </div>
    )
}
export default Home
