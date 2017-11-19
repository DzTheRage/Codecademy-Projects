import React from 'react';
import './Track.css';

class Track extends React.Component {
    
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.previewTrack = this.previewTrack.bind(this);
    }
    
    addTrack(){
        this.props.onAdd(this.props.track);
    }
    
    removeTrack(){
        this.props.onRemove(this.props.track);
    }
    
    previewTrack(){
        this.props.onPreview(this.props.track.name, this.props.track.artist, this.props.track.preview);
    }
    
    render(){
        return(
    <div className="Track">
        <div className="Track-information">
            <h3>{this.props.track.name}</h3>
            <p>{this.props.track.artist} | {this.props.track.album}</p>
          </div>
          <a className="Track-action" onClick={this.addTrack}>+ </a>
          <a className="Track-action" onClick={this.removeTrack}>-</a>
          <a className="Track-action, PreviewLink" onClick={this.previewTrack}>Preview</a>
    </div>
        );
    }
}

export default Track;