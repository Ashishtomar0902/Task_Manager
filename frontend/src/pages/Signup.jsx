import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [Data, setData] = useState({ username: '', email: '', password: '' })
    const history = useNavigate()

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const submit = async () => {
        try {
            if (Data.username === '' || Data.email === '' || Data.password === '') {
                alert('Fill all fields.');
            }
            else {
                const response = await axios.post('http://localhost:1000/api/v1/sign-in', Data)
                setData({ username: '', email: '', password: '' })
                alert(response.data.message);
                history("/login")
            }
        }
        catch (error) {
            alert(error.response.data.message)
        }
    };

    return (
        <div className="h-[98vh] flex items-center justify-center">
            <div className="p-4 w-2/6 rounded bg-gray-800">
                <div className="text-2xl font-semibold">Signup</div>
                <input
                    type="text"
                    placeholder="Username"
                    className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                    name="username"
                    value={Data.username}
                    onChange={change}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                    name="email" // Fixed name attribute
                    value={Data.email}
                    onChange={change}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                    name="password"
                    value={Data.password}
                    onChange={change}
                />
                <div className="w-full flex items-center justify-between">
                    <button
                        className="bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded"
                        onClick={submit}
                    >
                        SignUp
                    </button>
                    <Link to="/login" className="text-gray-400 hover:text-gray-200">
                        Already having an account? Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;


