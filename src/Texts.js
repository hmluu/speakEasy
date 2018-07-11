import React, {Component} from 'react';

class Texts extends Component {
constructor(){
    super();
    this.state = {
        selectedVoice: "",
        talkingPoints: [],
        currentTalkingPoint: ""
        };


    }
    sayText(textToSay) {
        const {voiceSelected} = this.props.match.params;
        const username = "bc29be89-681c-4a51-8ce2-e2a0e5d12dae";
        const password = "A60hWo52apeE";
        const base64EncodedAuth = btoa(`${username}:${password}`);
        const corsAPI = "https://galvanize-cors.herokuapp.com/"
        fetch(corsAPI + `https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?voice=${voiceSelected}&text=${textToSay}`, {
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

    formSubmitted = (event) => {
        event.preventDefault();
        this.addPoint()
    }
    pointChanged = (event) => {
        this.setState({
            currentTalkingPoint: event.target.value
        })
    }

    addPoint = () => {
        this.setState({
            talkingPoints: [...this.state.talkingPoints, this.state.currentTalkingPoint]
        })
    }

    render() {
        return (
        <div className="container mt-5">
            <h2>Make Your Point!</h2>
            <form onSubmit={this.formSubmitted}>
                <div className="form-group">
                    <label htmlFor="Add Talking Point"></label>
                    <input onChange={this.pointChanged}  value={this.state.currentTalkingPoint} type="text" className="form-control" placeholder="Add Text"/>
                </div><br/>
                <button type="submit" className="btn btn-primary btn-lg btn-block">Add Point</button>
            </form>
            <ul>
                {this.state.talkingPoints.map(talkingPoint => {
                    return (
                        <li className="points1" key={talkingPoint}>
                            {talkingPoint}
                            <button onClick={() => this.sayText(talkingPoint)}type="submit" className="btn btn-primary btn-lg btn-block">Say It!</button>
                        </li>
                    )
                })}
            </ul>
      </div>
            
        )
    }
}






export default Texts;