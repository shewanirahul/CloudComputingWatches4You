import React, { Component } from "react";
import { Form, Container, Row, Col,Image } from "react-bootstrap";
import "./login.css";

export default class login
 extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      fields: {},
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginForm = this.loginForm.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);
  }
  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
    });
  }
  loginForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      console.log("fields" + this.refs.username.value);

      let fields = {};
      fields["username"] = "";
      fields["password"] = "";
      this.setState({ fields: fields });

      console.log(window.getSelection().toString());

      this.fetchAPI(this.refs.username.value, this.refs.password.value);
      
    }
  }
 

  fetchAPI(username, password) {
    // param is a highlighted word from the user before it clicked the button
    console.log("Username" + username);
    console.log("Username" + password);
    fetch(
      `http://cloud7-env.eba-mm3kp2rp.us-east-1.elasticbeanstalk.com/companyz/users/${username}/${password}`
    )
      .then((r) => r.json())
      .then((response) => {
        console.log("Line 12" + response.resultStr.uerId);
        if (!response.resultStr.uerId) {
          console.log("Failure");
          localStorage.setItem("logInResults", "failure");
          alert("Invalid Credentials");
        } else {
          console.log("TResult of response   " + response.resultStr.uerId);
          localStorage.setItem("token", response.resultStr.token);
          // localStorage.setItem("user", response.resultStr.uerId);
          localStorage.setItem("user", response.resultStr.username);
          this.props.history.push("/afterLogin");
        }
      });
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    //Password
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "password cannot be empty";
    }
    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "username cannot be empty";
    }

    this.setState({
      errors: errors,
    });
    return formIsValid;
  }

  render() {
    return (
      // <React.Fragment>
      //   <Container className="login">
      //     <Form className="loginForm">
      //       <br></br>
      //       <h1>Login</h1>
      //       <br></br>
      //       <form method="post" name="loginForm" onSubmit={this.loginForm}>
      //         <table>
      //           {" "}
      //           <tr>
      //             <td>
      //               {" "}
      //               <label>Username</label>{" "}
      //             </td>
      //             <td>
      //               {" "}
      //               <input
      //                 type="text"
      //                 name="username"
      //                 ref="username"
      //                 onChange={this.handleChange}
      //                 placeholder="Enter your username"
      //               />
      //               <div className="errorMsg">{this.state.errors.username}</div>
      //             </td>
      //           </tr>
      //           <br></br>
      //           <tr>
      //             {" "}
      //             <td>
      //               {" "}
      //               <label>Password</label>
      //             </td>
      //             <td>
      //               {" "}
      //               <input
      //                 type="password"
      //                 name="password"
      //                 ref="password"
      //                 onChange={this.handleChange}
      //                 placeholder="Enter your password"
      //               />
      //               <div className="errorMsg">{this.state.errors.password}</div>
      //             </td>
      //           </tr>
      //           <br></br>
      //           <tr>
      //             {" "}
      //             <input
      //               type="submit"
      //               className="btn btn-success "
      //               value="Login"
      //             />
      //           </tr>{" "}
      //         </table>
      //       </form>
      //     </Form>
      //   </Container>
      // </React.Fragment>
      <div className = "LoginForm">
     <Row >
       <Col>
        <form className="Form"  method="post" onSubmit={this.loginForm}>
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input 
                type="text"
                 name="username"
                 ref="username"
                onChange={this.handleChange}
                className="form-control" 
                placeholder="Enter email" />
                 <div className="errorMsg">{this.state.errors.username}</div>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input 
                type="password"
                name="password" 
                ref="password"
                onChange={this.handleChange}
                className="form-control" 
                placeholder="Enter password" />
                 <div className="errorMsg">{this.state.errors.password}</div>
            </div>

            <button 
            type="submit" 
            
            className="btn btn-success btn-block">Submit</button>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            
            
                  
            </p>
        </form>
        </Col>
        {/* <Col className="image">
        </Col> */}
        </Row>
        </div>
    );
  }
}
