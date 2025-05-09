import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import '../css/style.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isform, setForm] = useState(false);

    const handlename = (e) => {
        let name = e.target.value;
        setName(name);
        console.log(name);
    }
    const handlepassword = (e) => {
        let password = e.target.value;
        setPassword(password);
    }

    const navigate = useNavigate();
    const FormSubmit = (e) => {
        e.preventDefault();
        try {
            axios.get('http://localhost:8000/users')
                .then((res) => {
                    const userdetails = res.data;
                    const users = userdetails.find(users => users.name === name && users.password === password)
                    if (users) {
                        toast.success('Success!');
                        setTimeout(() => navigate('/blog'), 1000);
                    } else {
                        toast.error("Invalid Credentials")
                    }
                })
        }
        catch (error) {
            alert('Login Failed');
        }
    };

    const signupfunc = () => {
        console.log("sign");
        setForm(true);
    }

    const signUpFormSubmit = (e) => {
        console.log(name, password);
        e.preventDefault();
        const newuser = {
            names: name,
            passworda: password,
        }
        axios.post('http://localhost:8000/users', newuser)
            .then(() => {
                toast.success('Sign Up Success!');
                setTimeout(() => navigate('/'), 1000);
            })
        setPassword('');
        setName('');
        setForm(false);

    }

    const SignUphandlepassword = (e) => {
        let password = e.target.value;
        setPassword(password);
    }

    const SignUphandlename = (e) => {
        let name = e.target.value;
        setName(name);
    }

    return (
        <>
            <div className="login">
                <div className='form-container'>
                    {!isform ? (
                        <>
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
                                <button type="submit" onClick={signupfunc} className="btn btn-primary m-2">Sign UP</button>
                            </form>
                        </>
                    ) : (
                        <>
                            <h1>Sign Up</h1>
                            <form onSubmit={signUpFormSubmit}>
                                <div className="form-group mb-4">
                                    <label>Name:</label>
                                    <input type="text" onChange={SignUphandlename} value={name} id="name" name="name" required />
                                </div>
                                <div className="form-group mb-4">
                                    <label>Password:</label>
                                    <input type="password" onChange={SignUphandlepassword} value={password} id="password" name="password" required />
                                </div>
                                <button type="submit" className="btn btn-primary">Sign In</button>
                            </form>
                        </>
                    )}
                    <Toaster />
                </div>
            </div>
        </>
    )
}

export default Login;

