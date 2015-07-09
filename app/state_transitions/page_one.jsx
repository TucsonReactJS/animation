import React from "react/addons"
export default class PageOne extends React.Component {
    pageStyle() {
        return {
            backgroundColor: "#3498db",
            height: "100vh",
            width: "100%",
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            position:"absolute",
            top:0
        }
    }

    labelStyle() {
        return {
            color: "#fff",
            fontSize:"40px",
            fontWeight:"bold",
            textTransform:"uppercase"
        }
    }

    render() {
        return (<div style={this.pageStyle()}><span style={this.labelStyle()}>Page One</span></div>);
    }
}
