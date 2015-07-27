import React from "react/addons"
import InlineCss from "react-inline-css"
import Animate from "react-animate"
import snabbt from "snabbt.js"
import path from "./path"
import SourceCode from "./source_code"

@path("app/menu.jsx")
class Menu extends React.Component {

    /**
     * Constructor. Sets a default blur filter state
     * @param props
     */
    constructor( props ) {
        super(props);
        this.state = {
            bgFilter: "blur(0px)"
        }
    }

    /**
     * The stylesheet for this component
     * @returns {*}
     */
    stylesheet() {

        return `

            .menu-bg-frost {
                display: block;
                width: 100%;
                height: 100%;
                background-image: url('images/menu-bg.jpeg');
                background-size: cover;
                content: ' ';
                opacity: 0.7;
                filter: blur(0px);
                -webkit-filter: blur(0px);
                transition:all 250ms ease;
                transform:translateZ(0);
            }
            .radial-menu {
              cursor: pointer;
              position: fixed;
              list-style: none;
              bottom: 80px;
              right: 80px;
              margin:0 auto;
              padding: 0;
              height: 100px;
              width: 100px;
              background: #333;
              border-radius: 50px;
              transition: all 500ms ease;
              opacity:.8;
            }
            .radial-menu.open {
              transform: scale3d(2, 2, 2);
              opacity:1;
            }
            .radial-menu.open:before {
              font-size: 0em;
              margin-left: 0;
              margin-top: 0;
            }
            .radial-menu.open li {
              transform: scale3d(1, 1, 1);
              opacity: 1;
            }
            .radial-menu:before {
              content: '\\2630';
              position: absolute;
              left: 50%;
              color: #fff;
              top: 50%;
              font-size: 3em;
              margin-left: -19px;
              margin-top: -29px;
              transition: all 900ms ease;
            }
            .radial-menu li {
              position: absolute;
              height: 30px;
              width: 30px;
              display: block;
              border-radius: 30px;
              transition: all 500ms ease;
              transform: scale3d(0, 0, 0);
              line-height: 30px;
              text-align: center;
              color: #fff;
              opacity: 0;
            }
            .radial-menu li:nth-child(1) {
              background-color: #e67e22;
              right: 15px;
              top: 15px;
              transition-delay: 100ms;
            }
            .radial-menu li:nth-child(2) {
              background-color: #9b59b6;
              left: 15px;
              top: 15px;
              transition-delay: 200ms;
            }
            .radial-menu li:nth-child(3) {
              background-color: #3498db;
              left: 15px;
              bottom: 15px;
              transition-delay: 300ms;
            }
            .radial-menu li:nth-child(4) {
              background-color: #2ecc71;
              right: 15px;
              bottom: 15px;
              transition-delay: 400ms;
            }
        `;
    }

    /**
     * Toggle the menu open or close
     */
    toggleMenu() {
        if ( this.state.overMenu ) {
            this.exitMenu();
        } else {
            this.enterMenu();
        }
    }

    /**
     * Run a tween when the menu is active
     */
    enterMenu() {
        let _this = this;
        //setup our tween
        this.tween = new TweenLite({
            filter: 0
        }, .5, {
            ease: "Quad.easeOut",
            filter: 5,
            onUpdate: function() {
                _this.setState({bgFilter: this.target.filter});
            }, onComplete: function() {
                _this.setState({bgFilter: this.target.filter});
            }
        });

        this.setState({overMenu: true});

    }

    /**
     * Run a tween when the menu is not active
     */
    exitMenu() {
        let _this = this;

        //setup our tween
        this.tween = new TweenLite({
            filter: 5
        }, .5, {
            ease: "Quad.easeOut",
            filter: 0,
            onUpdate: function() {
                _this.setState({bgFilter: this.target.filter});
            }, onComplete: function() {
                _this.setState({bgFilter: this.target.filter});
            }
        });

        this.setState({overMenu: false});

    }

    render() {
        let menuClassName = this.state.overMenu ? "radial-menu open" : "radial-menu";
        return (<div>
            <InlineCss stylesheet={this.stylesheet()}>
                <div ref="bg" style={{webkitFilter:`blur(${this.state.bgFilter}px`}} className="menu-bg-frost">
                </div>
                <ul className={menuClassName} onClick={this.toggleMenu.bind(this)}>
                    <li>♫</li>
                    <li>☼</li>
                    <li>✉</li>
                    <li>✎</li>
                </ul>
            </InlineCss>
            <SourceCode path={Menu.path}/>
        </div>);
    }
}
export default Animate.extend(Menu)