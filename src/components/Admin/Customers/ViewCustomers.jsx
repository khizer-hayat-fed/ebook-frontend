import React from 'react'

export const ViewCustomers = ({data}) => {
  return (
    <>
    <div className="row">
    <div className="col-md-6">
      <div className="mb-3">
        <h6>Name:</h6>
        <p>{data?.name}</p>
      </div>
    </div>
    <div className="col-md-6">
      <div className="mb-3">
        <h6>Email:</h6>
        <p>{data?.userId?.email}</p>
      </div>
    </div>
  </div>
      <div className="row">
      <div className="col-md-6">
        <div className="mb-3">
          <h6>Address:</h6>
          <p>{data?.address}</p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="mb-3">
          <h6>Contact:</h6>
          <p>{data?.number}</p>
        </div>
      </div>
    </div>
    </>
  )
}