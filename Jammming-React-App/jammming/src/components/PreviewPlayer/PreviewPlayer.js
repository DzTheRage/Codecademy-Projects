import React from 'react';
import './PreviewPlayer.css';

class PreviewPlayer extends React.Component {
    
    render(){
        return(
    <div className="PreviewPlayer">
        <h3>Playing: {this.props.previewName} {this.props.previewArtist}</h3>
        <video src={this.props.previewSrc} controls autoPlay type="audio/mpeg"/>
        {console.log(this.props.previewName)}
    </div>
        );
    }
}

export default PreviewPlayer;