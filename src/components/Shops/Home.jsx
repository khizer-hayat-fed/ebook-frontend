import React, { useState, useEffect } from "react";
import SearchSvg from "../../Assets/Svgs/SearchSvg";
import { Card } from "./index";
import { useGetAllShopQuery } from "../../store/shopsSlice";
import CircularLoader from "../CircularLoader";

export const Home = () => {
  const { data, isLoading } = useGetAllShopQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data) {
      const ratingNumber = searchRating && searchRating !== 'reset' ? parseInt(searchRating, 10) : null;
      const filteredObject = data.filter((item) => {
        const matchesName = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRating = ratingNumber !== null ? item.averageRating === ratingNumber : true;
        return matchesName && matchesRating;
      });

      setFilteredData(filteredObject);
    }
  }, [searchTerm, searchRating, data]);

  if (isLoading) return <CircularLoader />;

  return (
    <div>
      {data?.length !== 0 && (
        <div className="row">
          <div className="col-md-7"></div>
          <div className="col-md-3 d-flex justify-content-end">
            <div
              className="d-flex"
              style={{ border: "1px solid black", borderRadius: "5px" }}
            >
              <div style={{ margin: "2px", paddingBottom: "2px" }}>
                <SearchSvg />
              </div>
              <input
                type="text"
                style={{ border: "none", outline: "none" }}
                placeholder="Search Shop"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-2 justify-content-end">
            <select
              className="form-select"
              style={{ margin: "-5px" }}
              value={searchRating && searchRating}
              onChange={(e) => setSearchRating(e.target.value)}
            >
              <option selected >
                Search Ratings
              </option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
              <option value="reset">Reset</option>
            </select>
          </div>
        </div>
      )}

      <div className="row">
        {filteredData.length === 0 ? (
          <div className="col-md-12" style={{display:'flex', justifyContent:'center', alignItems:'center', height:'39vh'}}>No Shops Till Now</div>
        ) : (
          filteredData?.map((item) => (
            <div key={item?._id} className="col-md-3">
              <Card
                {...{
                  name: item?.name,
                  description: item?.description,
                  id: item?._id,
                  location: item?.location
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
