import PageLayout from "components/notebook"
import MarkdownRender from "components/markdown-render"
import { sectionProperties, pageContents } from "utils"

export const PageLayoutHelper = ({
    codeString,
    notesString,
    section,
    numberOfPages,
    pageId,
    properties,
}) => (
    <PageLayout
        {...{
            code: <MarkdownRender children={codeString} />,
            notes: <MarkdownRender children={notesString} />,
            pageId,
            numberOfPages,
            properties,
            pathname: `/react/${section}`,
        }}
    />
)

export async function getStaticPaths() {
    return {
        paths: Object.keys(sectionProperties("react")).map(section => ({
            params: { section },
        })),
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const { section } = params
    const { numberOfPages, properties } = sectionProperties("react")[section]
    const { notesString, codeString } = pageContents("react", section, "1")
    return {
        props: {
            codeString,
            notesString,
            section,
            numberOfPages,
            pageId: "1",
            properties,
        },
    }
}

const Home = props => <PageLayoutHelper {...props} />

export default Home