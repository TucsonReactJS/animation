'use strict';
import React from "react"
import snabbt from "snabbt.js"
import randomColor from "randomcolor"
import {getRandomInt, getImages} from "./utils"

/**
 * The third party module represents how to integrate a third-party animation library with react components
 */
export default
class BaseGrid extends React.Component {

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

    listStyle() {
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

}

