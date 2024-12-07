import React from "react";

export const Card = ({ title, data }) => {

  return (
    <div className="card p-4">
      <div className="card-body">
        <p className="text-nowrap">{title}</p>
        <p>
          <b>RS. {data ? data[title] : 0}</b>
        </p>
      </div>
    </div>
  );
};
