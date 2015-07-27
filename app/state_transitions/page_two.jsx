import React from "react/addons"
import path from "../path"

@path("app/state_transitions/page_two.jsx")
class PageTwo extends React.Component {
    /**
     * The page style
     * @returns {{backgroundColor: string, height: string, width: string, display: string, alignContent: string, alignItems: string, justifyContent: string, position: string, top: number, left: number}}
     */
    pageStyle() {
        return {
            backgroundColor: "#1abc9c",
            height: "100vh",
            width: "100%",
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            left: 0
        }
    }
    /**
     * The label style for the centered text
     * @returns {{color: string, fontSize: string, fontWeight: string, textTransform: string}}
     */
    labelStyle() {
        return {
            color: "#fff",
            fontSize: "40px",
            fontWeight: "bold",
            textTransform: "uppercase"
        }
    }

    render() {
        return (<div style={this.pageStyle()}><span style={this.labelStyle()}>Page Two</span></div>);
    }
}
export default PageTwo;