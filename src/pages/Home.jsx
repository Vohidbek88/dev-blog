
import React, { useEffect, useState, useContext } from 'react'
import Spinner from '../components/Spinner'



import Search from '../components/Search';
import { DataContext } from '../context';
import Card from '../components/Card';

const Home = () => {
    const { getAllBooks, isPending, usergetload } = useContext(DataContext)
    const [books, setBooks] = useState([]);
    const [show, setShow] = useState({ bool: false, book: {} })
    const [bool, setBool] = useState(false)
    const [filterarr, setFilter] = useState([])



    useEffect(() => {

            getAllBooks(setBooks, setFilter)
     
    }, [bool])



    return (
        <div className='p-4'>
            <div className='flex justify-center items-center'>
                <Search books={books} setFilter={setFilter} />
            </div>

            {
                isPending ? <Spinner /> : (
                    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
                        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
                            {
                                (filterarr.length > 0 && !usergetload) && filterarr?.map(item => <Card key={item._id} item={item} bool={bool} setBool={setBool} setShow={setShow} show={show} />)
                            }
                        </div>
                    </div>

                )
            }



        </div>
    )
}

export default Home