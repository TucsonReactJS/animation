import React from "react/addons"
import request from "superagent"
import InlineCss from "react-inline-css"

export default class SourceCode extends React.Component {
    constructor( props ) {
        super(props);
        this.state = {content: "", open: false};
    }

    /**
     * The stylesheet for this component
     * @returns {*}
     */
    stylesheet() {

        return `

            .source-code {
                height:50px;
                width:50px;
                bottom:0;
                left:0;
                position:fixed;
                 background-color:#002b36;
                  z-index:9999;
                  overflow:hidden;
                  transition:all 525ms ease;
                  cursor:pointer;
            }
            .source-code svg {
                  position: absolute;
                  top: 13px;
                  right: 15px;
                  fill: white;

            }
            .source-code.open {
                bottom:0;
                left:0;
                height:70vh;
                width:70vw;
                overflow:auto;
            }
            .source-code.open pre,code {
              opacity:1 !important;
            }
            .source-code pre,code {
                border-radius:0px;
                border:none;
                background-color:#002b36;
                color:#fff;
                opacity:0;
            }
        `;
    }

    componentWillReceiveProps( nextProps ) {
        if ( nextProps.path !== this.props.path ) {
            this.getSource(nextProps);
        }
    }

    componentDidMount() {
        this.getSource(this.props);

    }

    getSource( props ) {
        request
            .get(`https://api.github.com/repos/TucsonReactjs/animation/contents/${props.path}`)
            .end(( err, res ) => {
                if ( !err ) {
                    this.setState({content: atob(res.body.content)});
                    //highlight
                    let code = React.findDOMNode(this.refs.code);
                    hljs.highlightBlock(code);
                } else {
                    this.setState({content: "Couldn't load source code"});
                }
            });
    }

    toggleSource() {
        this.setState({open: !this.state.open});
    }

    render() {
        let className = this.state.open ? "source-code open" : "source-code";

        let icon = this.state.open ?

            <svg version="1.1" x="0px" y="0px"
                 width="25px" height="25px" viewBox="0 0 339.177 339.177">

                <path d="M247.244,169.59l83.938-83.938c5.332-5.327,7.994-11.798,7.994-19.414c0-7.614-2.669-14.084-7.994-19.414L292.355,7.993
		C287.026,2.665,280.556,0,272.944,0c-7.617,0-14.085,2.665-19.417,7.993L169.59,91.931L85.651,7.993
		C80.325,2.665,73.854,0,66.237,0c-7.611,0-14.083,2.665-19.414,7.993L7.994,46.824C2.667,52.15,0,58.624,0,66.238
		c0,7.616,2.664,14.084,7.994,19.414l83.937,83.938L7.994,253.528C2.667,258.859,0,265.327,0,272.945
		c0,7.61,2.664,14.082,7.994,19.41l38.83,38.828c5.33,5.332,11.803,7.994,19.414,7.994c7.616,0,14.084-2.669,19.414-7.994
		l83.939-83.938l83.944,83.938c5.328,5.332,11.793,7.994,19.417,7.994c7.611,0,14.082-2.669,19.411-7.994l38.82-38.828
		c5.332-5.324,7.994-11.8,7.994-19.41c0-7.618-2.662-14.086-7.994-19.417L247.244,169.59z"/>

            </svg> : <svg version="1.1" x="0px" y="0px"
                          width="25px" height="25px" viewBox="0 0 438.533 438.533">
            <path d="M382.58,108.493l-89.078-89.081c-9.521-9.517-22.087-15.706-37.692-18.558v145.324h145.326
			C398.281,130.566,392.091,118.006,382.58,108.493z"/>
            <path d="M246.676,182.72c-7.617,0-14.089-2.663-19.417-7.993c-5.33-5.327-7.992-11.799-7.992-19.414V0H63.953
			C56.341,0,49.869,2.663,44.54,7.993c-5.33,5.327-7.994,11.799-7.994,19.414v383.719c0,7.617,2.664,14.089,7.994,19.417
			c5.33,5.325,11.801,7.991,19.414,7.991h310.633c7.611,0,14.079-2.666,19.407-7.991c5.328-5.332,7.994-11.8,7.994-19.417V182.72
			H246.676z"/>

        </svg>;

        return (<InlineCss stylesheet={this.stylesheet()}>
            <div className={className} onClick={this.toggleSource.bind(this)}>
                {icon}
                <pre><code ref="code" className="es6">{this.state.content}</code></pre>
            </div>
        </InlineCss>);
    }
}
