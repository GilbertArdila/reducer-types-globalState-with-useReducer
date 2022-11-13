import React from 'react';
import '../styles/Searcher.css';

const Searcher = ({value,onChange}) => {
  return (
    <input
    className='Searcher' 
    type="text" 
     placeholder='Search...'
     onChange={onChange}
     value={value}
     />
  )
}

export  {Searcher}