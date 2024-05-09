import React, { useState } from "react";
import axios from 'axios';

function Registration() {
    const [formData, setFormData] = useState({ username: '', password: '' });
const [error, setError] = useState('');
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('https://localhost:44360/api/Auth/Register', formData);
        const token = response.data.token;
    } catch (error) {
        console.log(error);
    }
};

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Registration;