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

    render() {
        return (
            <div >
                <div style={{position:"absolute",zIndex:"99999999"}}>
                    <Link to='/thirdparty'>Third party animation libraries</Link>
                </div>
                {this.props.children}
            </div>
        );
    }
}

