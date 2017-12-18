/**
 * Created by caozhiwei on 2017/12/13.
 */
import React, { Component } from 'react';
import "./header.less"

class Header extends Component {
    render(){
        return(
            <div className="components-header row">
                <img src="/static/images/logo.png" width="40" alt="" class="-col-auto" />
                <h1 className="caption">music player</h1>
            </div>
        )
    }
}

export default Header;