import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/pages/Navbar.js';
import Register from './components/pages/RegisterForm.js';
import Login from './components/pages/LoginForm.js';
import Profile from './components/pages/Profile';
import UsersList from './components/pages/UsersList';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="users" element={<UsersList />} />


        </Route>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
