import React, { useState } from 'react'

const SearchBar = ({search, setSearch }) => {

    const handleSearch = (e) => {
        setSearch(e.target.value)
        console.log(search);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('Search triggered', search);
        }
    }

  return (
    <div className='flex'>
        <input value={search} onChange={handleSearch} onKeyDown={handleKeyPress} type="text" name="search" id="search" placeholder='Search here...' className='px-5 py-1 rounded-l-3xl border-2 border-black focus:border-blue-500 focus:outline-none transition duration-200'/>
        <button className='pl-5 pr-7 py-1 rounded-r-3xl bg-black text-white font-semibold hover:bg-blue-500 cursor-pointer'>Search</button>
    </div>
  )
}

export default SearchBar