import React from "react";
import AddSvg from "../../Assets/Svgs/AddSvg.js";
import { ModalTemplate } from "../Kitchen";

export const Header = ({ title, showButton, show, handleClose, handleShow, refetch }) => {
  return (
    <div className="row">
      <div className={`${showButton ? 'col-md-6' : 'col-md-12'} text-start`}>
        <p className="text-uppercase fw-bold">{title}</p>
      </div>
      {showButton && (
        <div className="col-md-6 text-end">
          <button type="button" className="btn btn-primary" onClick={handleShow}>
            <AddSvg /> Add
          </button>
        </div>
      )}

      <ModalTemplate 
      show={show}
      handleClose={handleClose}
      title={title}
      refetch={refetch}
      />
    </div>
  );
};
