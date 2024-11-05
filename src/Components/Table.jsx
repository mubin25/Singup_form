import React from 'react'
import './Table.css'

const Table = () => {
  return (
    <>
    <div className='box'>
    <h1 className='user-form'>Form Data</h1>
    <div className='table-box'>
       <thead>
        <tr>
            <th className='table'>Email</th>
            <th className='table'>First Name</th>
            <th className='table'>Last Name</th>
            <th className='table'>Phone</th>
            <th className='table'>Password</th>
        </tr>
       </thead>
    </div>
    </div>
    </>
  )
}

export default Table
