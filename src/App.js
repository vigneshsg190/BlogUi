import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blog from './components/blog';

function App() {
  return (
    <>
    <Header />
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
     </>
  );
}

export default App;
