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
    <div>
        <img src={user.avatar} alt="" />
        <h3>{user.first_name} {user.last_name}</h3>
        <p>{user.email}</p>
    </div>
  )
}

export default User