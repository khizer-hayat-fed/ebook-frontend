import React from 'react'

export const ViewCategory = ({data}) => {
  return (
    <div className="row">
    <div className="col-md-12">
      <div className="mb-3">
        <h6>Name:</h6>
        <p>{data?.Name}</p>
      </div>
    </div>
  </div>
  )
}