import React from "react";
import { Navigate } from 'react-router-dom';

const withAuth = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isAuthenticated: false,
      };
    }

    componentDidMount() {
      const token = localStorage.getItem("token"); // or get the token from a cookie
      console.log(token)
      if (token) {
        this.setState({ isAuthenticated: true });
      }
    }

    render() {
        console.log(this.state.isAuthenticated)
      if (this.state.isAuthenticated) {
        console.log("1")
        return <Component {...this.props} />;
      } else {
        console.log("2")
        return <Navigate to="/email" />;
      }
    }
  };
};

export default withAuth;
