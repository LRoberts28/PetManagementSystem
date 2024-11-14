import React, { useState } from 'react';
import { MDBContainer, MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom'; // Correct hook for React Router v6
import './LoginSignUpForm.css';

function LoginSignUpForm() {
  const [justifyActive, setJustifyActive] = useState('tab1');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', username: '', email: '', password: '' });
  const navigate = useNavigate();  // Updated hook for navigation in React Router v6

  const handleJustifyClick = (value) => {
    if (value === justifyActive) return;
    setJustifyActive(value);
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in:', loginData);
    // Add your login API logic here, e.g., call your authentication API

    // If login is successful, redirect to another page (e.g., dashboard)
    navigate('/dashboard'); // Update with actual path
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Registering:', registerData);
    // Add your registration API logic here, e.g., call your registration API

    // After successful registration, redirect to login page or login directly
    navigate('/login'); // Update with actual path
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBTabs pills justify className="mb-3 d-flex flex-row justify-content-between">
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
      <MDBTabsPane show={justifyActive === 'tab1' ? 'true' : undefined}>
          <form onSubmit={handleLoginSubmit}>
            <div className="text-center mb-3">
              <p>Sign in with:</p>
              <div className="d-flex justify-content-between mx-auto" style={{ width: '40%' }}>
                <MDBBtn tag="a" color="none" className="m-1" style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>
                <MDBBtn tag="a" color="none" className="m-1" style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>
                <MDBBtn tag="a" color="none" className="m-1" style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>
                <MDBBtn tag="a" color="none" className="m-1" style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
              </div>
              <p className="text-center mt-3">or:</p>
            </div>

            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="login-email"
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="login-password"
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
            />
            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox name="flexCheck" value="" id="flexCheckDefault" label="Remember me" />
              <a href="#!">Forgot password?</a>
            </div>
            <MDBBtn type="submit" className="mb-4 w-100">Sign in</MDBBtn>
            <p className="text-center">Not a member? <a href="#!" onClick={() => handleJustifyClick('tab2')}>Register</a></p>
          </form>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2' ? 'true' : undefined}>
          <form onSubmit={handleRegisterSubmit}>
            <div className="text-center mb-3">
              <p>Sign up with:</p>
              <div className="d-flex justify-content-between mx-auto" style={{ width: '40%' }}>
                <MDBBtn tag="a" color="none" className="m-1" style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>
                <MDBBtn tag="a" color="none" className="m-1" style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>
                <MDBBtn tag="a" color="none" className="m-1" style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>
                <MDBBtn tag="a" color="none" className="m-1" style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
              </div>
              <p className="text-center mt-3">or:</p>
            </div>

            <MDBInput
              wrapperClass="mb-4"
              label="Name"
              id="register-name"
              type="text"
              name="name"
              value={registerData.name}
              onChange={handleRegisterChange}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Username"
              id="register-username"
              type="text"
              name="username"
              value={registerData.username}
              onChange={handleRegisterChange}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              id="register-email"
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="register-password"
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
            />
            <div className="d-flex justify-content-center mb-4">
              <MDBCheckbox name="flexCheck" id="flexCheckDefault" label="I have read and agree to the terms" />
            </div>
            <MDBBtn type="submit" className="mb-4 w-100">Sign up</MDBBtn>
          </form>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
}

export default LoginSignUpForm;  // Make sure this is a default export
