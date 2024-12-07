import React from "react";

export const AddCustomerForm = ({
  formData,
  setFormData,
  managerData,
  setManagerData,
  isEdit,
}) => {
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
        <div className={`${ !isEdit ? 'col-md-6' : 'col-md-12'} text-start`}>
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
        {!isEdit && (
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
        )}
      </div>
      <div className="row">
        <div className="col-md-6 text-start">
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">
              Gender:
            </label>
            <select
              className="form-control"
              id="exampleInputAddress"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
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
            <label htmlFor="exampleInputAddress" className="form-label">
              Address:
            </label>
            <textarea
              rows="3"
              className="form-control"
              id="exampleInputAddress"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};
