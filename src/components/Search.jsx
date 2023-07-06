import React from 'react';

const Search = ({ searchTerm, searchDate, handleSearch, handleSearchTermChange, handleSearchDateChange }) => {
  return (
    <div className='col-md-7 d-sm-flex justify-content-center'>
        <input
            className='form-control mx-2 w-25'
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
            placeholder="Search by title or description"
        />
        <input
            className='form-control mx-2 w-25'
            type="date"
            value={searchDate}
            onChange={handleSearchDateChange}
            placeholder="Search by Date"
        />
        <button onClick={handleSearch} className='btn btn-primary'>Search</button>
    </div>
  )
}

export default Search