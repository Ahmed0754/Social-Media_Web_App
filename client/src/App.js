import './App.css';
import Navbar from './components/Navbar.js';
import Register from './components/RegisterForm.js'
import Login from './components/LoginForm.js'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Register />
      <Login />
    </div>
  );
}

export default App;
