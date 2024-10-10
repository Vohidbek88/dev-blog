
import React, { useContext } from 'react'
import { AiOutlineClose} from 'react-icons/ai'
import { DataContext } from '../context';
const DeleteBook = ({ book, onClose,setBool,bool }) => {
 
  const {onDeleteBook}=useContext(DataContext);


  return (
    <div className='fixed top-0 ring-0 left-0 bottom-0 bg-black bg-opacity-40 w-full h-full z-50'>
      <div className="flex mx-auto top-40 rounded-3xl flex-col w-[200px] h-[200px] backdrop-blur-md shadow-slate-400 bg-slate-400 justify-center relative">
        <AiOutlineClose className='cursor-pointer ml-auto mr-3 text-xl' onClick={onClose} />
        <p className='text-xl text-center mb-2'>TITLE:{book.title}</p>
        <p className='text-xl text-center'>Author:{book.author}</p>
        <div className='flex mt-4 p-2 justify-between'>
          <button className='p-4 bg-red-400 rounded-2xl hover:bg-red-600' onClick={() => { onDeleteBook(setBool,bool,book), onClose() }}>Delete</button>
          <button className='p-4 bg-blue-400 rounded-2xl hover:bg-blue-700' onClick={onClose}>Close</button>
        </div>
      </div>

    </div>
  )
}

export default DeleteBook