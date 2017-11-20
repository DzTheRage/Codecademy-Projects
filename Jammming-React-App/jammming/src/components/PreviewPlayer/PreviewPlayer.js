import React from 'react';
import './PreviewPlayer.css';

class PreviewPlayer extends React.Component {
    
    render(){
        return(
        <div className="PreviewPlayer">
                <div className="PreviewInfo">
                    <img src={this.props.previewIMG} alt=""/>
                    <h3>{this.props.previewName} - {this.props.previewArtist}</h3>
                </div>
                <video id="previewVideo" src={this.props.previewSrc} controls autoPlay type="audio/mpeg"/>
        </div>
        );
    }
}

export default PreviewPlayer;