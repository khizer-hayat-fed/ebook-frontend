import React, { useState } from "react";
import { useGetAllShopAdminQuery, useGetAllCustomersQuery } from "../../../store/adminsSlice";
import { useSelector } from "react-redux";
import { Table } from "../../Reuse";

export const Home = () => {
  const shopId = useSelector((state) => state.user?.userInfo?.shopId);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false)
  const { data, isLoading, refetch } = useGetAllCustomersQuery({
    page,
  });

  const columns = [
    { name: "Name" },
    { userId: "Email" },
    { gender: "Gender" },
    { number: "Number" },
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
          title={"Customers"}
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
