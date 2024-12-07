import React, { useState } from "react";
import { Header, Pagination } from "../Reuse";
import { ManageStatusModal } from "./ManageStatusModal";
import { useGetOrderHistoryQuery } from "../../store/ordersSlice";
import { useSelector } from "react-redux";
import CheckCircleSvg from "../../Assets/Svgs/CheckCircleSvg";
import Swal from 'sweetalert2';
import WaitSvg from "../../Assets/Svgs/WaitSvg";
import CircularLoader from "../CircularLoader"

const OrderTable = ({ columns, data, refetchAgain }) => {
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);
  const [shopId, setShopId] = useState(null);

  const handleModalClose = () => {
    setShowModal(false);
    setId(null)
    setShopId(null)
  };

  const handleRemark = (orderId, shopID, status) => {
    if(status === "Delivered" || status === "Cancelled" ){
      setId(orderId)
      setShopId(shopID)
      setShowModal(true);
    }else{
      Swal.fire({
        icon: 'info',
        title: 'Invalid Action',
        text: `You can only give remarks to Delivered or Cancelled orders. Your Status is ${status}.`,
        confirmButtonText: 'OK',
      });
    }
  }
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
                      className={`badge bg-${getStatusColor(
                        rowData[Object.keys(columnKey)[0]]
                      )}`}
                    >
                      {rowData[Object.keys(columnKey)[0]]}
                    </span>
                  ) : Object.keys(columnKey)[0] === "remarks" ? (
                    rowData[Object.keys(columnKey)[0]] ? <span style={{width:'30%'}} className="badge bg-success">
                      <CheckCircleSvg />
                    </span> : <span style={{cursor:'pointer', width: (rowData?.status !== 'Delivered' || rowData?.status !== 'Cancelled') && '30%'}} className={`badge ${rowData?.status === 'Delivered' || rowData?.status === 'Cancelled' ? 'bg-warning' : 'bg-info' }`} onClick={()=>{handleRemark(rowData?._id, rowData?.shopId, rowData?.status)}}>
                      {rowData?.status === 'Delivered' || rowData?.status === 'Cancelled' ?  'Give Remark' : <WaitSvg />}
                      </span>
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
        id={id}
        shopId={shopId}
        refetchAgain={refetchAgain}
      />
    </div>
  );
};

export const Home = () => {
  const userId = useSelector((state) => state?.user?.userInfo?._id);
  const [page, setPage] = useState(1);
  const { data, refetch, isLoading } = useGetOrderHistoryQuery({
    userId,
    page,
  });
  const columns = [
    { orderId: "Order ID" },
    { items: "Items" },
    { total: "Total Amount" },
    { status: "Status" },
    {remarks: 'Give Remarks'}
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

  if(isLoading) return <CircularLoader />

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
                  <p className="text-center" style={{display:'flex', justifyContent:'center', alignItems:'center', height:'39vh'}}>No Data</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
