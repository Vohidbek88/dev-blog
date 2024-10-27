
import React, { useContext } from 'react'
import { AiOutlineClose, AiFillDelete, AiFillCloseSquare } from 'react-icons/ai'
import { DataContext } from '../context';
const DeleteBook = ({ book, onClose }) => {

  const { onDeleteBook,theme } = useContext(DataContext);


  return (
    <div className={`fixed top-0 ring-0 left-0 bottom-0 bg-${theme} bg-opacity-40 backdrop-blur-sm w-full h-full z-50`}>
      <div className={`flex border-2 border-solid mx-auto top-40 rounded-3xl flex-col w-[250px] h-auto backdrop-blur-md shadow-slate-100 bg-${theme} bg-opacity-90 justify-center relative`}>
        <AiOutlineClose className={`cursor-pointer ml-auto mt-2 mr-3 text-xl text-${theme=='black' ? 'white':'black'}`} onClick={onClose} />
        <p className={`text-xl text-center mb-2 text-${theme=='black' ? 'white':'black'}`}>{String(book.title).slice(0,32)}{String(book.title).length>32 && '...'}</p>
        <p className={`text-xl text-center text-${theme=='black' ? 'white':'black'}`}>{String(book.author).slice(0,50)}{String(book.author).length>50 && '...'}</p>
        <div className='flex mt-4 p-2 justify-between'>
          <button className='p-4 bg-red-400 rounded-2xl hover:bg-red-600' onClick={() => { onDeleteBook( book), onClose() }}>Delete <AiFillDelete className='text-xl' /></button>
          <button className='p-4 bg-blue-400 rounded-2xl hover:bg-blue-700' onClick={onClose}>Close <AiFillCloseSquare className='text-xl' /></button>
        </div>
      </div>
    </div>
  )
}

export default DeleteBook