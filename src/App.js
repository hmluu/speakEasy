import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import {
  Navbar,
  NavbarBrand,
  Container,
} from 'reactstrap';

import Home from './Home';
import VoiceSelection from './VoiceSelection';
import Texts from './Texts';
const NotFound = () => <h1>Not Found</h1>;
class App extends Component { //one fetch is for component did mount, another fetch is for when the user presses speak
  componentDidMount(){

    this.sayText("Click start to begin!"); 

  }
    sayText(textToSay) {
    const username = "bc29be89-681c-4a51-8ce2-e2a0e5d12dae";
    const password = "A60hWo52apeE";
    const base64EncodedAuth = btoa(`${username}:${password}`);
    const corsAPI = "https://galvanize-cors.herokuapp.com/"
    fetch(corsAPI + 'https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?text=' + textToSay, {
      headers: {
        authorization: `Basic ${base64EncodedAuth}`
      }})
    .then(response => response.blob())
    .then(blob => {
      const audio = new Audio();
      const objectUrl = URL.createObjectURL(blob);
      audio.src = objectUrl;
      audio.onload = () => {
        URL.revokeObjectURL(objectUrl);
      };
      audio.play();
    });
  }

 
  render() {
    return (
      <div className="App">
       <Navbar color="navbar navbar-expand-lg navbar-dark bg-dark" light expand="lg">
          <NavbarBrand href="/">SpeakEasy, taking the ARGGH out of ARGument.</NavbarBrand>
          </Navbar>
        
        <Container>
          <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/VoiceSelection' component={VoiceSelection}/>
          <Route path='/texts/:voiceSelected' component={Texts}/>
          <Route path='*' component={NotFound}/>
            </Switch>
          </Container>

        </div>
    );
  }
}

export default App;

