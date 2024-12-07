import React, { useState } from "react";
import { Header, Pagination } from "../../Reuse";
import { ManageStatusModal } from "../../Order";
import { useGetAllShopAdminQuery } from "../../../store/adminsSlice";
import { useSelector } from "react-redux";
import { Table } from "../../Reuse";

const ShopTable = ({ columns, data }) => {
  const [showModal, setShowModal] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState("");

  const handleModal = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  // Function to determine the badge color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "secondary";
      case "Processing":
        return "warning";
      case "Shipped":
        return "info";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };
  return (
    <div className="table-responsive">
      <table className="table table-hover">
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
          {data.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((columnKey, columnIndex) => (
                <td key={columnIndex}>
                  {/* Handle Items column separately */}
                  {Object.keys(columnKey)[0] === "items" &&
                  Array.isArray(rowData[Object.keys(columnKey)[0]])
                    ? rowData[Object.keys(columnKey)[0]].join(", ") // Join array items with comma
                    : Object.keys(columnKey)[0] === "blocked"
                    ? rowData[Object.keys(columnKey)[0]]
                      ? "true"
                      : "false"
                    : rowData[Object.keys(columnKey)[0]]}{" "}
                  {/* Display other columns as is */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <ManageStatusModal
        show={showModal}
        handleClose={handleModalClose}
        updatedStatus={updatedStatus}
        setUpdatedStatus={setUpdatedStatus}
      />
    </div>
  );
};

export const Home = () => {
  const shopId = useSelector((state) => state.user?.userInfo?.shopId);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false)
  const { data, isLoading, refetch } = useGetAllShopAdminQuery({
    page,
  });
  const columns = [
    { name: "Name" },
    { email: "Email" },
    { status: "Status" },
    { address: "Address" },
    // { blocked: "Blocked" },
    { createdAt: "Action" },
  ];

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const refetchAgain = () => {
    refetch();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleShowModal = ()=>{
    setShowModal(true)
  }

  return (
    <div className="row">
      <div className="col-md-12 mt-5">
        <Table
          title={"Shops"}
          data={data?.data || []}
          columns={columns}
          show={showModal}
          handleClose={handleCloseModal}
          handleShow={handleShowModal}
          page={page}
          count={data?.totalPages || 0}
          handleChange={handleChangePage}
          isLoading={isLoading}
          refetch={refetchAgain}
          isShowView={true}
        />
      </div>
    </div>
  );
};
