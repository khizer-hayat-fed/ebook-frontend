import React from 'react'
import { MagnifyingGlass } from 'react-loader-spinner'

const CircularLoader = () => {
  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'45vh'}}>
       <MagnifyingGlass
  visible={true}
  height="80"
  width="80"
  ariaLabel="magnifying-glass-loading"
  wrapperStyle={{}}
  wrapperClass="magnifying-glass-wrapper"
  glassColor="#c0efff"
  color="#e15b64"
  />
    </div>
  )
}

export default CircularLoader