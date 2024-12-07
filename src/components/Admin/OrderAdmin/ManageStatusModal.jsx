import React from "react";
import Modal from "react-bootstrap/Modal";
import {useUpdateOrderStatusMutation} from "../../../store/ordersSlice"

export const ManageStatusModal = ({
  show,
  handleClose,
  updatedStatus,
  setUpdatedStatus,
  id
}) => {
    const [updateOrderStatus] = useUpdateOrderStatusMutation()

    
    const onSave = async()=>{
        await updateOrderStatus({id,  status: updatedStatus})
        handleClose()
    }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Order Status</Modal.Title>
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
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
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
