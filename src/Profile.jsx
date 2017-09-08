import React, { Component } from 'react'
import './App.css';

export default class Profile extends Component {
    render() {
        let artist = {'name': '', followers: {total: ''}};
        if (this.props.artist !== null) {
            artist = this.props.artist;
        }
        return (
            <div>
                <div>{artist.name}</div>
                <div>{artist.followers.total}</div>
            </div>
        )
    }
}
