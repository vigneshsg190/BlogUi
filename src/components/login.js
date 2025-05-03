import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import '../css/style.css';
import axios from 'axios';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

const handlename = (e) => {
    let name = e.target.value;
    setName(name);
    console.log(name);
}
const handlepassword = (e) => {
    let password = e.target.value;
    setPassword(password);
    // console.log(password);
    // setPassword(e.target.value);
}

const navigate = useNavigate();
const FormSubmit = (e) => {
    e.preventDefault();
    try {
     axios.get('http://localhost:8000/users')
     .then((res) => {
        const userdetails = res.data;
        const users = userdetails.find(users=>users.name === name && users.password === password )
        if (users){
            navigate('/blog');
        }else{
            alert('Invalid Credentials');
        }
     })
    }
    catch (error) {
    alert('Login Failed');
  }
};

    return (
        <>
            <div className="login">
                <div className='form-container'>
                    <h1>Login</h1>
                    <form onSubmit={FormSubmit}>
                        <div className="form-group mb-4">
                            <label>Name:</label>
                            <input type="text" onChange={handlename} value={name} id="name" name="name" required />
                        </div>
                        <div className="form-group mb-4">
                            <label>Password:</label>
                            <input type="password" onChange={handlepassword} value={password} id="password" name="password" required />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;

