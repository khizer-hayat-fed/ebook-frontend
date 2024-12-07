import React, { useRef } from "react";
import { useGetAllCategoriesOptionQuery } from "../../store/categorysSlice";

export const AddItemForm = ({ formData, setFormData,image, setImage, shopId }) => {
  const fileInputRef = useRef(null);
  const { data } = useGetAllCategoriesOptionQuery(shopId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleUploadButtonClick = () => {
    // Trigger the hidden file input
    fileInputRef.current.click();
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="mb-3">
          <label htmlFor="itemName" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="itemName"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="col-md-12">
        <div className="mb-3">
          <label htmlFor="itemCategory" className="form-label">
            Category:
          </label>
          <select
            className="form-select"
            id="itemCategory"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select category</option>
            {data &&
              data.map((item, index) => (
                <option key={index} value={item?.name}>
                  {item.name}
                </option>
              ))}
            {/* Add more options as needed */}
          </select>
        </div>
      </div>
      <div className="col-md-12">
        <div className="mb-3">
          <label htmlFor="itemPrice" className="form-label">
            Price:
          </label>
          <input
            type="number"
            className="form-control"
            id="itemPrice"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="col-md-12">
        <div className="mb-3">
          <label htmlFor="deliveryTime" className="form-label">
            Delivery Time (in days):
          </label>
          <input
            type="number"
            className="form-control"
            id="deliveryTime"
            name="deliveryTime"
            placeholder="i.e. 35"
            value={formData.deliveryTime}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="col-md-12">
        <div className="mb-3">
          <label htmlFor="itemDescription" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            id="itemDescription"
            rows="3"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>
      <div className="col-md-12">
        <div className="mb-3">
          <p>Image:</p>
          {image ? (
            <div style={{display:'flex', flexDirection:'column'}}>
            <img
              src={ typeof image !== 'string' ? URL.createObjectURL(image) : `http://localhost:5000/uploads/${image}`}
              alt="UploadedImage"
              width={180}
              height={180}
            />
            <button type="button" className='btn btn-secondary' style={{ marginBottom: '20px', marginTop:'10px', width:'fit-content' }} onClick={handleUploadButtonClick}>Edit Image</button>
            </div>       
          ) : (
            <img
              src={require("../../Assets/addImage.png")}
              alt="Add Item"
              onClick={handleUploadButtonClick}
              style={{ cursor: "pointer" }}
            />
          )}
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            ref={fileInputRef}
            id="imageInput"
            name="photo"
          />
        </div>
      </div>
    </div>
  );
};
