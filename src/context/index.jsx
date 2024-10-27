
import { createContext, useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../services/api';


export const DataContext = createContext();


export const DataProvider = ({ children }) => {
    const [userdata, setUserData] = useState(null)
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : 'white')
    const [loading, setLoading] = useState(false);
    const [isPending, startTransition] = useTransition()
    const [usergetload, setUserGetLoad] = useState(false)
    const [allBooks, setAllBooks] = useState([]);
    const navigate = useNavigate();


    const getUser = async () => {
        setUserGetLoad(true)
        try {
            const res = await axios.get('/user', { withCredentials: true });
            setUserData(res.data.user);
            setUserGetLoad(false)


        } catch (error) {
            setUserGetLoad(false)
            console.log(error);
        }
    }



    const getAllBooks = async (setBooks, setFilter) => {
        startTransition(async () => {

            try {
                const res = await axios.get('/books', {
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                });
                setBooks(res.data.data);
                setFilter(res.data.data)

                setAllBooks(res.data.data)
            } catch (error) {
                console.log(error);
            }

        })
    }


    const handleSave = async (book, setErrorCreateBlog) => {
        setLoading(true)
        if (String(book.title).length < 15 || String(book.publishYear).length < 110 || String(book.author) < 40) {
            setErrorCreateBlog("Maydonlarda yetarli harflar yo'q!!!")
            setTimeout(() => {
                setErrorCreateBlog(null)
            }, 6000);
            setLoading(false);
        } else {
            try {
                await axios.post(`/books`, book);
                setLoading(false);
                navigate('/');

            } catch (error) {
                console.log(error);
                setErrorCreateBlog(error.response.data.message);
                setTimeout(() => {
                    setErrorCreateBlog(null)
                }, 6000);
                setLoading(false);
            }
        }

    }


    const onDeleteBook = async (book) => {

        try {
            await axios.delete(`/books/${book._id}`);
            window.location.reload()
        } catch (error) {
            console.log(error);
        }

    }


    const getBook = async (id, setBook) => {
        setLoading(true)
        try {
            const res = await axios.get(`/books/${id}`);
            setBook({ title: res.data.title, author: res.data.author, publishYear: res.data.publishYear, email: res.data.email, imageObject: res.data.imageObject })

            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handleEdit = async (id, book, setErrorCreateBlog) => {
        setLoading(true)
        if (String(book.title).length < 15 || String(book.publishYear).length < 110 || String(book.author) < 40) {
            setErrorCreateBlog("Maydonlarda yetarli harflar yo'q!!!")
            setTimeout(() => {
                setErrorCreateBlog(null)
            }, 6000);
            setLoading(false);
        } else {
            try {
                await axios.put(`/books/${id}`, book);
                setLoading(false);
                navigate('/')

            } catch (error) {
                console.log(error);
                setErrorCreateBlog(error.response.data.message);
                setTimeout(() => {
                    setErrorCreateBlog(null)
                }, 6000);
                setLoading(false);
            }
        }

    }



    const logout = async () => {

        try {
            await axios.delete('/user/logout', { withCredentials: true });
            setUserData(null)
            navigate('/')
            window.location.reload()
        } catch (error) {
            console.log(error);
        }

    }

    const getBookSingle = async (id, setBook) => {

        try {
            const res = await axios.get(`/books/${id}`);
            setBook(res.data);
        } catch (error) {
            console.log(error);

        }
    }


    const handleSignin = (user, setError) => {
        startTransition(async () => {
            try {
                await axios.post(`/user/signin`, user, { withCredentials: true });
                navigate('/')
                window.location.reload()
            } catch (error) {
                setError(error.response.data.message)

                setTimeout(() => {
                    setError(null)
                }, 6000);
            }
        })
    }



    const handleSignup = async (setError, user) => {
        setLoading(true)
        try {
            await axios.post(`/user/signup`, user);
            setLoading(false);
            navigate('/user/signin')
        } catch (error) {
            console.log(error);
            setError(error)
            setLoading(false);
            setTimeout(() => {
                setError(null)
            }, 6000);
        }
    }


    const handleLike = async (likeC, item) => {

        try {
            const dataNew = {
                likecount: likeC
            }
            console.log(dataNew);
            const res = await axios.put(`/books/savelike/${item._id}`, dataNew);
            console.log(res);
        } catch (error) {
            console.log(error);
        }

    }


    const StatusLikeTrue = async (idCard) => {
        try {
            await axios.post(`/books/statuslike/${userdata._id}`, { idCard });
            console.log('true');
        } catch (error) {
            console.log(error);
        }
    }
    const StatusLikeFalse = async (idCard) => {
        try {
            await axios.put(`/books/statuslike/${userdata._id}`, { idCard });
            console.log('false');
        } catch (error) {
            console.log(error);
        }
    }



    return <DataContext.Provider value={{ allBooks, userdata, usergetload, StatusLikeTrue, StatusLikeFalse, setUserData, handleSave, loading, onDeleteBook, getBook, handleEdit, getAllBooks, isPending, logout, getBookSingle, handleSignin, handleSignup, setTheme, theme, getUser, handleLike }}>
        {children}
    </DataContext.Provider>
}






