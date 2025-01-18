import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => password.length >= 6;
    const validatePhone = (phone) => phone.length === 10;
    const validateName = (name) => name.length <= 15;

    const handleSubmit = async (e) => {
        e.preventDefault();
        let fromErrors = {};

        if (!name.trim()) fromErrors.name = 'Name is required';
        else if (!validateName(name)) fromErrors.name = 'Name length not more than 15';

        if (!email.trim()) fromErrors.email = 'Email is required';
        else if (!validateEmail(email)) fromErrors.email = 'Invalid email format';

        if (!password.trim()) fromErrors.password = 'Password is required';
        else if (!validatePassword(password)) fromErrors.password = 'Password must be at least 6 characters';

        if (!ConfirmPassword.trim()) fromErrors.ConfirmPassword = 'Please confirm your password';
        else if (password !== ConfirmPassword) fromErrors.ConfirmPassword = 'Passwords do not match';

        if (!phone.trim()) fromErrors.phone = 'Phone number is required';
        else if (!validatePhone(phone)) fromErrors.phone = 'Phone number should be 10 digits';

        if (Object.keys(fromErrors).length > 0) {
            setErrors(fromErrors);
        } else {
            try {
                const response = await axios.post('http://localhost:5000/submit', {
                    name,
                    email,
                    password,
                    phone,
                });
                console.log('Form submitted successfully:', response.data);
                setSuccessMessage('Form submitted successfully!');
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setPhone('');
                setErrors({});
            } catch (error) {
                console.error('Error submitting form:', error);
                setSuccessMessage('Failed to submit the form. Please try again later.');
            }
        }
    };

    return (
      <>
        <form className="form" onSubmit={handleSubmit}>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <label htmlFor="name">
                <span className="label">Name:</span>
                <input
                    className="user-input"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            </label>

            <label htmlFor="email">
                <span className="label">Email:</span>
                <input
                    className="user-input"
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </label>

            <label htmlFor="password">
                <span className="label">Password:</span>
                <input
                    className="user-input"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            </label>

            <label htmlFor="confirm-password">
                <span className="label">Confirm Password:</span>
                <input
                    className="user-input"
                    type="password"
                    id="confirm-password"
                    value={ConfirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.ConfirmPassword && <p style={{ color: 'red' }}>{errors.ConfirmPassword}</p>}
            </label>

            <label htmlFor="phone">
                <span className="label">Phone:</span>
                <input
                    className="user-input"
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
            </label>

            <button className="btn" type="submit">
                Submit
            </button>
        </form>
        </>
    );
};

export default Form;
