import React from 'react'
import { Home } from '../components/Products'
import { useParams } from 'react-router-dom'
import {useGetShopByIdQuery} from "../store/shopsSlice"

const Products = () => {
  const {shopId} = useParams()
  const {data} = useGetShopByIdQuery(shopId)

  return (
    <div style={{marginTop:'20vh'}}>
    <h4 style={{marginTop:'20px'}}>{data?.name}</h4>
    <p>{data?.description}</p>
    <Home shopId={shopId} />
</div>
  )
}

export default Products