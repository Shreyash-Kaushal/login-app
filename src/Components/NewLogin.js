import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import '../Style/Login2.css';
import images from '../assets/images';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Base_URL,Google_Api_URL } from "../config";
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

function Login2() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    // const login = useGoogleLogin({
    //     onSuccess: (codeResponse) => setUser(codeResponse),
    //     onError: (error) => console.log('Login Failed:', error)
    // });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${Base_URL}/api/Auth/login`, formData);
            const token = response.data.token;
            console.log('Token:', token);
            setError('');
        } catch (error) {
            setError('Invalid username or password');
        }
    };
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                console.log('user',user)
                axios
                    .get(`${Google_Api_URL}/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        console.log('user data',res.data)
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );
    return (
        <div className="container">
            <div className="logo-div">
                <div>
                    <img src={images.mainLogo} alt='mainlogo' />
                </div>
                <div>
                    LOGO
                </div>
            </div>
            <div className="login-div">
                <div className="login-logo">
                    <img src={images.headlogo} alt="Logo" />
                </div>
                <div className="login-headline">
                    Don't wait for opportunity. Create it
                </div>
                <div className="form-div">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="username"
                            label="Username"
                            variant="standard"
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <div className='rememberme-div'>
                            <div>
                                <Checkbox
                                    aria-label='rememberme'
                                    name='rememberme'
                                />
                                <span>Remember me</span>
                            </div>
                            <div>Forget password</div>
                        </div>
                        <div>
                            {error && <div style={{ color: 'red' }}>{error}</div>}
                        </div>
                        <div className='login-btn'>
                            <Button
                                type='submit'
                                sx={
                                    {
                                        backgroundColor: '#5E5F62',
                                        width: '500px'
                                    }
                                }
                                variant="contained"
                            >Login</Button>
                        </div>

                        <div className='create-account-div'>
                            Don’t have an account ? Create an account
                        </div>
                        <div>
                            <button onClick={() => login()} type="button" class="login-with-google-btn" >
                                Sign in with Google
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Login2;