import styles from "./Styles.module.css"
import { useContext } from "react"
import { FaCloudSun, FaCode, FaPaintBrush } from "react-icons/fa"
import { CgFormatColor } from "react-icons/cg"
import { BiText } from "react-icons/bi"
import { ThemeContext, GlobalStateContext } from "providers"
import MarkdownRender from "../markdown-render"
import { IconButton } from "../button"

const ICON_BUTTON_STYLE = { margin: "10px 5px" }
const SAMPLE_CODE = "```python\n def hello():\n    return 'world!'"
const SAMPLE_PARAGRAPH = `Click on any of the sample elements
to change its style. Customize its primary color, header font, body font, code
theme, and page theme!`

const Menu = ({ style } = {}) => {
    const { changeMenuState } = useContext(GlobalStateContext)
    const {
        nextColor,
        nextHeaderFont,
        nextCodeTheme,
        headerFont,
        nextBodyFont,
        nextPageTheme,
        bodyFont,
        primaryColor,
        onHoverClassName,
        bodyClassNames,
        sectionClassNames,
    } = useContext(ThemeContext)

    return (
        <section className={styles.menu} style={{ ...style }}>
            <div
                style={{
                    border: `1px dotted ${primaryColor}`,
                    marginBottom: "30px",
                }}
                className={[bodyClassNames[0], styles.themeMenu].join(" ")}
                aria-label={"change main color"}
            >
                <div
                    onClick={nextColor}
                    className={onHoverClassName}
                    style={{ height: "10px", marginTop: "5px" }}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "5px",
                            backgroundColor: primaryColor,
                        }}
                    ></div>
                </div>
                <h1
                    onClick={nextHeaderFont}
                    className={onHoverClassName}
                    style={{
                        fontFamily: headerFont,
                        padding: "10px",
                        borderRadius: "5px",
                        margin: "10px",
                        marginBottom: "0",
                    }}
                >
                    Header
                </h1>

                <p
                    onClick={nextBodyFont}
                    className={onHoverClassName}
                    style={{
                        fontFamily: bodyFont,
                        padding: "10px",
                        borderRadius: "5px",
                        lineHeight: "1.3",
                        margin: "10px",
                        marginTop: "0",
                    }}
                >
                    {SAMPLE_PARAGRAPH}
                </p>

                <div
                    style={{ padding: "5px", borderRadius: "5px" }}
                    className={onHoverClassName}
                    onClick={nextCodeTheme}
                >
                    <MarkdownRender>{SAMPLE_CODE}</MarkdownRender>
                </div>

                <div
                    className={sectionClassNames[0]}
                    style={{
                        margin: "5px",
                        padding: "5px",
                        borderRadius: "15px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <IconButton
                        onClick={nextPageTheme}
                        style={ICON_BUTTON_STYLE}
                        aria-label={"change page theme"}
                    >
                        <FaCloudSun />
                    </IconButton>

                    <IconButton
                        onClick={nextColor}
                        style={ICON_BUTTON_STYLE}
                        aria-label={"change main color"}
                    >
                        <FaPaintBrush />
                    </IconButton>
                    <IconButton
                        onClick={nextHeaderFont}
                        style={ICON_BUTTON_STYLE}
                        aria-label={"change header font"}
                    >
                        <CgFormatColor />
                    </IconButton>
                    <IconButton
                        onClick={nextBodyFont}
                        style={ICON_BUTTON_STYLE}
                        aria-label={"change body font"}
                    >
                        <BiText />
                    </IconButton>
                    <IconButton
                        onClick={nextCodeTheme}
                        style={ICON_BUTTON_STYLE}
                        aria-label={"change code theme"}
                    >
                        <FaCode />
                    </IconButton>
                </div>
                <div
                    onClick={() => changeMenuState("theme")}
                    style={{
                        color: primaryColor,
                        margin: "20px 0px",
                        textAlign: "center",
                        cursor: "pointer",
                    }}
                >
                    <a>close this menu</a>
                </div>
            </div>
        </section>
    )
}

export default Menu