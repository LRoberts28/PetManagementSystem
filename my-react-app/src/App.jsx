import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignUpForm from './pages/LoginSignUpForm';  // Import LoginSignUpForm

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<LoginSignUpForm/>} />
        <Route exact path="/register" element={<LoginSignUpForm/>} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
