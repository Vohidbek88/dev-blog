import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
const Search = ({ setFilter, books }) => {

  const changeItem = (val) => {
    if (val.trim() != '') {

      const itemsFilter = books.filter(item => item.title.toLowerCase().includes(String(val).toLowerCase()) || String(item.publishYear).toLowerCase().includes(String(val).toLowerCase()) || String(item.author).toLowerCase().includes(String(val).toLowerCase()));
      setFilter(itemsFilter)
      console.log(itemsFilter);
    }
    if (!val) {
      setFilter(books)
    }
    ;
  }


  return (
    <>
        
        <input type="text" id='srch' onChange={e => changeItem(e.target.value)} className='outline-cyan-500 border boder-1 p-2 m-2 text-black w-[300px] rounded-lg' placeholder='Search' />
        <label htmlFor="srch"><AiOutlineSearch className='text-2xl cursor-pointer'/></label>
    </>
  )
}

export default Search