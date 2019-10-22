import React, { Component } from "react";
import axios from "axios";
import config from "../Views/config";
export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    let authToken = localStorage.getItem("Token");
    axios({
      // Define Method
      method: "GET",

      // Set Access Token URL
      url: config.apiUrl.me,

      //Set Headers
      headers: {
        Authorization: "Bearer " + JSON.parse(authToken)
      }
      //   data: this.state.name
    })
      .then(response => {
        // const name = response.data;
        console.log(response);

        // Save Name in Localstorage
        var ls = require("local-storage");
        ls.set("Name", response.data["name"]);
        this.setState({
          name: response.data.name
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <span>
        {/* {localStorage.getItem("Name")} */}
        {this.state.name}
      </span>
    );
  }
}

export default User;
