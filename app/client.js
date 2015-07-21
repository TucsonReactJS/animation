/**
 * The client JS file that brings in React and bootstraps the app into the page from the server state.
 */
import React from "react"
import { Router, Route, Link, Redirect } from 'react-router'
import { history } from 'react-router/lib/BrowserHistory'

//components
import App from "./app"
import ThirdPartyGrid from "./third_party_grid"
import ReactAnimateGrid from "./react_animate_grid"
import CssAnimateGrid from "./css_animate_grid"
import ReactMotionGrid from "./react_motion_grid"
import Menu from "./menu"

//state transition components
import StateTransitions from "./state_transitions/state-transitions"
import PageOne from "./state_transitions/page_one"
import PageTwo from "./state_transitions/page_two"


//put React into the global scope for chrome dev tool support
window.React = React;

//grab the app node
const mountNode = document.getElementById('app');

//render our app component into that node
React.render(<Router history={history}>
    <Route path="/" component={App}>
        <Route path="thirdparty" component={ThirdPartyGrid}/>
        <Route path="reactanimate" component={ReactAnimateGrid}/>
        <Route path="cssanimate" component={CssAnimateGrid}/>
        <Route path="reactmotion" component={ReactMotionGrid}/>
        <Route path="menu" component={Menu}/>
        <Route path="statetransitions" component={StateTransitions}>
            <Route path="pageone" component={PageOne}/>
            <Route path="pagetwo" component={PageTwo}/>
            <Redirect from="statetransitions" to="pageone"/>
        </Route>
        <Redirect from="/" to="thirdparty"/>
        <Route path="*" component={App}/>
    </Route>
</Router>, mountNode);