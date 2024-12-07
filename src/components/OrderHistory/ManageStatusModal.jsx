import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { useCreateReviewMutation } from "../../store/reviewsSlice";

export const ManageStatusModal = ({ show, handleClose, id, shopId, refetchAgain }) => {
  const userId = useSelector((state) => state?.user?.userInfo?._id);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const [createReview, { isSuccess }] = useCreateReviewMutation();

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const resetValue = () => {
    setComment("");
    setRating(0);
  };

  const handleSave = async () => {
    await createReview({
      remark: comment,
      rating,
      orderId: id,
      shopId,
      userId,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      resetValue();
      refetchAgain()
      handleClose();
    }
  }, [isSuccess]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Give Remarks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-12">
            <div className="mb-3">
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
              <label
                htmlFor="exampleFormControlDescription"
                className="form-label"
              >
                Comment:
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlDescription"
                rows="3"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          SAVE
        </button>
      </Modal.Footer>
    </Modal>
  );
};
