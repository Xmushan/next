import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';



const sort = () => {
    const [data, setData] = useState([])
    const [order, setOrder] = React.useState('asc')
    const [orderBy, setOrderBy] = React.useState('')

    useEffect(() => {
        //'https://api.apiopen.top/getJoke?page=1&count=2&type=video'
        const getMsg = () => {
            return 'https://api.apiopen.top/getJoke?page=1&count=5&type=video'
        }
        const fetchData = async () => {
            await axios.get(getMsg()).then(res => {
                setData(res.data.result)
            })
        }
        fetchData()
    }, [])

    const handleSort = property => event => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder( isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }
    const sortArr = (arr,comparator) => {
        const newArr = arr.map( (item,index) => [item,index] )
        newArr.sort( (a,b) => {
            const flag = comparator(a[0],b[0])
            if (flag !=0)
            return flag
        })
        return newArr.map( item => item[0])
    }
    
    const getComparator = (order,OrderBy) => {
        return order !== 'asc' ?
        (a,b) => sortFun(a,b,orderBy) : (a,b) => -sortFun(a,b,orderBy) 
    }
    const sortFun = (a,b,OrderBy) =>{
        return a[orderBy] - b[orderBy]
    }



    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>
                                <TableSortLabel>
                                    name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align='center'>
                                <TableSortLabel>
                                    text
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align='center'>
                                <TableSortLabel>
                                    sid
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align='center'>
                                <TableSortLabel 
                                direction={orderBy === 'down' ? order : 'asc'}
                                onClick={handleSort('down')}>
                                    down
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align='center'>
                                <TableSortLabel 
                                direction={orderBy === 'comment' ? order : 'asc'}
                                onClick={handleSort('comment')}>
                                    comment
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            sortArr(data,getComparator(order,orderBy)).map(item => {
                                return (
                                    <TableRow key={parseInt(item.sid)}>
                                        <TableCell align='center'>{item.name}</TableCell>
                                        <TableCell align='center'>{item.text}</TableCell>
                                        <TableCell align='center'>{item.sid}</TableCell>
                                        <TableCell align='center'>{item.down}</TableCell>
                                        <TableCell align='center'>{item.comment}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default sort