import React, {useState} from 'react'
import { Header, Pagination, StarRating } from "../Reuse";
import { useSelector } from "react-redux";
import CircularLoader from "../CircularLoader"
import {useGetAllReviewsQuery} from "../../store/reviewsSlice"

const OrderTable = ({ columns, data }) => {
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
                                    {Object.keys(columnKey)[0] === 'rating' ?
                                        <StarRating rating={rowData[Object.keys(columnKey)[0]]} /> // Render star rating component
                                        : Object.keys(columnKey)[0] === 'userId' ?
                                        rowData[Object.keys(columnKey)[0]]?.email
                                        : rowData[Object.keys(columnKey)[0]]} {/* Display other columns as is */}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export const Home = () => {
    const shopId = useSelector((state) => state.user?.userInfo?.shopId);
    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetAllReviewsQuery({
      shopId,
      page,
    });
    const columns = [{userId : 'Customer'}, {orderId:'Item'}, {remark: 'Remark'}, {rating: 'Rating'}];

    console.log(data)

    // Sample array of objects for the data
// const data = [
//     {
//         'userId': 'John Doe',
//         'orderId': 'Laptop',
//         'remark': 'Great product, fast delivery!',
//         'rating': 5
//     },
//     {
//         'Customer': 'Jane Smith',
//         'Item': 'T-shirt',
//         'Remark': 'Nice color but a bit tight.',
//         'Rating': 3
//     },
//     {
//         'Customer': 'Michael Johnson',
//         'Item': 'Smartphone',
//         'Remark': 'Excellent device, highly recommended!',
//         'Rating': 5
//     },
//     {
//         'Customer': 'Emily Brown',
//         'Item': 'Book',
//         'Remark': 'Interesting read, arrived in good condition.',
//         'Rating': 4
//     },
//     {
//         'Customer': 'David Wilson',
//         'Item': 'Headphones',
//         'Remark': 'Average quality, decent price.',
//         'Rating': 2
//     },
//     {
//         'Customer': 'Jessica Lee',
//         'Item': 'Backpack',
//         'Remark': 'Very durable, exceeded my expectations.',
//         'Rating': 5
//     },
//     {
//         'Customer': 'Christopher Taylor',
//         'Item': 'Sneakers',
//         'Remark': 'Comfortable shoes, size runs small.',
//         'Rating': 4
//     },
//     {
//         'Customer': 'Sophia Martinez',
//         'Item': 'Watch',
//         'Remark': 'Looks elegant, arrived on time.',
//         'Rating': 4
//     },
//     {
//         'Customer': 'Daniel Anderson',
//         'Item': 'Gaming Mouse',
//         'Remark': 'Great for gaming, fast response time.',
//         'Rating': 5
//     },
//     {
//         'Customer': 'Olivia Wilson',
//         'Item': 'Sunglasses',
//         'Remark': 'Stylish design, but lens quality could be better.',
//         'Rating': 3
//     }
// ];

const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  if(isLoading) return <CircularLoader />
  return (
    <div className='row'>
        <div className='col-md-12 mt-5'>
        <div className="card mb-5">
      <div className="card-body">
        <div className="row">
          <div className="col-md-12">
            <Header title={"Reviews"} showButton={false} />
            {data?.data?.length > 0 ? (
                <>
            <OrderTable {...{columns,data: data?.data || []}} />
            <Pagination
                      {...{
                        page,
                        count: data?.totalPages || 0,
                        handleChange: handleChangePage,
                      }}
                    />
                </>
            ):(
                <p className="text-center">No Data</p>
            )}
          </div>
        </div>
      </div>
    </div>
        </div>
    </div>
  )
}