import React from 'react'
import { Card, LineChart } from './index'
import {useGetSalesReportQuery, useGetYearlyReportQuery} from "../../store/ordersSlice"
import { useSelector } from 'react-redux'

export const Home = () => {
  const { shopId } = useSelector((state) => state.user?.userInfo);
    const {data} = useGetSalesReportQuery(shopId)
    const {data: YearlyData} = useGetYearlyReportQuery(shopId)
    const CardTitle = ['Daily Sale', 'Weekly Sale', 'Monthly Sale']

  return (
    <div className='row'>
        <div className='col-md-12 mt-5'>
            <div className='row d-flex justify-content-evenly'>
            {CardTitle.map((item,index)=>(
            <div key={index} className='col-md-3'>
                <Card title={item} data={data} />
            </div>
            ))}
            </div>

<div className="row d-flex justify-content-center border mt-5" style={{height:'75%'}}>
            <LineChart YearlyData={YearlyData} />
</div>

        </div>
    </div>
  )
}