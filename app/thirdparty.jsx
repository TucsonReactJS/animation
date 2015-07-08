'use strict';
import React from "react"
import snabbt from "snabbt.js"
import randomColor from "randomcolor"
import {getRandomInt, getImages} from "./utils"

/**
 * The third party module represents how to integrate a third-party animation library with react components
 */
export default
class ThirdParty extends React.Component {

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
                duration: getRandomInt(500, 1000),
                easing: 'ease'
            });

        }
    }

    componentDidUpdate() {
        this.animate();
    }

    componentDidMount() {
        this.animate();
    }

    listItemStyle( item ) {
        return {
            height: "25vh",
            width: "25%",
            float: "left",
            margin: "0 auto",
            backgroundImage: `url(${item.url})`,
            backgroundSize: "cover"
        }
    }

    static listStyle() {
        return {
            listStyle: "none",
            margin: "0 auto",
            padding: "0"
        }
    }

    constructor( props ) {
        super(props);
        this.state = {items: getImages()};
    }

    render() {

        let items = this.state.items.map(( i, idx ) => <li style={this.listItemStyle(i)} ref={`grid-item-${idx}`}
                                                           className={`grid-item-${idx}`}
                                                           key={idx}></li>);
        return (
            <div>
                <ul style={ThirdParty.listStyle()}>
                    {items}
                </ul>
            </div>
        );
    }
}

