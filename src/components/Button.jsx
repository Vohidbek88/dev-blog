import axios from "axios"
import { useState } from "react";
const Button = ({book}) => {
  const [bool,setBool]=useState(book.status);
  
    const handleChange=async()=>{
      setBool(!bool)
        try {
          const status=!bool
          console.log(status);
            await axios.put(`http://localhost:5555/books/status/${book._id}`,{status});
            
            
        } catch (error) {
            console.log(error.message);
        }
    }
  return (
    <button className={`rounded-md text-xs text-white ${bool ? 'bg-green-500':'bg-red-500'} px-2 text-center`} onClick={handleChange}>{bool ? 'Active':"Noactive"}</button>
  )
}

export default Button