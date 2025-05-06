import React, { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        const payload = {
            email: email,
            password: password
        }
        const headers = {
            headers : {
                'x-api-key': 'reqres-free-v1'
            }
        }

        try {
            const response = await axios.post('https://reqres.in/api/register', payload, headers)
            console.log(response.data);
            setSuccess("Successfully Registered")
            setTimeout(() => {
                navigate('/')
            }, 2000)            
        } catch (error) {
            console.log(error.message);
            setError('Invalid Credentials')
        }
    }
  return (
    <div className='flex flex-col justify-center items-center gap-5 w-screen'>
        <h1>Welcome!</h1>
        {success && <p className='text-green-500'>{success}</p>}
        {error && <p className='text-red-500'>{error}</p>}
        <input onChange={handleChangeEmail} type="email" placeholder='Email' name='email' />
        <input onChange={handleChangePassword} type="password" placeholder='password' name='password' />
        <p>Already have an account? <Link to='/login'>Login</Link></p>
        <button onClick={handleRegister} type="submit" className='bg-blue-500 px-5 py-2 rounded-3xl'>Register</button>
    </div>
  )
}

export default Register

