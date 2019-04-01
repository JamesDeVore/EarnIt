import React, { Component } from "react";
import { connect } from "react-redux";
import { skipAuth, loginUser } from "../../actions/authActions";


class Landing extends Component {

  onSkip = e => {
    // e.preventDefault();
    const userData = {
      email: "guest@fake.com",
      password: "123456"
    };
    this.props.loginUser(userData);
    this.props.history.push("/dashboard") // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
  render() {
    return (
      <div style={{ height: "50vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h3>
              <i className="material-icons">whatshot</i> EARN that Big Mac{" "}
              <i className="material-icons">whatshot</i>
            </h3>
            <p className="flow-text">
              Search for food, find restaraunts that let you burn the
              calories walking there
            </p>
            <p className="flow-text grey-text text-darken-1">
              Log in to save searches, or skip to get straight to the app
              (Built with the MERN stack...get it?)
            </p>

            <p>
              (There's no email validation or anything, its just to show I
              can authenticate users ;) )
            </p>
            <br />
            <a
              href="/register"
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Register
            </a>
            <a
              href="/login"
              style={{
                marginLeft: "2rem",
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect white hoverable black-text"
            >
              Log In
            </a>
            <button
              onClick={() => this.onSkip()}
              // href="#"
              style={{
                marginLeft: "2rem",
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect waves-light hoverable green accent-3"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { skipAuth, loginUser }
)(Landing);
