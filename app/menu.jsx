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
                   transition:all 250ms ease;
            }
            .radial-menu {
            cursor:pointer;
              position: fixed;
              list-style:none;
              top: 50%;
              left: 50%;
              margin-top:-50px;
              margin-left:-50px;
              padding: 0;
              height: 100px;
              width: 100px;
              background: #333;
              border-radius:50px;
              transition:all 250ms ease;
            }
            .radial-menu.open {
              transform: scale3d(2, 2, 2);

            }
            .radial-menu.open:before {
                 font-size: 0em;
                  margin-left: 0;
                  margin-top: 0;
            }
            .radial-menu li{
              position:absolute;
              height:30px;
              width:30px;
              display:block;
              border-radius:30px;
            }
            .radial-menu li:nth-child(1){
                background-color:red;
            }
            .radial-menu li:nth-child(2){
                background-color:blue;
            }
            .radial-menu li:nth-child(3){
                 background-color:green;
            }
            .radial-menu li:nth-child(4){
                background-color:yellow;
            }
        `;
    }

    enterMenu() {
        let _this = this;
        //setup our tween
        this.tween = new TweenLite({
            filter: 0
        }, .25, {
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

    exitMenu() {
        let _this = this;

        //setup our tween
        this.tween = new TweenLite({
            filter: 5
        }, .25, {
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
                <ul className={menuClassName} onMouseEnter={this.enterMenu.bind(this)}
                    onMouseOut={this.exitMenu.bind(this)} onMouseLeave={this.exitMenu.bind(this)}>
                    <li aria-label="Profile"></li>
                    <li aria-label="Settings"></li>
                    <li aria-label="Message"></li>
                    <li aria-label="Friends"></li>
                </ul>
            </InlineCss>
        </div>);
    }
}
export default Animate.extend(Menu)