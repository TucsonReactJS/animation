'use strict';
import React from "react"
import {getRandomInt} from "./utils"
import Animate from "react-animate"
import _ from "lodash"
import BaseGrid from "./base_grid"
import path from "./path"
import SourceCode from "./source_code"

/**
 * The third party module represents how to use react-animate
 */
@path("app/react_animate_grid.jsx")
class ReactAnimateGrid extends BaseGrid {

    /**
     * Animation function using react animate, sets CSS transform styles on the state
     */
    animate() {

        this.state.items.forEach(( i, idx ) => {
            let name = `grid-animation-${idx}`;
            // alternate syntax using Symbol
            this[Animate['@animate']](
                name, // animation name
                {transform: `translateZ(0) translateY(${-getRandomInt(900, 4000)}px)`, opacity: 0}, // initial style
                {transform: `translateZ(0) translateY(0px)`, opacity: .5}, // final style
                getRandomInt(2000, 3000), // animation duration (in ms)
                {
                    onComplete: ()=> {
                        this[Animate['@animate']](
                            name, // animation name
                            {opacity: .5}, // initial style
                            {opacity: 1}, // final style
                            500 // animation duration (in ms)
                        );
                    }
                }
            )
        });

    }

    /**
     * Start the animation on mount
     */
    componentDidMount() {
        this.animate();
    }

    constructor( props ) {
        super(props);
    }

    /**
     * Get the list item style
     * @param item
     * @param idx
     * @returns {*}
     */
    listItemStyle( item, idx ) {
        let itemStyle = super.listItemStyle(item);
        return _.assign(itemStyle, this[Animate['@getAnimatedStyle']](`grid-animation-${idx}`))
    }

    render() {

        let items = this.state.items.map(( i, idx ) =><li style={this.listItemStyle(i,idx)} key={idx}></li>);
        return (
            <div>
                <ul style={this.listStyle()}>
                    {items}
                </ul>
                <SourceCode path={ReactAnimateGrid.path}/>
            </div>
        );
    }
}

export default Animate.extend(ReactAnimateGrid)