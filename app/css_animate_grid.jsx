import React from "react/addons"
import BaseGrid from "./base_grid"
import InlineCss from "react-inline-css"
import {getRandomInt} from "./utils"
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import path from "./path"
import SourceCode from "./source_code"

@path("app/css_animate_grid.jsx") class CssAnimateGrid extends BaseGrid {
    /**
     * The stylesheet for this component. Sets the requisite ReactCSSTransitionGroup classes
     * @returns {*}
     */
    stylesheet() {

        let gridItems = this.state.items
            .map(( i, idx ) => `.grid-item-${idx}{ transition-duration:${getRandomInt(1500, 2500)}ms;}`).join('\n');

        return `
           .grid-item-appear {
                 opacity: 0;
                 transform:translateZ(0) translateY(-3000px);
                 -webkit-transition: all;
                -moz-transition: all;
                -ms-transition: all;
                -o-transition: all;
                transition: all;
                -webkit-transition-timing-function: ease;
                transition-timing-function: ease;
            }

            .grid-item-appear.grid-item-appear-active {
              transform:translateZ(0) translateY(0px);
              opacity: .5;
            }
            ${gridItems}
        `;
    }

    render() {
        let items = this.state.items.map(( i, idx ) => <li className={`grid-item-${idx}`} style={this.listItemStyle(i)}
                                                           key={idx}></li>);
        return (
            <div>
                <InlineCss stylesheet={this.stylesheet()}>
                    <ReactCSSTransitionGroup component="ul" style={this.listStyle()} transitionName="grid-item"
                                             transitionAppear={true}>
                        {items}
                    </ReactCSSTransitionGroup>
                </InlineCss>
                <SourceCode path={CssAnimateGrid.path}/>
            </div>
        );
    }

}

export default CssAnimateGrid;