import React, { useState } from "react";
import { useGetAllItemsQuery } from "../../../store/adminsSlice";
import { useSelector } from "react-redux";
import { Table } from "../../Reuse";
import { ItemColumn} from "../../../utils/tableColumns";

export const Home = () => {
  const shopId = useSelector((state) => state.user?.userInfo?.shopId);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false)
  const { data, isLoading, refetch } = useGetAllItemsQuery({
    page,
  });

  const columns = [
    { name: "Name" },
    {updatedAt: 'Creation Date'},
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
          title={"Items"}
          data={data?.data || []}
          columns={ItemColumn}
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
