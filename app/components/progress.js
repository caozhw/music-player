/**
 * Created by caozhiwei on 2017/12/13.
 */
import React, { Component } from 'react';
import "./progress.less"

class Progress extends Component {
    constructor(props){
        super(props);
        this.handleChangeProgress = this.handleChangeProgress.bind(this);

    }
    handleChangeProgress(e){
        let progressBar = this.refs.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
        this.props.handleProgressChange && this.props.handleProgressChange(progress)
    };

    /*getDefaultProps(){
        return{
            barColor:'#24FF8C'
        }
    };*/
    render(){
        return(
            <div className="components-progress" ref="progressBar" onClick={this.handleChangeProgress}>
                <div
                    className="progress"
                    style={{width:`${this.props.progress}%`,background:this.props.barColor}}
                >
                </div>
            </div>
        )
    }
}

export default Progress;