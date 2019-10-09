import React, { Component } from "react";
// import Swal from "sweetalert2";
// import Cookies from "universal-cookie";
import head from "../img/head.png";
import login from "../img/login.svg";
import axios from "axios";
import ls from "local-storage";
import Swal from "sweetalert2";

var CLIENT_ID = "softbike-web";
var GRANT_TYPE = "password";
// var username = "iamrraj";
// var password = "Rahul@1995";
// var username =
// data: `grant_type=${GRANT_TYPE}&username=${username}&password=${password}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
export class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  }
  componentDidMount() {
    this.redirect();
  }

  handleSubmit(e) {
    e.preventDefault();
    axios({
      // Define Method
      method: "post",

      // Set Access Token URL
      url: `http://softbike.dev.myddp.eu/api/1/oauth/token/`,

      //Set Headers
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
        // "Cache-Control": "no-cache"
      },

      // Interpolate variables in the strings using Template Literals
      data: `grant_type=${GRANT_TYPE}&username=${this.state.username}&password=${this.state.password}&client_id=${CLIENT_ID}`
    })
      .then(response => {
        console.log(response.data);
        var ls = require("local-storage");
        ls.set("Token", response.data["access_token"]);
        ls.set("RefreshToken", response.data["refresh_token"]);
        ls.set("Toke Type", response.data["token_type"]);
        ls.set("Token Scope", response.data["scope"]);
        ls.set("Expire in", response.data["expires_in"]);
        // ls.set("Username", response.data["user.username"]);
        Swal.fire({
          title: "Logged in",
          type: "success",
          showConfirmButton: false,
          timer: 1000
        });
        this.redirect();
      })
      .catch(response => {
        //handle error
        console.log(response);
        Swal.fire({
          title: "Login Error",
          type: "error",
          text: "Please Enter Correct Username and Password",
          timer: 1000
        });
      });
  }
  redirect() {
    if (ls.get("Token")) {
      this.props.history.push("/dashboard");
      window.location.reload();
    }
  }

  render() {
    return (
      <section className="login-block ">
        <div className="containe container">
          <div className="row">
            <div className="col-md-5 id login-sec ">
              <img src={head} alt="logo" style={{ height: "60px" }}></img>{" "}
              <br></br>
              <span className="headd" style={{ fontSize: "13px" }}>
                SOFT BIKE
              </span>
              <h5 className=" text-dark text-left log">LOG IN</h5>
              <form className="login-form">
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    style={{
                      color: "rgba(19, 183, 96, 1.0)",
                      fontSize: "13px",
                      opacity: "0.7"
                    }}
                  >
                    Login
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputPassword1"
                    style={{
                      color: "rgba(19, 183, 96, 1.0)",
                      fontSize: "13px",
                      opacity: "0.7"
                    }}
                  >
                    Hasło
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder=""
                    name="password"
                    // value={password}
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    opacity: "0.6",
                    fontWeight: "400",
                    fontFamily: "'Roboto', Helvetica, Arial, serif"
                  }}
                >
                  Forget Password ?
                </p>
                <br></br>
                <button
                  type="submit"
                  value="Login"
                  onClick={this.handleSubmit}
                  className="btn btn-login btn-block text-white font-weight-bolder box "
                  style={{
                    background: "rgba(19, 183, 96, 1.0)",
                    padding: "10px",
                    boxShadow: "0px 8px 25px -7px #c0c0c0",
                    borderRadius: "4px"
                  }}
                >
                  START
                </button>
              </form>
            </div>
            <div className="col-md-7 banner-sec">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="0"
                    className="active"
                  ></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active">
                    <img
                      className="d-block img-fluid"
                      src={login}
                      alt="First slide"
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <div className="banner-text">
                        <h2>SOFT BIKE</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Auth;
