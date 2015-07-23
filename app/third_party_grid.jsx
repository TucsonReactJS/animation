'use strict';
import React from "react"
import snabbt from "snabbt.js"
import {getRandomInt} from "./utils"
import BaseGrid from "./base_grid"
import path from "./path"

/**
 * The third party module represents how to integrate a third-party animation library with react components
 */
@path("app/third_party_grid.jsx")
class ThirdPartyGrid extends BaseGrid {
    constructor( props ) {
        super(props);
    }

    animate() {
        for ( let i = 0; i < this.state.items.length; i++ ) {
            //grab our ref
            let square = React.findDOMNode(this.refs[`grid-item-${i}`]);

            snabbt(square, {
                fromPosition: [0, -getRandomInt(900, 4000), 0],
                fromOpacity: 0,
                opacity: .5,
                position: [0, 0, 0],
                easing: 'ease',
                duration: getRandomInt(2000, 3000)
            }).snabbt({
                fromOpacity: .5,
                opacity: 1,
                duration: 500,
                easing: 'ease'
            });

        }
    }

    componentDidMount() {
        this.animate();
    }

    render() {

        let items = this.state.items.map(( i, idx ) => <li style={this.listItemStyle(i)}
                                                           ref={`grid-item-${idx}`}
                                                           key={idx}></li>);
        return (
            <div>
                <ul style={this.listStyle()}>
                    {items}
                </ul>
            </div>
        );
    }
}

export default ThirdPartyGrid;