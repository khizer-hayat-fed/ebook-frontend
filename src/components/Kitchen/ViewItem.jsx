import React from 'react';

export const ViewItem = ({ data }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="mb-3">
          <h6>Name:</h6>
          <p>{data?.name}</p>
        </div>
        <div className="mb-3">
          <h6>Category:</h6>
          <p>{data?.category}</p>
        </div>
        <div className="mb-3">
          <h6>Price:</h6>
          <p>{data?.price}</p>
        </div>
        <div className="mb-3">
          <h6>Delivery Time (in minutes):</h6>
          <p>{data?.deliveryTime}</p>
        </div>
        <div className="mb-3">
          <h6>Description:</h6>
          <p>{data?.description}</p>
        </div>
        {data?.photo && (
        <div className="mb-3">
          <h6>Image:</h6>
          <img
                            src={
                                `http://localhost:5000/uploads/${data?.photo}`
                            }
                            alt="UploadedImage"
                            width={180} height={180}
                        />
        </div>
        )}
      </div>
    </div>
  );
};
