import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const fetchUser = async (page) => {
        const headers = {
            headers :{
                'x-api-key': 'reqres-free-v1'
            }
        }

        try {
            const response = await axios.get(`https://reqres.in/api/users?page=${page}`, headers)
            const data = response.data.data
            const total_pages = response.data.total_pages
            setUsers(data)
            setTotalPages(total_pages)
        } catch (error) {
            console.error('Failed to fetch users', error);
        }
        
    }

    useEffect(() => {
        fetchUser(currentPage);
    }, [currentPage])

    const handleNextPage = () => {
        if(currentPage < totalPages){
            setCurrentPage(prev => prev + 1)
        }
    }

    const handlePrevPage = () => {
        if(currentPage > 1){
            setCurrentPage(prev => prev -1)
        }
    }
  return (
    
    <div>
        {users.map((user) => (
            <div key={user.id}>
                <img src={user.avatar} alt="" />
                <h3>{user.first_name} {user.last_name}</h3>
                <p>{user.email}</p>
            </div>
        ))}
        <button onClick={handlePrevPage}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
    </div>
  )
}

export default Home