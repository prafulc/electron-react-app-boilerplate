import React, { Component } from "react";
import axios from '../axios';

console.log(axios.defaults)

class App extends Component {
    constructor (props) {
        super(props);
        this.state = { string: '' };
    }

    componentDidMount () {
        axios.get('/api/data').then((res) => {
            this.setState({
                string: JSON.stringify(res.data)
            })
        })
    }

  render() {
    return (
      <div style={{ textAlign: "center", marginTop: "10rem" }}>
        <h1>API DATA</h1>
        <p>{this.state.string}</p>
      </div>
    );
  }
}

export default App;