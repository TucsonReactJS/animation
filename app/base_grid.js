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

    /**
     * Get the default list item style for our HBO GO style entrance animation
     * @param item
     * @returns {{height: string, width: string, float: string, margin: string, backgroundImage: *, backgroundSize: string}}
     */
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

    /**
     * Get the default list style for our HBO GO style entrance animation
     * @returns {{listStyle: string, margin: string, padding: string}}
     */
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

