import React from "react/addons"
import request from "superagent"
import InlineCss from "react-inline-css"

export default class SourceCode extends React.Component {
    constructor( props ) {
        super(props);
        this.state = {content: "", open: false, fullscreen: false, fontSize: 13};
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
                 background-color:#f5f2f0;
                  z-index:9999;
                  overflow:hidden;
                  transition:all 525ms ease;
                  cursor:pointer;

            }
            .source-code span, .source-code code, .source-code pre {
              font-size:${this.state.fontSize}px;
            }
            .source-code .icon-document {
                  position: absolute;
                  top: 13px;
                  right: 15px;
                  fill: #333;

            }
            .source-code .icon-bar {
                display:none;
            }

             .source-code.open .icon-bar {
               display:block;
                   position: absolute;
                top: 13px;
                right: 48px;
                  fill: #333;
            }
                .source-code.open .icon-bar svg {
                    fill:#333;
                    stroke:#333;
                    margin-right:14px;
                }
            .source-code.open {
                bottom:0;
                left:0;
                height:${this.state.fullscreen ? 100 : 70}vh;
                width:${this.state.fullscreen ? 100 : 70}vw;
                overflow:auto;
            }
            .source-code.open pre,code {
              opacity:1 !important;
            }
            .source-code pre,code {
                border-radius:0px;
                border:none;
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
                    Prism.highlightAll();
                } else {
                    this.setState({content: "Couldn't load source code"});
                }
            });
    }

    toggleSource() {
        this.setState({open: !this.state.open});
    }

    toggleFullScreen( event ) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({fullscreen: !this.state.fullscreen});
    }

    zoomIn( event ) {
        event.preventDefault();
        event.stopPropagation();

        let size = this.state.fontSize;
        this.setState({fontSize: ++size});

    }

    zoomOut( event ) {
        event.preventDefault();
        event.stopPropagation();

        let size = this.state.fontSize;
        this.setState({fontSize: --size});
    }

    render() {
        let className = this.state.open ? "source-code open" : "source-code";

        let icon = this.state.open ?

            <svg className="icon-document" version="1.1" x="0px" y="0px"
                 width="25px" height="25px" viewBox="0 0 339.177 339.177">

                <path d="M247.244,169.59l83.938-83.938c5.332-5.327,7.994-11.798,7.994-19.414c0-7.614-2.669-14.084-7.994-19.414L292.355,7.993
		C287.026,2.665,280.556,0,272.944,0c-7.617,0-14.085,2.665-19.417,7.993L169.59,91.931L85.651,7.993
		C80.325,2.665,73.854,0,66.237,0c-7.611,0-14.083,2.665-19.414,7.993L7.994,46.824C2.667,52.15,0,58.624,0,66.238
		c0,7.616,2.664,14.084,7.994,19.414l83.937,83.938L7.994,253.528C2.667,258.859,0,265.327,0,272.945
		c0,7.61,2.664,14.082,7.994,19.41l38.83,38.828c5.33,5.332,11.803,7.994,19.414,7.994c7.616,0,14.084-2.669,19.414-7.994
		l83.939-83.938l83.944,83.938c5.328,5.332,11.793,7.994,19.417,7.994c7.611,0,14.082-2.669,19.411-7.994l38.82-38.828
		c5.332-5.324,7.994-11.8,7.994-19.41c0-7.618-2.662-14.086-7.994-19.417L247.244,169.59z"/>

            </svg> : <svg className="icon-document" version="1.1" x="0px" y="0px"
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
                <div className="icon-bar">
                    <svg onClick={this.toggleFullScreen.bind(this)} className="icon-fullscreen"
                         xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                         viewBox="0 0 438.543 438.543">
                        <path
                            d="M407.42 159.029c3.62 3.616 7.898 5.428 12.847 5.428 2.282 0 4.668-.476 7.139-1.429 7.426-3.235 11.136-8.853 11.136-16.846v-127.906c0-4.949-1.807-9.231-5.428-12.847-3.61-3.617-7.898-5.424-12.847-5.424h-127.907c-7.991 0-13.607 3.805-16.848 11.419-3.23 7.423-1.902 13.99 4 19.698l41.111 41.112-101.352 101.355-101.354-101.358 41.112-41.112c5.901-5.708 7.232-12.275 3.999-19.698-3.239-7.614-8.853-11.421-16.846-11.421h-127.906c-4.952 0-9.235 1.809-12.851 5.426-3.617 3.616-5.424 7.898-5.424 12.847v127.907c0 7.996 3.809 13.61 11.419 16.846 2.285.948 4.57 1.429 6.855 1.429 4.948 0 9.229-1.812 12.847-5.427l41.112-41.109 101.354 101.354-101.354 101.349-41.112-41.113c-5.711-5.903-12.275-7.231-19.702-4.001-7.614 3.241-11.419 8.856-11.419 16.854v127.906c0 4.948 1.807 9.229 5.424 12.847 3.619 3.614 7.902 5.421 12.851 5.421h127.906c7.996 0 13.61-3.806 16.846-11.416 3.234-7.427 1.903-13.99-3.999-19.705l-41.112-41.106 101.354-101.359 101.353 101.361-41.114 41.11c-5.899 5.708-7.228 12.279-3.997 19.698 3.237 7.617 8.856 11.423 16.851 11.423h127.907c4.948 0 9.232-1.813 12.847-5.428 3.613-3.613 5.42-7.898 5.42-12.847v-127.905c0-7.994-3.709-13.613-11.136-16.851-7.802-3.23-14.462-1.903-19.985 4.004l-41.106 41.106-101.359-101.35 101.358-101.354 41.11 41.112z"/>
                    </svg>
                    <svg onClick={this.zoomIn.bind(this)} className="icon-zoom-in" xmlns="http://www.w3.org/2000/svg"
                         width="25" height="25"
                         viewBox="0 0 475.084 475.084">
                        <path
                            d="M464.524 412.846l-97.929-97.925c23.6-34.068 35.406-72.04 35.406-113.917 0-27.218-5.284-53.249-15.852-78.087-10.561-24.842-24.838-46.254-42.825-64.241-17.987-17.987-39.396-32.264-64.233-42.826-24.845-10.565-50.874-15.847-78.092-15.847-27.216 0-53.247 5.282-78.085 15.847-24.842 10.562-46.254 24.839-64.241 42.826-17.989 17.987-32.264 39.403-42.827 64.241-10.564 24.841-15.846 50.869-15.846 78.087 0 27.216 5.282 53.238 15.846 78.083 10.562 24.838 24.838 46.247 42.827 64.241 17.987 17.986 39.403 32.257 64.241 42.825 24.841 10.563 50.869 15.844 78.085 15.844 41.879 0 79.852-11.807 113.922-35.405l97.929 97.641c6.852 7.231 15.406 10.849 25.693 10.849 10.089 0 18.699-3.566 25.838-10.705 7.139-7.138 10.704-15.748 10.704-25.837s-3.518-18.651-10.561-25.694zm-173.161-121.488c-25.029 25.033-55.148 37.549-90.364 37.549-35.21 0-65.329-12.519-90.36-37.549-25.031-25.029-37.546-55.144-37.546-90.36 0-35.21 12.518-65.334 37.546-90.36 25.026-25.032 55.15-37.546 90.36-37.546 35.212 0 65.331 12.519 90.364 37.546 25.033 25.026 37.548 55.15 37.548 90.36 0 35.216-12.519 65.331-37.548 90.36zM283.232 182.728h-63.954v-63.953c0-2.475-.905-4.615-2.712-6.424-1.809-1.809-3.951-2.712-6.423-2.712h-18.273c-2.474 0-4.615.903-6.423 2.712-1.807 1.809-2.712 3.949-2.712 6.424v63.953h-63.954c-2.474 0-4.615.905-6.423 2.712-1.809 1.809-2.712 3.949-2.712 6.424v18.271c0 2.475.903 4.617 2.712 6.424 1.809 1.809 3.946 2.713 6.423 2.713h63.954v63.954c0 2.478.905 4.616 2.712 6.427 1.809 1.804 3.949 2.707 6.423 2.707h18.272c2.473 0 4.615-.903 6.423-2.707 1.807-1.811 2.712-3.949 2.712-6.427v-63.954h63.954c2.478 0 4.612-.905 6.427-2.713 1.804-1.807 2.703-3.949 2.703-6.424v-18.271c0-2.475-.899-4.615-2.703-6.424-1.807-1.807-3.949-2.712-6.426-2.712z"/>
                    </svg>
                    <svg onClick={this.zoomOut.bind(this)} className="icon-zoom-out" xmlns="http://www.w3.org/2000/svg"
                         width="25" height="25"
                         viewBox="0 0 475.084 475.084">
                        <path
                            d="M464.524 412.846l-97.929-97.925c23.6-34.068 35.406-72.04 35.406-113.917 0-27.218-5.284-53.249-15.852-78.087-10.561-24.842-24.838-46.254-42.825-64.241-17.987-17.987-39.396-32.264-64.233-42.826-24.845-10.565-50.874-15.847-78.092-15.847-27.216 0-53.247 5.282-78.085 15.847-24.842 10.562-46.254 24.839-64.241 42.826-17.989 17.987-32.264 39.403-42.827 64.241-10.564 24.841-15.846 50.869-15.846 78.087 0 27.216 5.282 53.238 15.846 78.083 10.562 24.838 24.838 46.247 42.827 64.241 17.987 17.986 39.403 32.257 64.241 42.825 24.841 10.563 50.869 15.844 78.085 15.844 41.879 0 79.852-11.807 113.922-35.405l97.929 97.641c6.852 7.231 15.406 10.849 25.693 10.849 10.089 0 18.699-3.566 25.838-10.705 7.139-7.138 10.704-15.748 10.704-25.837s-3.518-18.651-10.561-25.694zm-173.161-121.488c-25.029 25.033-55.148 37.549-90.364 37.549-35.21 0-65.329-12.519-90.36-37.549-25.031-25.029-37.546-55.144-37.546-90.36 0-35.21 12.518-65.334 37.546-90.36 25.026-25.032 55.15-37.546 90.36-37.546 35.212 0 65.331 12.519 90.364 37.546 25.033 25.026 37.548 55.15 37.548 90.36 0 35.216-12.519 65.331-37.548 90.36zM283.228 182.728h-164.45c-2.474 0-4.615.905-6.423 2.712-1.809 1.809-2.712 3.949-2.712 6.424v18.271c0 2.475.903 4.617 2.712 6.424 1.809 1.809 3.946 2.713 6.423 2.713h164.454c2.478 0 4.612-.905 6.427-2.713 1.804-1.807 2.703-3.949 2.703-6.424v-18.271c0-2.475-.903-4.615-2.707-6.424-1.804-1.807-3.949-2.712-6.427-2.712z"/>
                    </svg>
                </div>
                <pre><code ref="code" className="language-jsx">{this.state.content}</code></pre>
            </div>
        </InlineCss>);
    }
}
