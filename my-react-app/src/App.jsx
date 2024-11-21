import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignUpForm from './pages/LoginSignUpForm';  // Import LoginSignUpForm
import SignInBasic from './pages/SignIn/SignIn';
import SignUpBasic from './pages/SignUp/SignUp.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import { ThemeProvider } from '@mui/material/styles';
// Import your theme from the theme file
import theme from './assets/theme/index.jsx';  // Make sure this is the correct path to your theme
import ContactUs from './pages/ContactUs/contactUs.jsx';
import OwnersDashboard from './components/OwnersDashboard.jsx';
import PetProfile from './components/PetProfile.jsx';
import EditPet from './components/EditPet.jsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path='/signIn' element={<SignInBasic />} />
          <Route exact path="/signUp" element={<SignUpBasic />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/pets/:petId" element={<PetProfile />} />
          <Route exact path="/login" element={<LoginSignUpForm />} />
          <Route exact path="/register" element={<LoginSignUpForm />} />
          <Route path="/edit-pet/:petId" element={<EditPet />} />
          <Route exact path="/contactUs" element={<ContactUs/>} />
          <Route exact path="/ownerDashboard" element={<OwnersDashboard/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;