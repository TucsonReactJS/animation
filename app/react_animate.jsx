'use strict';
import React from "react"
import {getRandomInt, getImages} from "./utils"
import Animate from "react-animate"
import _ from "lodash"
import BaseGrid from "./base_grid"

/**
 * The third party module represents how to use react-animate
 */
class ReactAnimate extends BaseGrid {

    /**
     * Animation function using react animate
     */
    animate() {

        this.state.items.forEach(( i, idx ) => {
            let name = `grid-animation-${idx}`;
            // alternate syntax using Symbol
            this[Animate['@animate']](
                name, // animation name
                {transform: `translateY(${-getRandomInt(900, 4000)}px)`, opacity: 0}, // initial style
                {transform: `translateY(0px)`, opacity: 1}, // final style
                getRandomInt(2000, 3000) // animation duration (in ms)
            );
        });

    }

    componentDidMount() {
        this.animate();
    }

    constructor( props ) {
        super(props);
    }

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
            </div>
        );
    }
}

export default Animate.extend(ReactAnimate)