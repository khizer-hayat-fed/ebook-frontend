import React, { useState } from "react";
import { useGetAllShopDropdownQuery } from "../../../store/adminsSlice";
import {
  useGetSalesReportQuery,
  useGetYearlyReportQuery,
} from "../../../store/ordersSlice";
import { Card, LineChart } from "../../Analytics";

const ShopDropdown = ({ shopId, setShopId, setShopName }) => {
  const { data } = useGetAllShopDropdownQuery();

  const handleShopChange = (e) => {
    const name = data?.find((item) => item?._id === e);
    setShopId(e);
    setShopName(name?.name);
  };
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="mb-3">
          <label htmlFor="exampleInputAddress" className="form-label">
            Select Shop To Generate Report:
          </label>
          <select
            className="form-control"
            id="exampleInputAddress"
            name="gender"
            value={shopId}
            onChange={(e) => handleShopChange(e.target.value)}
          >
            <option value="">Select Shop</option>
            {data?.map((item) => (
              <option key={item?._id} value={item?._id}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export const Home = () => {
  const [shopId, setShopId] = useState(null);
  const [shopName, setShopName] = useState(null);

  const { data } = useGetSalesReportQuery(shopId);
  const { data: YearlyData } = useGetYearlyReportQuery(shopId);
  const CardTitle = ["Daily Sale", "Weekly Sale", "Monthly Sale"];

  return (
    <>
      {shopName ? (
        <div className="row">
          <div className="col-md-12 mt-5">
            <div className="row d-flex justify-content-center">
              <div className="col-md-12">
                <h5>Report For {shopName} (SHOP)</h5>
              </div>
            </div>

            <div className="row d-flex justify-content-center mb-5">
              <div className="col-md-12">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    setShopId(null);
                    setShopName(null);
                  }}
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="row d-flex justify-content-evenly">
              {CardTitle.map((item, index) => (
                <div key={index} className="col-md-3">
                  <Card title={item} data={data} />
                </div>
              ))}
            </div>

            <div
              className="row d-flex justify-content-center border mt-5"
              style={{ height: "75%" }}
            >
              <LineChart YearlyData={YearlyData} />
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <ShopDropdown {...{ shopId, setShopId, setShopName }} />
        </div>
      )}
    </>
  );
};
