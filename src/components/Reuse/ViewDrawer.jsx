import React from "react";
import { ViewCategory, ViewItem } from "../Kitchen";
import { ReviewCards, ViewShop } from "../Admin/Shops";
import { useGetReviewByShopIdQuery, useGetAverageRatingQuery } from "../../store/adminsSlice";
import { ViewCustomers } from "../Admin/Customers";

export const ViewDrawer = ({ show, handleClose, title, viewFor, data }) => {
  const { data: ReviewData } = useGetReviewByShopIdQuery(data?._id);
  const {data: rating} = useGetAverageRatingQuery(data?._id)

  return (
    <div
      className={`offcanvas offcanvas-end ${show ? "show" : ""}`}
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
      style={{overflow:'auto'}}
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">{title}</h5>
        <button
          type="button"
          className="btn-close text-reset"
          onClick={handleClose}
          aria-label="Close"
        ></button>
      </div>
      <div style={{ textAlign: "left", margin: "15px" }}>
        {viewFor === "Items" ? (
          <ViewItem data={data} />
        ) : viewFor === "Categories" ? (
          <ViewCategory data={data} />
        ) : viewFor === "Shops" ? (
          <ViewShop data={data} rating={rating} />
        ) : viewFor === "Customers" ? (
          <ViewCustomers data={data} />
        ) : (
          <>View Drawer</>
        )}
      </div>
      {ReviewData && (
      <div style={{ margin: "25px" }}>
        {ReviewData?.map(item => (
        <ReviewCards data={item} />
        ))}
      </div>
      )}
    </div>
  );
};
