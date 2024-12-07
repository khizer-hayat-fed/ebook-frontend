import React, { useState, useEffect } from "react";
import { Pagination, Header, EditModal } from "./index.js";
import MenuSvg from "../../Assets/Svgs/MenuSvg.js";
import EditSvg from "../../Assets/Svgs/EditSvg.js";
import DeleteSvg from "../../Assets/Svgs/DeleteSvg.js";
import ViewSvg from "../../Assets/Svgs/ViewSvg.js";
import { ConfirmationModal, ViewDrawer } from "./index.js";
import { useDeleteCategoryMutation } from "../../store/categorysSlice.js";
import { useDeleteProductMutation } from "../../store/productsSlice.js";
import { useDeleteShopAdminMutation, useDeleteCustomerMutation } from "../../store/adminsSlice.js";
import { ManageStatusModal } from "../Admin/Shops/ManageStatusModal.jsx";
import moment from "moment";
import { toast } from "react-toastify";

function DynamicTable({
  columns,
  data,
  handleShow,
  handleEditShow,
  handleShowView,
  handleChangeStatusShow,
  title,
  setEditData,
  showView,
}) {
  const [updatedData, setUpdatedData] = useState([]);

  const getStatus = (status) => {
    switch (status) {
      case "Pending":
        return "yellow";
      case "Approve":
        return "green";
      default:
        return "red"; // Or any default color you prefer
    }
  };

  useEffect(() => {
    if (data) {
      const newData = [];
      data.forEach((item, index) => {
        newData.push({
          ...item,
          index: "Sr. No", // Sr. No starts from 1
          action: "Action", // Adding 'Action' field
        });
      });
      setUpdatedData(newData);
    }
  }, [data]);

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            {columns.map((columnName, index) => (
              <th key={index} scope="col">
                {Object.values(columnName)[0]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {updatedData.map((rowData, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {columns.map((column, columnIndex) => {
                  // Get the key of the column
                  const key = Object.keys(column)[0];
                  // Check if the key is 'index'
                  if (key === "index") {
                    // Render index + 1
                    return <td key={columnIndex}>{rowIndex + 1}</td>;
                  } else if (key === "action" || key === "createdAt") {
                    // Render action buttons
                    return (
                      <td key={columnIndex}>
                        <div className="d-flex justify-content-end">
                          {((title === "Items" || showView) && title !== "Categories") && (
                            <div className="m-2">
                              <div
                                onClick={() => handleShowView(rowData)}
                                style={{ cursor: "pointer" }}
                              >
                                <ViewSvg />
                              </div>
                            </div>
                          )}
                          <div className="m-2">
                            <div
                              onClick={() => handleEditShow(rowData)}
                              style={{ cursor: "pointer" }}
                            >
                              <EditSvg />
                            </div>
                          </div>
                          <div className="m-2">
                            <div
                              onClick={() => {
                                handleShow();
                                setEditData(rowData);
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <DeleteSvg />
                            </div>
                          </div>
                        </div>
                      </td>
                    );
                  } else if (key === "userId" && title === "Customers") {
                    return (
                      <td key={columnIndex}>{rowData[key]?.email || "N/A"}</td>
                    );
                  } else if(key === "updatedAt" && title === "Categories"){
                      return <td key={columnIndex}>{moment(rowData[key]).format('ll')}</td>
                  } else {
                    // Render data associated with the key
                    return (
                      <>
                        {key === "status" && title === "Shops" ? (
                          <span
                            className="badge"
                            style={{
                              cursor: "pointer",
                              width: "50%",
                              background: `${getStatus(rowData[key])}`,
                            }}
                          >
                            <td
                              key={columnIndex}
                              onClick={() =>
                                handleChangeStatusShow(rowData[key], rowData)
                              }
                            >
                              {rowData[key]}
                            </td>
                          </span>
                        ) : (
                          <td key={columnIndex}>{rowData[key]}</td>
                        )}
                      </>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export const Table = ({
  title,
  columns,
  data,
  show,
  handleClose,
  handleShow,
  page,
  count,
  handleChange,
  isLoading,
  refetch,
  isShowView,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showChangeStatus, setShowChangeStatus] = useState(false);
  const [EditData, setEditData] = useState({});
  const [statusValue, setStatusValue] = useState(null);
  const [deleteCategoryMutation] = useDeleteCategoryMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [deleteShopAdmin] = useDeleteShopAdminMutation();
  const [deleteCustomer] = useDeleteCustomerMutation()

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  const handleConfirmationShow = () => {
    setShowConfirmation(true);
  };

  const handleChangeStatusShow = (status, value) => {
    setStatusValue(status);
    setEditData(value);
    setShowChangeStatus(true);
  };

  const handleChangeStatusClose = () => {
    setStatusValue(null);
    setEditData({});
    setShowChangeStatus(false);
  };

  const handleCloseView = () => setShowView(false);
  const handleShowView = (value) => {
    setEditData(value);
    setShowView(true);
  };

  const handleEditClose = () => {
    setShowEdit(false);
  };

  const handleEditShow = (value) => {
    setEditData(value);
    setShowEdit(true);
  };

  const handleDelete = async () => {
    try {
      if (title === "Categories") {
        await deleteCategoryMutation(EditData._id); // Pass the id of the category to delete
      } else if (title === "Items") {
        await deleteProduct(EditData?._id);
      } else if (title === "Shops") {
        await deleteShopAdmin(EditData?._id);
      }else if(title === "Customers"){
        await deleteCustomer(EditData?._id)
      }
      refetch(); // Refetch data after successful deletion
      setShowConfirmation(false); // Close the confirmation modal
      toast.success(`${title?.slice(0, -1)} deleted successfully!`)
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Something went wrong!")
    }
  };

  return (
    <div className="card mb-5">
      <div className="card-body">
        <div className="row">
          <div className="col-md-12">
            <Header
              title={title}
              showButton={true}
              show={show}
              handleClose={handleClose}
              handleShow={handleShow}
              refetch={refetch}
            />
            {data.length > 0 ? (
              <>
                <DynamicTable
                  columns={columns}
                  data={data}
                  handleShow={handleConfirmationShow}
                  handleEditShow={handleEditShow}
                  handleShowView={handleShowView}
                  handleChangeStatusShow={handleChangeStatusShow}
                  title={title}
                  setEditData={setEditData}
                  showView={isShowView}
                />
                <Pagination {...{ page, count, handleChange }} />
              </>
            ) : (
              <p className="text-center">No Data</p>
            )}
          </div>
        </div>
      </div>
      <ConfirmationModal
        show={showConfirmation}
        handleClose={handleConfirmationClose}
        title="Delete Confirmation"
        description="Are you sure, you want to delete it?"
        handleDelete={handleDelete}
      />

      <EditModal
        show={showEdit}
        handleClose={handleEditClose}
        title={title}
        data={EditData}
        refetch={refetch}
      />
      <ManageStatusModal
        show={showChangeStatus}
        handleClose={handleChangeStatusClose}
        statusValue={statusValue}
        shopId={EditData?._id}
        refetch={refetch}
      />

      <ViewDrawer
        show={showView}
        handleClose={handleCloseView}
        title={title}
        viewFor={title}
        data={EditData}
      />
    </div>
  );
};
