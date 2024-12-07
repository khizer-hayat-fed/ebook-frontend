import React, { useRef, useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { useCreateProductMutation, useUpdateProductMutation } from '../store/productsSlice';
import { toast } from "react-toastify";

const ModalTemplate = ({ show, handleClose, title, data, refetchAgain }) => {
  const fileInputRef = useRef(null);
  const id = useSelector(state => state?.user?.userInfo?._id)
  const [image, setImage] = useState(null);
  const [form, setForm] = React.useState({
    name: '',
    description: '',
    price: '',
    deliveryTime: ''
  })

  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation();


  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSave = async () => {
    if(!data){
      await createProduct({ ...form, userId: id })
      .unwrap()
      .then((data) => {
        toast.success("Product created successfully");
        refetchAgain()
        handleClose();
      })
      .catch((error) => {
        toast.error("Failed to create product");
      });
    }else{
      await updateProduct({ ...form, userId: id, _id: data?._id })
      .unwrap()
      .then((data) => {
        toast.success("Product updated successfully");
        refetchAgain();
        handleClose();
      })
      .catch((error) => {
        toast.error("Failed to update product");
      });
    }
  }

  useEffect(()=>{
    if(data){
      setForm({
        name: data?.name || '',
        description: data?.description ||  '',
        price: data?.price || '',
        deliveryTime: data?.deliveryTime || ''
      })
    }
  },[data])

  return (
    <div>
      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="text-start">
            Name
          </h6>
          <div className="form" bis_skin_checked={1}>
            <input
              type="text"
              className="form-control"
              placeholder="Cheese Burger"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <h6 className="text-start">
            Price
          </h6>
          <div className="form" bis_skin_checked={1}>
            <input
              type="number"
              className="form-control"
              placeholder="260"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <h6 className="text-start">
            Delivery Time
          </h6>
          <div className="form" bis_skin_checked={1}>
            <input
              type="number"
              className="form-control"
              placeholder="30"
              value={form.deliveryTime}
              onChange={(e) => setForm({ ...form, deliveryTime: e.target.value })}
            />
          </div>

          <h6 className="text-start">
            Description
          </h6>
          <div className="form" bis_skin_checked={1}>
            <textarea
              className="form-control"
              placeholder="Description Here"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {/* <div className="form" bis_skin_checked={1}>
          <button type="button" className='btn btn-secondary'>Add Photo</button>
          <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        id="imageInput"
                        name="photo"
                    />
          </div> */}
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className='btn btn-secondary' onClick={handleClose}>
            Close
          </button>
          <button disable={isLoading || updateLoading} type="button" className='btn btn-primary' onClick={handleSave}>
           {isLoading || updateLoading ? 'Loading...' : "Save Changes" } 
          </button>
        </Modal.Footer>
      </Modal>
      {/* End Modal */}
    </div>
  )
}

export default ModalTemplate
