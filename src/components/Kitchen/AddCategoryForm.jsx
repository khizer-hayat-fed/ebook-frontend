import React from 'react';

export const AddCategoryForm = ({categoryName, setCategoryName}) => {
  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">Category Name:</label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            value={categoryName}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};
