import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Header extends Component {
    constructor (props) {
        super(props);
        this.active = {
          fontWeight: "bold",
          color: "red"
        };
      
        this.header = {
          display: "flex",
          justifyContent: "space-evenly",
          listStyle: "none"
        };
    }
  render() {
    return (
      <div style={this.header}>
        <NavLink exact to="/" activeStyle={this.active}>
          Home
        </NavLink>
        <NavLink to="/posts" activeStyle={this.active}>
          Posts
        </NavLink>
      </div>
    );
  }
}

export default Header;