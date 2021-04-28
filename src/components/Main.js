import React, {useEffect} from 'react';
import ReactLoading from 'react-loading';
import constantbundle from '../const'
import ResizePanel from "./ResizePanel";
import style from '../css/Main.css';
import classNames from 'classnames/bind';
import Image from '../sources/SquidInk.svg';
import axios from 'axios';;
const { JSDOM } = require( "jsdom" );

let cx = classNames.bind(style);

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showfbr: true,
            adragging: false,
            loading: false
        };
        this.hidediv = this.hidediv.bind(this);
        this.hideinternal = this.hideinternal.bind(this);
        this.showinternal = this.showinternal.bind(this);
        this.clickActionGen = this.clickActionGen.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.clickActionDemo = this.clickActionDemo.bind(this);
        this.clickActionTaskAudit = this.clickActionTaskAudit.bind(this);
        this.clickActionPerScan = this.clickActionPerScan.bind(this);
        this.clickActionProjectAudit = this.clickActionProjectAudit.bind(this);
        this.clickActionUnknown = this.clickActionUnknown.bind(this);
        this.clickActionRefMat = this.clickActionRefMat.bind(this);
    }
    async clickActionGen() {
        // eslint-disable-next-line no-restricted-globals
        const data = await fetch(constantbundle.constantip + ':' + constantbundle.constantport + '/squid_servlet/reportsServlet', {
            method: "POST",
            body: null
        })
        this.setState({showfbr: true});
        console.log(this.state.loading)
    }
    async clickActionDemo() {
        // eslint-disable-next-line no-restricted-globals
        const data = await fetch(constantbundle.constantip + ':' + constantbundle.constantport + '/squid_servlet/clickServlet/D', {
            method: "POST",
            body: localStorage.getItem("user")
        })
    }
    async clickActionRefMat() {
        // eslint-disable-next-line no-restricted-globals
        const data = await fetch(constantbundle.constantip + ':' + constantbundle.constantport + '/squid_servlet/individ', {
            method: "POST",
            body: localStorage.getItem("user") + ":RefMat"
        })
    }
    async clickActionUnknown() {
        // eslint-disable-next-line no-restricted-globals
        const data = await fetch(constantbundle.constantip + ':' + constantbundle.constantport + '/squid_servlet/individ', {
            method: "POST",
            body: localStorage.getItem("user") + ":Unknown"
        })
    }
    async clickActionProjectAudit() {
        // eslint-disable-next-line no-restricted-globals
        const data = await fetch(constantbundle.constantip + ':' + constantbundle.constantport + '/squid_servlet/individ', {
            method: "POST",
            body: localStorage.getItem("user") + ":ProjectAudit"
        })
    }
    async clickActionTaskAudit() {
        // eslint-disable-next-line no-restricted-globals
        const data = await fetch(constantbundle.constantip + ':' + constantbundle.constantport + '/squid_servlet/individ', {
            method: "POST",
            body: localStorage.getItem("user") + ":TaskAudit"
        })
    }
    async clickActionPerScan() {
        // eslint-disable-next-line no-restricted-globals
        const data = await fetch(constantbundle.constantip + ':' + constantbundle.constantport + '/squid_servlet/individ', {
            method: "POST",
            body: localStorage.getItem("user") + ":PerScan"
        })
    }
    async componentDidMount() {
        window.addEventListener('message', (e) => {
            //Prevents misfires
            if(e.data.toString().length != 0 && !e.data.includes(".com")) {
                this.setState({loading: true})
                // eslint-disable-next-line no-restricted-globals
                axios.post(constantbundle.constantip + ':' + constantbundle.constantport + '/squid_servlet/OpenServlet/O', localStorage.getItem("user")
                    + ":" + e.data, {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                }).then(() => {
                    this.setState({showfbr: false});
                    this.setState({loading: false});
                }).catch(() => {
                    this.setState({loading: false});
                })
            }
            else if(e.data.includes(".com") || e.data.includes(".gov") || e.data.includes(".edu")) {
                localStorage.setItem("user", e.data);
                // eslint-disable-next-line no-restricted-globals
                axios.post(constantbundle.constantip + ':' + constantbundle.constantport + '/squid_servlet/api', e.data, {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                })
            }
        }, false)

    }
    async hidediv() {
        this.setState({showfbr: !this.state.showfbr});
    }
    async hideinternal() {
        console.log('hide')
        this.setState({adragging: true})
    }
    async showinternal() {
        console.log('show')
        this.setState({adragging: false})
    }


    render() {
        return (
            <>{this.state.loading ?
                <div>
                <div style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
                    <div>
                        <ReactLoading type={'spin'} color={'#000000'}/>
                    </div>
                </div>
                    <div style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100% + 8em)', width: '100%'}}>
                        <h1>Your file is loading</h1>
                    </div>
                </div>
             :   <div className={cx('container')}>

                    <div className={cx('body')}>
                        {this.state.showfbr ?
                            <ResizePanel onDragStart={this.hideinternal} onDragEnd={this.showinternal} direction="e"
                                         style={{id: 'fbr', flexGrow: '1'}}>
                                <div className={cx('sidebar', 'withMargin', 'panel')}>
                                    <iframe id='iframee'
                                            style={{display: 'flex', flexGrow: '1', overflow: 'auto', height: '100%'}}
                                            src='http://192.168.86.29:8090'></iframe>
                                </div>
                            </ResizePanel>
                            : null}
                        <div className={cx('content')} style={{display: 'flex', overflow: 'hidden'}}>
                            <div className={cx('header', 'panel')} style={{position: 'absolute', top: -40}}>
                                <div className="rownav navbar">
                                    <div className="dropdown">
                                        <button className="dropbtn">Project
                                            <i className="fa fa-caret-down"></i>
                                        </button>
                                        <div className="dropdown-content">
                                            <a className="DefaultState" href="#">Manage Project</a>
                                            <a className="dropdown-content-child" href="#">New Squid GEOCHRON
                                                Project</a>
                                            <a className="dropdown-content-child" href="#">New Squid RATIO
                                                Project &lt;BETA&gt; </a>
                                            <a className="dropdown-content-child" href="#">Open Squid Project</a>
                                            <a className="dropdown-content-child" href="#">Open Recent Squid Project</a>
                                            <a onClick={this.clickActionDemo} className="" href="#">Open Demonstration
                                                Squid Project</a>
                                            <a className="DefaultState" href="#">Save Squid Project</a>
                                            <a className="DefaultState" href="#">Save Squid Project as ...</a>
                                            <a className="DefaultState" href="#">Close Squid Project</a>
                                            <a className="DefaultState" href="#">Quit Squid</a>
                                            {this.state.showfbr ?
                                                <a onClick={this.hidediv} className="DefaultState" href="#">Hide FB</a>
                                                :
                                                <a onClick={this.hidediv} className="DefaultState" href="#">Show FB</a>}
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
                                            <div className="dropdown-sub">
                                                <button className="dropbtn-sub">
                                                    Summary Expressions and Values
                                                </button>
                                                <div className="dropdown-content-sub">
                                                    <a onClick={this.clickActionRefMat}href="#">Reference Materials</a>
                                                    <a onClick={this.clickActionUnknown}href="#">Unknowns</a>
                                                </div>
                                            </div>
                                            <a onClick={this.clickActionProjectAudit}href="#">Project Audit</a>
                                            <a onClick={this.clickActionTaskAudit}href="#">Task Audit</a>
                                            <a onClick={this.clickActionGen} href="#">Generate All Reports</a>
                                            <div className="dropdown-sub">
                                                <button className="dropbtn-sub">
                                                    Misc. Reports
                                                </button>
                                                <div className="dropdown-content-sub">
                                                    <a onClick={this.clickActionPerScan}href="#">PerScan Reports Bundle</a>
                                                </div>
                                            </div>
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
                                            <a href="#">File Manager</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img className="center" style={{width: '50%'}} src={Image}/>
                            {this.state.loading ?
                                <h1 style={{zIndex: 1}}>Opening your file...</h1>
                                : null}
                            <p>
                            </p>
                        </div>
                    </div>
                </div>}

            </>

        )

    }
}

export default { Main };

