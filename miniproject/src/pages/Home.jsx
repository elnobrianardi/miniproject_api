import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUser = async (page) => {
    const headers = {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    };

    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`,
        headers
      );
      const data = response.data.data;
      const total_pages = response.data.total_pages;
      setUsers(data);
      setTotalPages(total_pages);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    fetchUser(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-3 mx-10 my-5 items-center justify-center w-full gap-5">
        {users.map((user) => (
          <div key={user.id} className="flex flex-col items-center justify-center">
            <Link to={`/user/${user.id}`}><img src={user.avatar} alt="" /></Link>
            <Link to={`/user/${user.id}`}>
                <h3>{user.first_name} {user.last_name}</h3>
            </Link>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-5">
        <button onClick={handlePrevPage}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default Home;
