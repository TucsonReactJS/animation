import React, { cloneElement } from "react/addons"
import { Link, RouteHandler } from 'react-router'
import InlineCss from "react-inline-css"
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class StateTransitions extends React.Component {

    stylesheet() {
        return `
            .page-item-enter,.page-item-appear {
                 opacity: 0;
                 transform:translateZ(0) translateY(-3000px);
                 transition: all .5s ease;
            }

            .page-item-enter.page-item-enter-active,.page-item-appear.page-item-appear-active {
              transform:translateZ(0) translateY(0px);
              opacity: .5;
            }

            .page-item-leave {
              opacity: 1;
              transform:translateZ(0) translateY(0px);
              transition: all .5s ease;
            }

            .page-item-leave.page-item-leave-active {
              transform:translateZ(0) translateY(3000px);
              opacity: 0.00;
            }

        `;
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
            top: 50,
            left: 0,
            right: 0,
            height: "50px",
            backgroundColor: "rgba(33,33,33,.5)"
        };
    }

    render() {
        const key = this.props.location.pathname;
        return (<div>
            <InlineCss stylesheet={this.stylesheet()}>
                <div style={this.linkContainerStyle()}>
                    <Link style={this.linkStyle()} activeStyle={this.linkActiveStyle()}
                          to="/statetransitions/pageone">Page One</Link>
                    <Link style={this.linkStyle()} activeStyle={this.linkActiveStyle()}
                          to="/statetransitions/pagetwo">Page Two</Link>
                </div>
                <ReactCSSTransitionGroup component="div" transitionName="page-item" transitionAppear={true}>
                    {cloneElement(this.props.children || <div/>, {key})}
                </ReactCSSTransitionGroup>
            </InlineCss>
        </div>);
    }
}
