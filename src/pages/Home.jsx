
import React, { useEffect, useState, useContext } from 'react'
import Spinner from '../components/Spinner'
import { Helmet } from 'react-helmet'


import Search from '../components/Search';
import { DataContext } from '../context';
import Card from '../components/Card';

const Home = () => {
    const { isPending,userdata,usergetload, theme, getAllBooks ,getUser} = useContext(DataContext)
    const [books, setBooks] = useState([]);

    const [filterarr, setFilter] = useState([])



    useEffect(() => {
        getUser()
        getAllBooks(setBooks, setFilter)

       
    }, [])



    return (
        <div className={`p-4 bg-${theme} text-${theme}`}>
            <Helmet>
                <title>DevBlog</title>
            </Helmet>
            <div className='flex justify-center items-center'>
                <Search books={books} theme={theme} setFilter={setFilter} />
            </div>

            {
                isPending ? <Spinner /> : (
                    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
                        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
                            {
                                (filterarr.length > 0 && !usergetload) && filterarr?.map(item => <Card key={item._id} item={item} userdata={userdata}/>)
                            }
                        </div>
                    </div>

                )
            }



        </div>
    )
}

export default Home