#animation

This repo goes over a few different approaches on using animation in ReactJS.

##Third party animation
The third-party animation example uses [snabbt](https://daniel-lundin.github.io/snabbt.js/) to interact
with the DOM nodes after the component has mounted

##react-animate
The React-animate example uses the [react-animate](https://github.com/elierotenberg/react-animate) module to trigger
state-based animations that use inline-stylesheet objects

##ReactCSSTransitionGroup
The ReactCSSTransitionGroup example uses [ReactCSSTransitionGroup](https://facebook.github.io/react/docs/animation.html#high-level-api-reactcsstransitiongroup)
and CSS classes to animate the UI elements.

##react-motion
The react-motion example uses [react-motion](https://github.com/chenglou/react-motion) to build "physics" aware UI elements
that animate accordingly.

##menu
The "menu" example uses a combination of CSS transitions toggled via classes, 
and state based animations using [TweenLite](http://greensock.com/tweenlite)

##State transitions
The state transitions example shows how to use ReactCSSTransitionGroup to 
transition between states in [react-router](https://github.com/rackt/react-router)