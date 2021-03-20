import React from "react";
//import ResizePanel from "react-resize-panel";
import ResizePanel from "react-resize-panel";
import style from '../css/Main.css';
import classNames from 'classnames/bind';
const axios = require('axios');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const ready = require('document-ready')
let cx = classNames.bind(style);
export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalReactPackages: null,
            fbrdisplay: 'block',
            showfbr: true
        };
        this.fbrDisplay = React.createRef()
        this.hidediv = this.hidediv.bind(this);


    }
    async clickActionGen() {
        const data = await fetch('reportsServlet', {
            method: "POST",
            body: null
        })
    }
    async componentDidMount() {
        // GET request using fetch with async/await
        fetch('http://192.168.86.29:8090/api/resources/', {
            headers: {
                'X-Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJsb2NhbGUiOiJlbiIsInZpZXdNb2RlIjoibGlzdCIsInNpbmdsZUNsaWNrIjpmYWxzZSwicGVybSI6eyJhZG1pbiI6ZmFsc2UsImV4ZWN1dGUiOnRydWUsImNyZWF0ZSI6dHJ1ZSwicmVuYW1lIjp0cnVlLCJtb2RpZnkiOnRydWUsImRlbGV0ZSI6dHJ1ZSwic2hhcmUiOnRydWUsImRvd25sb2FkIjp0cnVlfSwiY29tbWFuZHMiOltdLCJsb2NrUGFzc3dvcmQiOmZhbHNlLCJoaWRlRG90ZmlsZXMiOmZhbHNlfSwiZXhwIjoxNjE1Mjc2MzcwLCJpYXQiOjE2MTUyNjkxNzAsImlzcyI6IkZpbGUgQnJvd3NlciJ9.hyTJCJyogoKUmh4AU2pDbP4lyOVoR13tlEFLGQcZ2Ss'
            }
        }).then((response) => {
            // The API call was successful!
            return response.text();
        }).then((html) => {
            // This is the HTML from our response as a text string
            this.setState({ totalReactPackages: html })
        }).catch(function (err) {
            // There was an error
            console.warn('Something went wrong.', err);
        });

    }

    async hidediv() {
        this.setState({showfbr: !this.state.showfbr});
    }


    render() {
        const { totalReactPackages, fbrdisplay } = this.state;
        return (
            <div className={cx('container')}>
                <div className={cx('header', 'panel')}> <div className="rownav navbar">
                    <div className="dropdown">
                        <button className="dropbtn">Project
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a className="DefaultState" href="#">Manage Project</a>
                            <a className="dropdown-content-child" href="#">New Squid GEOCHRON Project</a>
                            <a className="dropdown-content-child" href="#">New Squid RATIO Project &lt;BETA&gt; </a>
                            <a className="dropdown-content-child" href="#">Open Squid Project</a>
                            <a className="dropdown-content-child" href="#">Open Recent Squid Project</a>
                            <a className="" href="#">Open Demonstration Squid Project</a>
                            <a className="DefaultState" href="#">Save Squid Project</a>
                            <a className="DefaultState" href="#">Save Squid Project as ...</a>
                            <a className="DefaultState" href="#">Close Squid Project</a>
                            <a className="DefaultState" href="#">Quit Squid</a>
                            {this.state.showfbr ?
                                <a onClick={this.hidediv}className="DefaultState" href="#">Hide FB</a>
                                : <a onClick={this.hidediv}className="DefaultState" href="#">Show FB</a>}
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Data
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Task--&gt;
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Isotopes
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Expressions
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Common Pb
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Interpretations
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Reports
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="#">Custom Report Builder</a>
                            <a href="#">Summary Expressions and Values</a>
                            <a href="#">Project Audit</a>
                            <a href="#">Task Audit</a>
                            <a onClick={this.clickActionGen} href="#">Generate All Reports</a>
                            <a href="#">Misc. Reports</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Archiving
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Parameters
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">About
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="#">About Squid3</a>
                            <a href="#">How to Cite Squid3</a>
                            <a href="#">Squid3 Github Repository</a>
                            <a href="#">Squid3 Development Notes</a>
                            <a href="#">CIRDLES.org</a>
                            <a href="#">Topsoil Github Repository</a>
                            <a href="#">Enjoy!</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Help
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="#">Introduction and Guide to Menu</a>
                            <a href="#">Video Tutorials</a>
                            <a href="#">Contribute an Issue on Github</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">My Files
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="#" onClick="fileManager()">File Manager</a>
                        </div>
                    </div>
                </div>
                </div>
                <div className={cx('body')}>
                    {this.state.showfbr ?
                        <ResizePanel  direction="e" style={{ id: 'fbr',flexGrow: '1'}} >
                        <div className={cx('sidebar', 'withMargin', 'panel')}>
                            <iframe style={{ display: 'flex', flexGrow: '1', overflow: 'auto', height: '100%'}} src='http://192.168.86.29:8090'></iframe>
                        </div>
                        </ResizePanel>
                        : null}
                    <div className={cx('content')} style={{ display: 'flex', overflow: 'hidden'}}>
                        <h1>Squid Stuff Here</h1>
                        <p>
                        </p>
                    </div>
                </div>
            </div>
        )

    }
}

export default { Main };

