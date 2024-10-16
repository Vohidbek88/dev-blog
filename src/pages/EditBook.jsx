import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { DataContext } from '../context';
import axios from '../services/api';



const EditBook = () => {
    const {loading,getBook,handleEdit,userdata}=useContext(DataContext)
    const [book, setBook] = useState({ title: '', author: '', publishYear: '',email: userdata?.email, imageObject: '' });
    const [upload, setUpload] = useState(false);
    const { id } = useParams();

    const handleFileChange = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        setUpload(true)
        try {
            const res = await axios.post(`/image/upload`, formData, {
                headers: {
                    "Content-Type": 'application/form-data'
                },
                withCredentials: true,
            });
            setBook({ ...book, imageObject: res.data.image })
            setUpload(false)
            console.log(res.data._id);
        } catch (error) {
            setUpload(false)
            console.log(error);
        }

    }


    useEffect(() => {
       
        getBook(id,setBook)

    }, [])
    
    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-2xl my-4 text-center'>Edit blog</h1>
            {
                loading ? <Spinner /> : ''
            }
            <div className="flex flex-col border-sky-600 rounded-xl lg:w-[50%] md:w-[90%] p-4 mx-auto">
                <div className="my-4">
                    <label htmlFor="title" className="text-xl mr-4 text-gray-500">Title</label>
                    <input type="text" value={book.title} id='title' onChange={e => setBook({ ...book, title: e.target.value })} className='border-slate-600 px-1 border py-2 w-full rounded-md' />
                    <label htmlFor="author" className="text-xl mr-4 text-gray-500">Author</label>
                    <input type="text" value={book.author} id='author' onChange={e => setBook({ ...book, author: e.target.value })} className='border-slate-600 px-1 border py-2 w-full rounded-md' />
                    <label htmlFor="pub" className="text-xl mr-4 text-gray-500">PublishYear</label>
                    <input type="number" value={book.publishYear} id='pub' onChange={e => setBook({ ...book, publishYear: e.target.value })} className='border-slate-600 px-1 border py-2 w-full rounded-md' />
                    <label htmlFor="fayl" className="text-xl mr-4 text-gray-500">Rasm yuklang</label>
                    <input type="file" accept='image/*' id='fayl' onChange={e => handleFileChange(e.target.files[0])} className='border-slate-600 border py-2 w-full rounded-md' />
                    <button className='flex w-full justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-8' disabled={loading} onClick={()=>handleEdit(id,book)}>{
                        loading ? 'Editing...' : 'Edit'
                    }</button>
                </div>

            </div>
        </div>
    )
}

export default EditBook