import React from "react";
import Modal from "react-bootstrap/Modal";

export const ConfirmationModal = ({ show, handleClose, title, description, handleDelete }) => {
  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <b>{description}</b>
    </Modal.Body>
    <Modal.Footer>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleClose}
      >
        No
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={handleDelete}
      >
        Yes
      </button>
    </Modal.Footer>
  </Modal>
  )
}