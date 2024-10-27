import React, { useRef } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
const Search = ({ setFilter, books, theme }) => {

  const inputRef = useRef();

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
  document.body.addEventListener('keydown', e => {
    if(e.ctrlKey && (e.key=='q'|| e.key=='Q')){
      inputRef.current.focus()
    }
  })

  return (
    <>

      <input type="text" ref={inputRef} id='srch' onChange={e => changeItem(e.target.value)} className='outline-cyan-500 border boder-1 p-2 m-2 text-black w-[300px] rounded-lg' placeholder='Search CTRL+Q' />
      <label htmlFor="srch"><AiOutlineSearch className={`text-2xl text-${theme == 'white' ? 'black' : 'white'} cursor-pointer`} /> </label>
    </>
  )
}

export default Search