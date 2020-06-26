import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const List = () => {
    const [count, setCount] = useState(1)
    const [data,setData] = useState([])
    const [page,setPage] = useState(1)
    const handleClick = () => {
        setCount(count + 1)
    }
    useEffect(() => {
        const getMsg = () => {
            //'https://api.apiopen.top/getJoke?page=1&count=2&type=video'
            return 'https://api.apiopen.top/getJoke'
        }
        const fetchData = async () => {
           const data = await axios.get(getMsg(),{
               params:{
                    page,
                    count,
                    type: 'video'
               }
           }).then( res => {
               console.log(res)
               setData(res.data.result)
           })
        }
        fetchData()
    }, [count]);
    console.log(data)
    return (
        <div>
            <p>{count}</p>
            <button onClick={handleClick}>{count}</button>
            <ul>
                {
                    data.map( item => {
                        return (
                        <li key={parseInt(item.sid)}>{item.text}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export default List