import React from "react/addons"
import path from "../path"

@path("app/state_transitions/page_two.jsx")
class PageTwo extends React.Component {
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