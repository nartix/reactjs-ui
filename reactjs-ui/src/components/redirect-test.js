import { Navigate, useNavigate } from 'react-router-dom';
import React, { Component } from 'react';

const Redirecttest1 = () => {
  const n = useNavigate();
  const activateLasers = () => {
    //n('/');
    return <Navigate to="/" />;
  };
  return <button onClick={activateLasers}>Activate Lasers</button>;
};

class Redirecttest extends React.Component {
  Form = () => {
    const n = useNavigate();
    const activateLasers = () => {
      n('/');
    };
    return <button onClick={activateLasers}>Activate Lasers</button>;
  };
  render() {
    return <this.Form />;
  }
}

export default Redirecttest;
