import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const User = () => {
    const [user, setUser] = useState({})
    const { id } =useParams()

    const fetchUser = async (e) => {
        const headers = {
            headers : {
                'x-api-key': 'reqres-free-v1'
            }
        }
        try {
            const response = await axios.get(`https://reqres.in/api/users/${id}`, headers)
            const data = response.data.data
            setUser(data)
        } catch (error) {
            console.error('Failed to fetch users', error);
        }
    }

    useEffect(()=>{
        fetchUser()
    },[])

  return (
    <div className='flex flex-col items-center justify-center m-10'>
        <h1 className='mb-10 font-bold text-3xl'>User Profile</h1>
        <img src={user.avatar} alt="" className='rounded-xl'/>
        <h3 className='font-bold text-xl'>{user.first_name} {user.last_name}</h3>
        <p className='text-xs'>{user.email}</p>
    </div>
  )
}

export default User