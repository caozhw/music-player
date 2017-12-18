/**
 * Created by caozhiwei on 2017/12/18.
 */
import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import './musiclistitem.less';


class MusicListItem extends Component {

    constructor(props) {
        super(props);

    };
    handlePlayMusic(musicItem){
        PubSub.publish('PLAY_MUSIC',musicItem);
    };
    handleDeleteMusic(musicItem,e){
        e.stopPropagation();
        PubSub.publish('DELETE_MUSIC',musicItem);
    };
    render() {
        let musicItem = this.props.musicItem;

        return (
            <li
                className={`components-listItem row ${this.props.focus?' focus':''}`}
                onClick = {this.handlePlayMusic.bind(this,musicItem)}
            >
                <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
                <p className='-col-auto delete' onClick={this.handleDeleteMusic.bind(this,musicItem)}></p>
            </li>
        )
    }
}

export default MusicListItem;