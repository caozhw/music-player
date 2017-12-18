/**
 * Created by caozhiwei on 2017/12/13.
 */
import React from 'react';
import {Router,IndexRoute,Link,Route,hashHistory} from 'react-router';
import PubSub from 'pubsub-js';
import Header from './components/header.js';
import Player from './page/player.js';
import MusicList from './page/musiclist.js';
import { MUSIC_LIST } from './config/musiclist';


let App = React.createClass({
    getInitialState(){
        return{
            musicList:MUSIC_LIST,
            currentMusicItem:MUSIC_LIST[0]
        }
    },
    handlePlayMusic(musicItem){
        $('#player').jPlayer('setMedia',{
            mp3:musicItem.file
        }).jPlayer('play');

        this.setState({
            currentMusicItem:musicItem
        })
    },

    handlePlayNext(type='next'){
        let index = this.findMusicIndex(this.state.currentMusicItem);
        let newIndex = null,musicListLen = this.state.musicList.length;
        if(type ==='next'){
            newIndex = (index + 1) % musicListLen;
        }else{
            newIndex = (index - 1 + musicListLen) % musicListLen;
        }

        this.handlePlayMusic(this.state.musicList[newIndex]);
    },
    findMusicIndex(musicItem){
      return this.state.musicList.indexOf(musicItem);
    },

    componentDidMount(){
        {/*
        $('#player').jPlayer({
            ready:function(){
                $(this).jPlayer('setMedia',{
                    mp3:MUSIC_LIST[1].file
                    //mp3:'http://up.mcyt.net/md5/17/MTA1NDE1Mjk0_Qq4329912.mp3'
                    //mp3:'http://up.mcyt.net/md5/17/MTMzMTgyODY0_Qq4329912.mp3'
                    //mp3:'http://up.mcyt.net/md5/53/MzM1MjgzMDM=_Qq4329912.mp3'
                }).jPlayer('play');
            },
            supplied:'mp3',
            wmode:'window'
        });
         */}

        $('#player').jPlayer({
            supplied:'mp3',
            wmode:'window'
        });

        this.handlePlayMusic(this.state.currentMusicItem);

        $('#player').bind($.jPlayer.event.ended,(e)=>{
            this.handlePlayNext();
        });

        PubSub.subscribe('PLAY_MUSIC',(msg,musicItem)=>{
            this.handlePlayMusic(musicItem);
        });
        PubSub.subscribe('DELETE_MUSIC',(msg,musicItem)=>{
            this.setState({
                musicList:this.state.musicList.filter(item =>{
                    return item !==musicItem;
                })
            })
        });

        PubSub.subscribe('PLAY_PREV',(msg,musicItem)=>{
            this.handlePlayNext('prev');
        });
            PubSub.subscribe('PLAY_NEXT',(msg,musicItem)=>{
            this.handlePlayNext('next');
        });
    },
    componentWillUnmount(){
        PubSub.unsubscribe('PLAY_MUSIC');
        PubSub.unsubscribe('DELETE_MUSIC');
        PubSub.unsubscribe('PLAY_PREV');
        PubSub.unsubscribe('PLAY_NEXT');
        $('#player').unbind($.jPlayer.event.ended);
    },

    render() {
        return (
            <div >
                <Header />
                {React.cloneElement(this.props.children,this.state)}
                {/*
                {this.props.children}
                <Player
                    currentMusicItem = {this.state.currentMusicItem}
                    >
                </Player>
                <MusicList
                    currentMusicItem = {this.state.currentMusicItem}
                    musicList={this.state.musicList}
                    >
                </MusicList>
                 */}
            </div>
        );
    }
});

let Root = React.createClass({
    render(){
        return(
            <Router history = {hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Player}></IndexRoute>
                    <Route path="/list" component={MusicList}></Route>

                </Route>
            </Router>
            )

    }

});

export default Root;