/**
 * Created by caozhiwei on 2017/12/18.
 */
import React, { Component } from 'react';
import MusicListItem from '../components/musiclistitem.js';


class MusicList extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        let listEle = null;
        listEle = this.props.musicList.map((item) => {
            return (
                <MusicListItem
                    key={item.id}
                    musicItem={item}
                    focus ={item === this.props.currentMusicItem}
                >
                </MusicListItem>
            )
        });
        return (
            <div>
            <ul>
                {listEle}
            </ul>

             </div>
        )
    }
}

export default MusicList;