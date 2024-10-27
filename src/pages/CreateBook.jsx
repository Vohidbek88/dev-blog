import React, { useContext, useState } from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { DataContext } from '../context';
import axios from '../services/api';
import { Helmet } from 'react-helmet';


const CreateBook = () => {
    const { userdata, handleSave, loading, theme } = useContext(DataContext);
    const [book, setBook] = useState({ title: '', author: '', publishYear: '', email: userdata?.email, imageObject: '' });
    const [upload, setUpload] = useState(false);
    const [progres, setProgres] = useState(null);
    const [errorBlog, setErrorCreateBlog] = useState()
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
                onUploadProgress: (event) => {
                    const total = event.total;
                    const current = event.loaded;
                    const complted = Math.round((current * 100) / total);
                    setProgres(complted);
                }
            });
            setBook({ ...book, imageObject: res.data.image })
            setUpload(false)
            console.log(res.data._id);
        } catch (error) {
            setUpload(false)
            console.log(error);
        }

    }

    return (
        <div className={`p-4 bg-${theme} h-max`}>
            <Helmet>
                <title>Blog Yaratish</title>
            </Helmet>
            <BackButton />
            <h1 className={`text-2xl my-4 text-center text-${theme == 'white' ? 'black' : 'white'}`}>Create blog</h1>
            {
                errorBlog && <p className='w-[200px] rounded-md mx-auto text-xs mt-4  font-bold text-red-500 border border-red-500 text-center'> {errorBlog}</p>
            }
            {
                loading ? <Spinner /> : ''
            }
            <div className="flex flex-col border-sky-600 lg:w-[50%] md:w-[90%] rounded-xl w-auto p-4 mx-auto">
                <div className="my-4">
                    <label htmlFor="title" className="text-xl mr-4 text-gray-500">Title <small>(min:15,max:40) {book.title.trim()!='' && String(book.title).length}</small></label>
                    <input  minLength={'15'} maxLength={'40'} type="text" value={book.title} id='title' required onChange={e => setBook({ ...book, title: e.target.value })} className='border-slate-600 border px-1 py-2 w-full rounded-md' />
                    <label htmlFor="author" className="text-xl mr-4 text-gray-500">Code <small>(min:40,max:2400) {book.author.trim()!='' && String(book.author).length}</small></label>
                    <textarea  rows={'8'} minLength={'40'} maxLength={'2400'}  style={{resize:'none'}} required value={book.author} id='author' onChange={e => setBook({ ...book, author: e.target.value })} className='border-slate-600 border px-1 py-2 w-full rounded-md' ></textarea>
                    <label htmlFor="pub" className="text-xl mr-4 text-gray-500">Description <small>(min:110,max:2400) {book.publishYear.trim()!='' && String(book.publishYear).length}</small></label>
                    <textarea  minLength={'110'} maxLength={'2400'} rows={'2'} required style={{resize:'none'}} value={book.publishYear} id='pub' onChange={e => setBook({ ...book, publishYear: e.target.value })} className='border-slate-600 border px-1 py-2 w-full rounded-md' ></textarea>
                    <label htmlFor="fayl" className="text-xl mr-4 text-gray-500">Rasm yuklang</label>
                    <input type="file" disabled={upload} accept='image/*' id='fayl' onChange={e => handleFileChange(e.target.files[0])} className={`border-slate-600 border py-2 w-full rounded-md  text-${theme == 'white' ? 'black' : 'white'}`} />
                    {
                        upload && (
                            <div className='text-xl text-yellow-300 mt-2  md:gap-x-8  md:items-center md:flex sm:gap-y-3'>
                                <p>{'Uploading'}<span className='absolute animate-bounce'>...</span></p>
                                <div className="progress-container">
                                    <progress value={progres} max='100'></progress>
                                </div>
                                <span> {progres} %</span>
                            </div>
                        )
                    }
                    <button className='flex mt-8 w-full justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' disabled={loading || upload } onClick={() => handleSave(book, setErrorCreateBlog)}>{
                        loading ? 'Creating...' : 'Create'
                    }</button>
                </div>

            </div>
        </div>
    )
}

export default CreateBook