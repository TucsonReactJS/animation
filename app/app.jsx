'use strict';
import React from "react"
import { Link } from 'react-router'

/**
 * The app class represents our top level component
 */
export default
class App extends React.Component {
    constructor( props ) {
        super(props);
    }

    linkStyle() {
        return {
            height: "50px",
            lineHeight: "50px",
            color: "#fff",
            backgroundColor: "rgba(11,11,11,.2)",
            display: "inline-block",
            paddingLeft: "10px",
            paddingRight: "10px"
        };
    }

    linkActiveStyle() {
        return {backgroundColor: "rgba(11,11,11,.7)"}
    }

    linkContainerStyle() {
        return {
            position: "absolute",
            zIndex: "99999999",
            top: 0,
            left: 0,
            right: 0,
            height: "50px",
            backgroundColor: "rgba(33,33,33,.5)"
        };
    }

    render() {
        return (
            <div >
                <div style={this.linkContainerStyle()}>
                    <Link style={this.linkStyle()} activeStyle={this.linkActiveStyle()} to='/thirdparty'>Third party
                        animation libraries</Link>
                    <Link style={this.linkStyle()} activeStyle={this.linkActiveStyle()}
                          to='/reactanimate'>React-animate</Link>
                </div>
                {this.props.children}
            </div>
        );
    }
}

