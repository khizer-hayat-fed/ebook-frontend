import React from "react";
import { MapMarker } from "../../Kitchen/MapMarker";

export const AddShopForm = ({ formData, setFormData, managerData, setManagerData, isEdit }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleManagerChange = (e) => {
    const { name, value } = e.target;
    setManagerData({
      ...managerData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6 text-start">
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-md-6 text-start">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 text-start">
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">
              Address:
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-md-6 text-start">
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">
              Contact:
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputAddress"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      {!isEdit && (
      <div className="row">
        <div className="col-md-6 text-start">
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputAddress"
              name="password"
              value={managerData.password}
              onChange={handleManagerChange}
            />
          </div>
        </div>
        <div className="col-md-6 text-start">
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">
              Confirm Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputAddress"
              name="confirmPassword"
              value={managerData.confirmPassword}
              onChange={handleManagerChange}
            />
          </div>
        </div>
      </div>
      )}
      <div className="row">
        <div className="col-md-12 text-start">
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlDescription"
              className="form-label"
            >
              Description:
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlDescription"
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-start">
          <div className="mb-3">
            <p
              className="form-label"
            >
              Location:
            </p>
            <MapMarker form={formData} setForm={setFormData} />
          </div>
        </div>
      </div>
    </>
  );
};
