import React from "react";

export const ReviewCards = ({data}) => {
  return (
    <div class="card" style={{ width: "100%" }}>
      <div class="card-body">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h5>{data?.userId?.email}</h5>
          <p>{data?.rating} Star</p>
        </div>
        <p class="card-text">
          {data?.remark}
        </p>
      </div>
    </div>
  );
};