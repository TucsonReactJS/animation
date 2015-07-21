import React from "react/addons"
import InlineCss from "react-inline-css"
import Animate from "react-animate"
import snabbt from "snabbt.js"

class Menu extends React.Component {

    constructor( props ) {
        super(props);
        this.state = {
            bgFilter: "blur(0px)"
        }
    }

    stylesheet() {

        return `

            .menu-bg-frost {
                display: block;
                width: 100%;
                height: 100%;
                background-image: url('images/menu-bg.jpeg');
                background-size: cover;
                content: ' ';
                opacity: 0.4;
                filter: blur(0px);
                -webkit-filter: blur(0px);
                transition:all 250ms ease;
                transform:translateZ(0);
            }

            .radial-menu:before {
                  content:'\\2630';
                    position: absolute;
                  left: 50%;
                  color: #fff;
                  top: 50%;
                  font-size: 3em;
                  margin-left: -19px;
                  margin-top: -29px;
            }
            .radial-menu {
            cursor:pointer;
              position: fixed;
              top: 50%;
              left: 50%;
              margin-top:-50px;
              margin-left:-50px;
              padding: 0;
              height: 100px;
              width: 100px;
              background: #333;
              border-radius:50px;
            }
        `;
    }

    blur() {
        let _this = this;
        //setup our tween
        this.tween = new TweenLite({
            filter: 0
        }, .2, {
            ease: "Quad.easeOut",
            filter: 5,
            onUpdate: function() {
                _this.setState({bgFilter: this.target.filter});
            }, onComplete: function() {
                _this.setState({bgFilter: this.target.filter});
            }
        });

    }

    unblur() {
        let _this = this;

        //setup our tween
        this.tween = new TweenLite({
            filter: 5
        }, .2, {
            ease: "Quad.easeOut",
            filter: 0,
            onUpdate: function() {
                _this.setState({bgFilter: this.target.filter});
            }, onComplete: function() {
                _this.setState({bgFilter: this.target.filter});
            }
        });

    }

    render() {
        return (<div>
            <InlineCss stylesheet={this.stylesheet()}>
                <div ref="bg" style={{webkitFilter:`blur(${this.state.bgFilter}px`}} className="menu-bg-frost">
                </div>
                <ul className="radial-menu" onMouseEnter={this.blur.bind(this)}
                    onMouseOut={this.unblur.bind(this)} onMouseLeave={this.unblur.bind(this)}>
                </ul>
            </InlineCss>
        </div>);
    }
}
export default Animate.extend(Menu)