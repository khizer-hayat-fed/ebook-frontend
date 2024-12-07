import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useUpdateShopStatusAdminMutation } from "../../../store/adminsSlice";

export const ManageStatusModal = ({ show, handleClose, statusValue, shopId, refetch }) => {
  const [updatedStatus, setUpdatedStatus] = useState(statusValue || "");
  const [updateShopStatusAdmin] = useUpdateShopStatusAdminMutation()

  const onSave = async()=>{
    await updateShopStatusAdmin({shopId, status: updatedStatus})
    refetch()
    handleClose()
  }

  useEffect(() => {
    if (statusValue) {
      setUpdatedStatus(statusValue);
    }
  }, [statusValue]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Shop Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-12">
            <div className="mb-3">
              <select
                className="form-select"
                id="itemCategory"
                name="status"
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Approve">{statusValue === 'Blocked' ? 'Unblocked' : 'Approve'}</option>
                <option value="Disapprove">Disapprove</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-primary" onClick={()=> onSave()}>
          SAVE
        </button>
      </Modal.Footer>
    </Modal>
  );
};
