import React, { useContext, useEffect, useState} from 'react'
import { AiOutlineEdit, AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { BsInfoCircle} from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import Button from './Button';
import DeleteBook from '../pages/DeleteBook';
import { DataContext } from '../context';
import Spinner from './Spinner';

const Card = ({ item, setBool, bool, setShow, show }) => {

  const [optionsDrop, setDrop] = useState(true);
  const [imgBuff, setImgBuff] = useState(null);
  const [like, setLike] = useState(false);
  const [likeC, setLikeC] = useState(Number(item.likecount))
  const { handleLike, getSingleImage, StatusLikeTrue, StatusLikeFalse, userdata, toBase64 } = useContext(DataContext)
  const navigate = useNavigate()


  useEffect(() => {

    setLike(Boolean(userdata?.savedLike?.some((id) => id == item._id)))

    getSingleImage(item.imageObject, setImgBuff);
  }, [])





  const handleChange = () => {
    if (userdata) {
      if (like) {
        console.log('a');
        const rescont = likeC - 1
        setLikeC(likeC => likeC - 1);
        setLike(like => !like)
        handleLike(rescont, item)
        StatusLikeFalse(item._id)

      } else {
        console.log('b');
        const rescont = likeC + 1
        setLikeC(likeC => likeC + 1);
        setLike(!like)
        handleLike(rescont, item)
        StatusLikeTrue(item._id)
      }
    } else {
      navigate('/user/signin')
    }
  }


  document.addEventListener('click', (event) => {
    if (event.target.innerText != '...') {
      setDrop(true)
    }
    if (event.target.id != item._id) {
      setDrop(true)
    }
  })



  return (
    <div className="border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
      <div className='w-full'>
        {
          toBase64(imgBuff?.data) ? <img
            src={`data:image/png;base64,${toBase64(imgBuff?.data)}`}
            className="w-full mb-3 h-[250px]"
            alt={item?.title}
          /> : <Spinner />
        }
      </div>
      <div className="p-4 pt-2">

        <div className="mb-8">
          <p className="text-sm text-gray-600 flex items-center">
            <svg
              className="fill-current text-gray-500 w-3 h-3 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"></path>
            </svg>
            <div className='flex justify-between w-full'>
              <span> Members only</span><span className='relative'><button onClick={handleChange}>{like ? <AiFillHeart className='text-xl text-amber-700 bold' /> : <AiOutlineHeart className='text-xl text-amber-700 bold' />}</button>
                <small className='absolute right-[5px] top-4'>{likeC}</small>
              </span>
            </div>
          </p>

          <a
            href="#"
            className="text-gray-900 font-bold text-lg mb-2 hover:text-indigo-600 inline-block"
          >
            {item.title}
          </a>
          <p className="text-gray-700 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="flex items-center justify-between relative">
          <span className={`flex justify-center items-center px-4 py-2 text-xl bg-amber-300 mr-2 bold cursor-pointer`} style={{ borderRadius: '50%' }}>{String(item.email).toString().toUpperCase().slice(0, 1)}</span>
          <div className="text-sm">
            <a
              href="#"
              className="text-gray-900 font-semibold leading-none hover:text-indigo-600"
            >
              {item.email}
            </a>
            <p className="text-gray-600">{new Date(item.createdAt).toString().slice(0, 21)}</p>
          </div>
          <button id={`${item._id}`} className='text-black bold text-4xl cursor-pointe' onClick={() => setDrop(!optionsDrop)}>...</button>
          <div className={`flex flex-col backdrop-blur-md  items-center gap-y-2 border bg-black bg-opacity-55 z-50 border-yellow-300 p-2 rounded-md absolute right-0 bottom-6 ${optionsDrop ? 'hidden' : ''}`}>
            <Link to={`/books/details/${item._id}`}><BsInfoCircle className='text-2xl text-blue-500' /></Link>
            {
              userdata?.email == item.email && <Link to={`/books/edit/${item._id}`}><AiOutlineEdit className='text-2xl text-yellow-500' /></Link>
            }
            {
              userdata?.email == item.email && <button onClick={() => setShow({ ...show, bool: true, book: item })}><MdOutlineDelete className='text-2xl text-red-500' /></button>
            }
            {userdata?.email == item.email ? <Button book={item} /> : <p className={`rounded-md text-xs p-1 text-white ${item.status ? 'bg-green-500' : 'bg-red-500'}`}>{item.status ? 'Active' : 'Noactive'}</p>}
          </div>
        </div>
      </div>
      {
        show.bool ? <DeleteBook book={item} bool={bool} onClose={() => setShow({ ...show, bool: false })} setBool={setBool} /> : null
      }
    </div>


  )
}


export default Card