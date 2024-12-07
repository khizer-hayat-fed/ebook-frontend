import React from "react";
import { useNavigate } from "react-router-dom";

export const Card = ({ name, description, id, location }) => {
  const navigate = useNavigate()

  const handleNavigation = (shopId) => {
    navigate(`/items/${shopId}`)
  }
  return (
    <div className="card mx-auto my-4" style={{ width: "18rem" }}>
      <iframe
        title={name}
        width="100%"
        height="200"
        frameBorder="0"
        style={{ border: 0 }}
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDzSwDLwxMVDp3-YOuQ_iVpsWhvGDYTP0I&q=${location?.lat ? location.lat : 'latitude'},${location?.lng ? location.lng : 'longitude'}`}
        allowFullScreen
        aria-hidden="false"
        tabIndex="0"
      ></iframe>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <p
          onClick={() => {
            handleNavigation(id);
          }}
          className="btn btn-primary"
        >
          See Items
        </p>
      </div>
    </div>
  );
};
