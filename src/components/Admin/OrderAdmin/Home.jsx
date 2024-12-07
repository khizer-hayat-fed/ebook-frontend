import React, { useState } from "react";
import { Header, Pagination } from "../../Reuse";
import { ManageStatusModal } from "./ManageStatusModal";
import { useGetAllOrdersQuery } from "../../../store/adminsSlice";

const OrderTable = ({ columns, data, refetchAgain }) => {
  const [showModal, setShowModal] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [id, setId] = useState(null)

  const handleModal = (orderId) => {
    setId(orderId)
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    refetchAgain()
    setId(null)
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
                  Array.isArray(rowData[Object.keys(columnKey)[0]]) ? (
                    rowData[Object.keys(columnKey)[0]].map(
                      (item, itemIndex) => (
                        <React.Fragment key={itemIndex}>
                          {rowData[Object.keys(columnKey)[0]].length === 1 ? (
                            <>
                              {item?.quantity !== 1 && `${item?.quantity} * `}
                              {item.name}
                            </>
                          ) : (
                            <>
                              {item?.quantity !== 1 && `${item?.quantity} * `}
                              {item.name} {`,`}
                            </>
                          )}
                        </React.Fragment>
                      )
                    )
                  ) : Object.keys(columnKey)[0] === "status" ? (
                    <span
                      style={{ cursor: "pointer" }}
                      className={`badge bg-${getStatusColor(
                        rowData[Object.keys(columnKey)[0]]
                      )}`}
                      onClick={() => handleModal(rowData?._id)}
                    >
                      {rowData[Object.keys(columnKey)[0]]}
                    </span>
                  )  : Object.keys(columnKey)[0] === "customerId" ? (
                    rowData[Object.keys(columnKey)[0]]?.email
                  ) : Object.keys(columnKey)[0] === "shopId" ? (
                    rowData[Object.keys(columnKey)[0]]?.name
                  ) : (
                    rowData[Object.keys(columnKey)[0]]
                  )}{" "}
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
        id={id}
      />
    </div>
  );
};

export const Home = () => {
  const [page, setPage] = useState(1);
  const { data, refetch } = useGetAllOrdersQuery({
    page,
  });

  const columns = [
    { orderId: "Order ID" },
    { items: "Items" },
    { total: "Total Amount" },
    { status: "Status" },
    {customerId: 'Customer Email'},
    {shopId : 'Shop Name'}
  ];

  // Sample array of objects for the data
  // const data = [
  //     {
  //         'orderId': '123456',
  //         'customerId': 'John Doe',
  //         'items': ['Bread', 'Milk', 'Eggs'],
  //         'status': 'Pending',
  //         'total': 'Rs. 50.00',
  //     },
  //     // {
  //     //     'Order ID': '123457',
  //     //     'Customer': 'Jane Smith',
  //     //     'Items': ['Apples', 'Oranges', 'Bananas'],
  //     //     'Status': 'Processing',
  //     //     'Total Amount': 'Rs. 75.00',
  //     // },
  //     // {
  //     //     'Order ID': '123458',
  //     //     'Customer': 'Michael Johnson',
  //     //     'Items': ['Chicken', 'Rice', 'Vegetables'],
  //     //     'Status': 'Shipped',
  //     //     'Total Amount': 'Rs. 100.00',
  //     // },
  //     // {
  //     //     'Order ID': '123459',
  //     //     'Customer': 'Emily Brown',
  //     //     'Items': ['Cheese', 'Bread', 'Wine'],
  //     //     'Status': 'Delivered',
  //     //     'Total Amount': 'Rs. 80.00',
  //     // },
  //     // {
  //     //     'Order ID': '123460',
  //     //     'Customer': 'David Wilson',
  //     //     'Items': ['Pasta', 'Tomatoes', 'Garlic'],
  //     //     'Status': 'Cancelled',
  //     //     'Total Amount': 'Rs. 45.00',
  //     // },
  // ];

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const refetchAgain = ()=>{
    refetch()
  }

  return (
    <div className="row">
      <div className="col-md-12 mt-5">
        <div className="card mb-5">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <Header title={"Orders History"} showButton={false} />
                {data?.data?.length > 0 ? (
                  <>
                    <OrderTable {...{ columns, data: data?.data || [], refetchAgain }} />
                    <Pagination
                      {...{
                        page,
                        count: data?.totalPages || 0,
                        handleChange: handleChangePage,
                      }}
                    />
                  </>
                ) : (
                  <p className="text-center">No Data</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
