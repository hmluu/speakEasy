import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {
    
} from 'reactstrap';


class VoiceSelection extends Component {

constructor(){
    super();
    this.state = {
        voices: [],
        selectedVoice: ""
    };
}
componentDidMount(){
    const username = "bc29be89-681c-4a51-8ce2-e2a0e5d12dae";
    const password = "A60hWo52apeE";
    const base64EncodedAuth = btoa(`${username}:${password}`);
    const corsAPI = "https://galvanize-cors.herokuapp.com/"
    const voicesAPI = 'https://stream.watsonplatform.net/text-to-speech/api/v1/voices';
       
    fetch(corsAPI + voicesAPI, {
         headers: {
           authorization: `Basic ${base64EncodedAuth}`
         }
       })
       .then(result => result.json())
       .then(data => {
         this.setState({
             voices: data.voices
         });
       })
   
}
voiceChanged = (event) => {
    this.setState({
        selectedVoice: event.target.value
    })
}

 render(){
     
     return(
        <div className='form-group'>
        <h3>Select Your Preferred Voice:</h3>
      <form>
      <select 
      onChange={this.voiceChanged}
      id="voice"
      value={this.state.selectedVoice}>
      {this.state.voices.map(voice => {
        return <option key={voice.name} value={voice.name}>{voice.description}</option>
      })}
      </select>
      </form>
      <Link className="btn btn-primary btn-lg" to={`/texts/${this.state.selectedVoice}`}>Go!</Link>
        </div>
     )
 }
}














export default VoiceSelection; 