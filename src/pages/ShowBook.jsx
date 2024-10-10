import React, { useContext, useEffect, useState, useTransition } from 'react'
import { useParams } from 'react-router-dom';
import {AiFillClockCircle,AiOutlineFieldTime} from 'react-icons/ai'
import {BiUserCheck} from 'react-icons/bi'
import Spinner from '../components/Spinner';
import { DataContext } from '../context';


const ShowBook = () => {
    const [book, setBook] = useState(null);
    const { getBookSingle, toBase64,getSingleImage } = useContext(DataContext)
    const [imgBuffer, setImgBuffer] = useState(null);
    const [isPending, startTransition] = useTransition()

    const { id } = useParams();



    useEffect(() => {
    
        startTransition(() => {
            getBookSingle(id, setBook)    
        })
    
    }, [])

if(book){
    getSingleImage(book?.imageObject,setImgBuffer) 
}
    return (
        <div className='flex  justify-center mx-auto items-center w-[320px]'>
            {
                (isPending) ? <Spinner /> : (
                    <div className="flex flex-col justify-center border-2 border-sky-700 rounded-xl p-1 w-fit">
                        <div className='my-2'>

                            {
                                toBase64(imgBuffer?.data) ? <img src={`data:image/png;base64,${toBase64(imgBuffer?.data)}`} width={'300px'} height={'300px'} alt={book?.title} /> : <Spinner />
                            }

                        </div>
                        <div className="my-2 hover:bg-slate-400 p-2 rounded-md flex items-center">
                            <span className='text-xl mr-4 text-amber-500'><BiUserCheck/></span>
                            <span>{book?.email}</span>
                        </div>
                        <div className="my-2 hover:bg-slate-400 p-2 rounded-md">
                            <span className='text-xl mr-4 text-gray-500'>Title</span>
                            <span>{book?.title}</span>
                        </div>
                        <div className="my-2 hover:bg-slate-400 p-2 rounded-md flex items-center">
                            <span className='text-xl mr-4 text-amber-500'></span>
                            <span>{book?.author}</span>
                        </div>
                        <div className="my-2 hover:bg-slate-400 p-2 rounded-md flex items-center">
                            <span className='text-xl mr-4 text-amber-500 flex items-center gap-x-1'><AiOutlineFieldTime/>publish year:</span>
                            <span>{book?.publishYear}</span>
                        </div>
                        <div className="my-2 hover:bg-slate-400 p-2 rounded-md flex items-center">
                            <span className='text-xl mr-4 text-amber-500 flex items-center gap-x-1'><AiFillClockCircle/> update:</span>
                            <span>{new Date(book?.createdAt).toString().slice(7, 25)}</span>
                        </div>
                        <div className="my-2 hover:bg-slate-400 p-2 rounded-md flex items-center">
                            <span className='text-xl mr-4 text-amber-500 flex items-center gap-x-1'><AiFillClockCircle/>create:</span>
                            <span>{new Date(book?.updatedAt).toString().slice(7, 25)}</span>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ShowBook