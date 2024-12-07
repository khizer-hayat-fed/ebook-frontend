import React, { useState } from "react";
import { Table } from "../Reuse/index.js";
import { ItemColumn, CategoriesColumn } from "../../utils/tableColumns.js";
import { Information } from "./Information.jsx";
import { useSelector } from "react-redux";
import {useGetProductByShopIdQuery} from "../../store/productsSlice.js"
import {useGetAllCategoriesQuery} from "../../store/categorysSlice.js"

export const Home = () => {
  const shopId = useSelector(state => state.user?.userInfo?.shopId)
  const [itemModal, setItemModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [itemPage, setItemPage] = useState(1);
  const [categoryPage, setCategoryPage] = useState(1);

  const {data, isLoading, refetch} = useGetProductByShopIdQuery({
    shopId,
    page: itemPage
  })

  const {data: categoryData, isLoading: categoryLoading, refetch: refetchCategory} = useGetAllCategoriesQuery({
    shopId,
    page: categoryPage
  })

  const handleItemClose = () => setItemModal(false);
  const handleCategoryClose = () => setCategoryModal(false);
  const handleItemShow = () => setItemModal(true);
  const handleCategoryShow = () => setCategoryModal(true);
  const handleChangeItemPage = (newPage) => {
    setItemPage(newPage);
  };
  const handleChangeCategoryPage = (newPage) => {
    setCategoryPage(newPage);
  };
  const refetchItem = () => {
    refetch()
  }
  const refetchCategoryData = () => {
    refetchCategory()
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 d-flex flex-column mt-4">
          <Table
            title={"Items"}
            data={data?.data || []}
            columns={ItemColumn}
            show={itemModal}
            handleClose={handleItemClose}
            handleShow={handleItemShow}
            page={itemPage}
            count={data?.totalPages || 0}
            handleChange={handleChangeItemPage}
            isLoading={isLoading}
            refetch={refetchItem}
          />
        </div>
        <div className="col-md-6 d-flex flex-column mt-4">
          <Table
            title={"Categories"}
            data={categoryData?.data || []}
            columns={CategoriesColumn}
            show={categoryModal}
            handleClose={handleCategoryClose}
            handleShow={handleCategoryShow}
            page={categoryPage}
            count={categoryData?.totalPages || 0}
            handleChange={handleChangeCategoryPage}
            isLoading={categoryLoading}
            refetch={refetchCategoryData}
          />
        </div>
      </div>
      <Information />
    </div>
  );
};
