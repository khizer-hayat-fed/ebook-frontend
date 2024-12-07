import React from 'react'

export const ViewShop = ({data, rating}) => {
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
        <p>{data?.email}</p>
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
          <p>{data?.contact}</p>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <div className="mb-3">
          <h6>Description:</h6>
          <p>{data?.description}</p>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <div className="mb-3">
          <h6>Location:</h6>
          <div className="card mx-auto my-4" style={{ width: "18rem" }}>
          <iframe
        title={data?.name}
        width="100%"
        height="200"
        frameBorder="0"
        style={{ border: 0 }}
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDzSwDLwxMVDp3-YOuQ_iVpsWhvGDYTP0I&q=${data?.location?.lat ? data?.location.lat : 'latitude'},${data?.location?.lng ? data?.location.lng : 'longitude'}`}
        allowFullScreen
        aria-hidden="false"
        tabIndex="0"
      ></iframe>
          </div>
        </div>
      </div>
    </div>
    {rating && (
    <div className="row">
      <div className="col-md-12">
        <div className="mb-3">
          <h6>Average Rating:</h6>
          <p>{rating} out of 5</p>
        </div>
      </div>
    </div>
    )}
    </>
  )
}