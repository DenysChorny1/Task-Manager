import React from 'react';

const Search = ({ searchTerm, searchDate, handleSearch, handleSearchTermChange, handleSearchDateChange }) => {
  return (
    <div className='col-xl-5 d-sm-flex justify-content-center'>
        <input
            className='form-control mx-2'
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
            placeholder="Search by title or description"
        />
        <input
            className='form-control mx-2 my-2 my-sm-0'
            type="date"
            value={searchDate}
            onChange={handleSearchDateChange}
            placeholder="Search by Date"
        />
        <button onClick={handleSearch} className='btn btn-primary mx-2'>Search</button>
    </div>
  )
}

export default Search