import React from 'react'
import {is,Map} from 'immutable'

const immutable = () => {
  const a = Map({a:1,b:2,c:3})
  const b = Map({a:1,b:2,c:3})
  console.log(a===b)
  console.log(is(a,b))
  console.log(Object.is(a,b))
  console.log('1')
  return (
    <div>123</div>
  )
}
export default immutable
