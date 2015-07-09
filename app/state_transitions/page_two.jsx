import React from "react/addons"
export default class PageTwo extends React.Component {
    pageStyle() {
        return {
            backgroundColor: "#1abc9c",
            height: "100vh",
            width: "100%",
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            position:"absolute"
        }
    }

    labelStyle() {
        return {
            color: "#fff",
            fontSize: "40px",
            fontWeight:"bold",
            textTransform: "uppercase"
        }
    }

    render() {
        return (<div style={this.pageStyle()}><span style={this.labelStyle()}>Page Two</span></div>);
    }
}
