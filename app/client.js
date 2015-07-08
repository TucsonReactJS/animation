/**
 * The client JS file that brings in React and bootstraps the app into the page from the server state.
 */
import React from "react"
import { Router, Route, Link } from 'react-router'
import { history } from 'react-router/lib/BrowserHistory'
//components
import App from "./app"
import ThirdParty from "./thirdparty"

console.log(Router);
console.log(Route);

//put React into the global scope for chrome dev tool support
window.React = React;
//grab the app node
const mountNode = document.getElementById('app');
//render our app component into that node
React.render(<Router history={history}>
    <Route path="/" component={App}>
        <Route path="thirdparty" component={ThirdParty}/>
        <Route path="*" component={App}/>
    </Route>
</Router>, mountNode);
