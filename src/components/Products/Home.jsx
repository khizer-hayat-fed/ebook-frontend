import React, { useState } from "react";
import { Card } from "./index";
import { useGetAllProductByShopIdQuery } from "../../store/productsSlice";
import CircularLoader from "../CircularLoader"

export const Home = ({ shopId }) => {
  const { data, isLoading } = useGetAllProductByShopIdQuery(shopId);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchPrice, setSearchPrice] = useState("");

  const filteredData = data?.filter((item) => {
    const itemName = item.name.toLowerCase();
    const itemCategory = item.category.toLowerCase();
    const itemPrice = item.price.toString();

    const isNameMatch = itemName.includes(searchTerm.toLowerCase());
    const isCategoryMatch = itemCategory.includes(searchCategory.toLowerCase());
    const isPriceMatch = itemPrice.includes(searchPrice.toLowerCase());

    return (
      (searchTerm === "" || isNameMatch) &&
      (searchCategory === "" || isCategoryMatch) &&
      (searchPrice === "" || isPriceMatch)
    );
  });

  if(isLoading) return <CircularLoader />

  return (
    <div>
      {data?.length !== 0 && (
        <div className="row">
          <div className="col-md-12 d-flex justify-content-end">
            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Search Items"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Search Category"
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Search Price"
                  value={searchPrice}
                  onChange={(e) => setSearchPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        {filteredData?.length !== 0 ? (
          filteredData?.map((item) => (
            <div key={item?._id} className="col-md-3">
              <Card
                {...{
                  name: item?.name,
                  description: item?.description,
                  id: item?._id,
                  category: item?.category,
                  price: item?.price,
                  deliveryTime: item?.deliveryTime,
                  photo: item?.photo
                }}
              />
            </div>
          ))
        ) : (
          <div className="col-md-12" style={{display:'flex', justifyContent:'center', alignItems:'center', height:'40vh'}}>No Data Available</div>
        )}
      </div>
    </div>
  );
};
