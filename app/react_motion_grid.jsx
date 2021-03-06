'use strict';
import React from "react"
import {getRandomInt} from "./utils"
import BaseGrid from "./base_grid"
import Spring from 'react-motion'
import path from "./path"
import SourceCode from "./source_code"

/**
 * The third party module represents how to use react-motion
 */
@path("app/react_motion_grid.jsx")
class ReactMotionGrid extends BaseGrid {

    /**
     * Animation function React motion, just sets the mounted state
     */
    animate() {
        this.setState({mounted: true});
    }

    /**
     * Start the animation on mount
     */
    componentDidMount() {
        this.animate();
    }

    constructor( props ) {
        super(props);
        this.state.mounted = false;
    }

    /**
     * Get the list item style
     * @param item
     * @param idx
     * @returns {*}
     */
    listItemStyle( item, idx, {top, opacity} ) {
        let itemStyle = super.listItemStyle(item);
        itemStyle.WebkitTransform = `translate3d(0, ${top}px, 0)`;
        itemStyle.transform = `translate3d(0, ${top}px, 0)`;
        itemStyle.opacity = opacity;
        return itemStyle;
    }

    /**
     * Get the value for the React-Motion spring
     * @returns {{val: {top: number, opacity: {val: number, config: *[]}}, config: *[]}}
     */
    springValueConfig() {
        return {
            val: {
                top: this.state.mounted ? 0 : -3000,
                opacity: {
                    val: this.state.mounted ? 1 : 0,
                    config: [15, getRandomInt(17, 30)]
                }
            }, config: [50, getRandomInt(17, 30)]
        };
    }

    render() {

        let items = this.state.items.map(( i, idx ) =>
            <Spring
                endValue={this.springValueConfig()}>
                { ( {val} ) =>
                    <li style={this.listItemStyle(i,idx, {top:val.top,opacity:val.opacity.val})} key={idx}></li>
                }
            </Spring>);
        return (
            <div>
                <ul style={this.listStyle()}>
                    {items}
                </ul>
                <SourceCode path={ReactMotionGrid.path}/>
            </div>
        );
    }
}

export default ReactMotionGrid;