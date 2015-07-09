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

    /**
     * Get the style for a link
     * @returns {{height: string, lineHeight: string, color: string, backgroundColor: string, display: string, paddingLeft: string, paddingRight: string}}
     */
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

    /**
     * Get the style for an active link
     * @returns {{backgroundColor: string}}
     */
    linkActiveStyle() {
        return {backgroundColor: "rgba(11,11,11,.7)"}
    }

    /**
     * Get the style for the upper link container
     * @returns {{position: string, zIndex: string, top: number, left: number, right: number, height: string, backgroundColor: string}}
     */
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
                    <Link style={this.linkStyle()} activeStyle={this.linkActiveStyle()}
                          to='/cssanimate'>ReactCSSTransitionGroup</Link>
                </div>
                {this.props.children}
            </div>
        );
    }
}

