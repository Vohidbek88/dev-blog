import React, { useContext, useEffect, useState, useTransition } from 'react'
import { useParams } from 'react-router-dom';
import { AiFillClockCircle,AiFillDownSquare, AiFillHeart, AiOutlineHeart, AiOutlineFullscreen, AiFillCloseCircle } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import Spinner from '../components/Spinner';
import { DataContext } from '../context';
import FullImage from '../components/FullImage';
import { Helmet } from 'react-helmet';


const ShowBook = () => {
    const [book, setBook] = useState(null);
    const { getBookSingle, theme } = useContext(DataContext)

    const [isPending, startTransition] = useTransition()
    const [fullShow, setFullShow] = useState(false)
    const { id } = useParams();



    useEffect(() => {

        startTransition(() => {
            getBookSingle(id, setBook)
        })

    }, [])
    if (!book) {
        return <div className={`bg-${theme} flex justify-center h-[90vh] items-center`}>
            <p className={`text-2xl text-center p-2  border-yellow-500 border-2 rounded-md text-${theme == 'white' ? 'black' : 'white'}`}>{id} detail not Found😐</p>
        </div>
    }

    return (
        <div className={`bg-${theme} flex  justify-center h-max md:h-[90vh] md:items-center w-full`}>
            <Helmet>
                <title>{String(book?.title).slice(0, 18)}...</title>
            </Helmet>
            {
                (isPending) ? <Spinner /> : (


                    <article className={` w-[90%] mx-5 h-max md:w-max  flex flex-col md:flex-row  md:items-center justify-between py-2 px-1 md:py-4 md:px-3 gap-x-5 bg-${theme} rounded-md  shadow-slate-400 shadow-2xl`}>
                        <div className='w-full md:w-[40%] relative'>
                            <AiOutlineFullscreen className='absolute top-1 left-1 text-2xl cursor-pointer text-white bg-black bg-opacity-35' onClick={() => setFullShow(true)} />
                            <img src={`https://nodejs-backend-devblog.onrender.com/images/${book?.imageObject}`} onClick={() => setFullShow(!fullShow)} width={'300px'} className='rounded-md w-full' alt={book?.title} />
                        </div>

                        <div className='flex flex-col  gap-y-4 px-2 relative md:w-[60%]'>

                            <span className='right-0 bg-black bg-opacity-35 md:bg-white p-1 rounded-md m-2 text-white md:text-black flex flex-col items-center  -top-16 absolute md:py-0'>{book?.likecount >= 1 ? <AiFillHeart className={`text-xl text-red-600`} /> : <AiOutlineHeart className={`text-xl text-red-600`} />}<b>{book?.likecount}</b></span>
                            <h2 className={`text-2xl font-bold my-3 text-${theme == 'white' ? 'black' : 'white'}`}>{book?.title}</h2>
                            <p className={`text-${theme == 'white' ? 'black' : 'white'}`}>
                                {book?.publishYear}
                            </p>
                            <dialog id="box" className={`bg-${theme} p-2 rounded-md bg-opacity-40 backdrop-blur-sm`}>
                                <button onClick={() => { document.getElementById('box').close(), document.body.style.opacity = '1' }} className={`text-${theme == 'white' ? 'black' : 'white'} text-xl pb-1`}><AiFillCloseCircle /></button>
                                <pre className={`text-${theme == 'white' ? 'black' : 'white'}`}>
                                    {book?.author}
                                </pre>
                            </dialog>
                            <div className='flex justify-between flex-col md:flex-row gap-y-3 md:gap-x-0'>
                            <button className={`text-${theme == 'white' ? 'black' : 'white'} text-xl font-bold border md:w-[50%] hover:opacity-55 rounded-md`} onClick={() => { document.getElementById('box').showModal(), document.body.style.opacity = '0.4' }}>Show code</button>
                           <a  className={`text-${theme == 'white' ? 'black' : 'white'} text-center text-xl font-bold border md:w-[40%] hover:opacity-55 rounded-md`} href={`http://localhost:5555/images/${book?.imageObject}`} target='_blank' download={`${book?.imageObject}`}>Rasmni yuklash</a>
                            </div>
                            
                            <div className='flex items-start flex-col md:flex-row md:items-center'>
                                <div className="my-1 hover:bg-slate-400 p-2 rounded-md flex items-center">
                                    <span className='text-xl mr-4 text-amber-500 flex items-center'><AiFillClockCircle /> update:</span>
                                    <span className={`text-${theme == 'white' ? 'black' : 'white'}`}>{new Date(book?.createdAt).toString().slice(7, 21)}</span>
                                </div>
                                <div className="my-1 hover:bg-slate-400 p-2 rounded-md flex items-center">
                                    <span className='text-xl mr-4 text-amber-500 flex items-center'><AiFillClockCircle />create:</span>
                                    <span className={`text-${theme == 'white' ? 'black' : 'white'}`}>{new Date(book?.updatedAt).toString().slice(7, 21)}</span>
                                </div>
                                <div className='my-1 hover:bg-slate-400 p-2 rounded-md flex items-center'>
                                    <span className='text-xl mr-4 text-amber-500 flex items-center'><BiUserCircle />author: </span>
                                    <span className={`text-${theme == 'white' ? 'black' : 'white'}`}>{book?.email}</span>
                                </div>
                            </div>

                        </div>
                    </article>

                )
            }
            {(fullShow && book) && <FullImage item={book} Close={() => setFullShow(false)} />}
        </div>
    )
}

export default ShowBook