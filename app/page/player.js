import React from 'react';
import {Link} from 'react-router'
import PubSub from 'pubsub-js';
import Progress from '../components/progress.js';
import  './player.less'


let duration;
let Player = React.createClass({

    handleProgressChange(progress){
        $('#player').jPlayer('play',duration * progress);
        this.setState({
            isPlay:true
        });
    },
    handleVolumeChange(progress){
        $('#player').jPlayer('volume',progress);
        this.setState({
            volume: progress * 100
        });
    },
    handlePlay(progress){
        if(this.state.isPlay){
            $('#player').jPlayer('pause');

        }else{
            $('#player').jPlayer('play', duration * progress);
        }
        this.setState({
            isPlay:!this.state.isPlay
        });
    },
    handlePlayPrev(){
        PubSub.publish('PLAY_PREV');
    },
    handlePlayNext(){
        PubSub.publish('PLAY_NEXT');
    },
    formatTime(time){
        time = Math.floor(time);
        let minutes = Math.ceil(time / 60 );
        let seconds = Math.floor(time % 60 );

        seconds = seconds < 10?`0${seconds}`:seconds;
        return  `${minutes}:${seconds}`;
    },
    getInitialState(){
        return{
            progress:0,
            volume:0,
            isPlay:true,
            leftTime:''
        }
    },
    componentDidMount(){

        $('#player').bind($.jPlayer.event.timeupdate,(e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                volume:e.jPlayer.options.volume*100,
                //progress:Math.round(e.jPlayer.status.currentTime)
                progress:e.jPlayer.status.currentPercentAbsolute,
                leftTime: this.formatTime(duration * (1- e.jPlayer.status.currentTime / 100))
            });
        });
    },
    componentWillUnmount(){
        $('#jPlayer').unbind($.jPlayer.event.timeupdate);
    },
    render() {
        return (
            <div>
                <div className='player-page'>
                    <h1 className='caption'>
                        <Link to='/list'>
                            我的音乐&gt;
                        </Link>
                    </h1>
                    <div className="mt20 row">
                        <div className='controll-wrapper'>
                            <h2 className='music-title'>{this.props.currentMusicItem.title}</h2>
                            <h3 className='music-artist mt10'>{this.props.currentMusicItem.artist}</h3>
                            <div className='row mt20'>
                                <div className='volume-container'>
                                    <i className='icon-volume rt' style={{top: 5, left: -5}}></i>
                                    <div className='volume-wrapper'>
                                        <Progress
                                            barColor='#8e31c2'
                                            progress={this.state.volume}
                                            handleProgressChange = {this.handleVolumeChange}
                                        >
                                        </Progress>
                                    </div>
                                </div>
                            </div>
                            <div style={{height:10,lineHeight:'10px'}}>
                                <Progress
                                    barColor='#24FF8C'
                                    progress={this.state.progress}
                                    handleProgressChange = {this.handleProgressChange}
                                    >
                                </Progress>
                                <div className='left-time -col-auto'>{this.state.leftTime}</div>
                            </div>
                            <div className='mt35 row'>
                                <div>
                                    <i className='icon prew' onClick={this.handlePlayPrev}></i>
                                    <i className={`icon ml20 ${this.state.isPlay?'pause':'play'}`} onClick={this.handlePlay}></i>
                                    <i className='icon next ml20' onClick={this.handlePlayNext}></i>
                                </div>
                                <div className='-col-auto'>
                                    <i className='icon repeat-cycle'></i>
                                </div>
                            </div>
                        </div>
                        <div className='-col-auto cover'>
                            <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
})

export default Player