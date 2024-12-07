import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetCartByUserIdQuery,
  useUpdateQuantityMutation,
  useUpdateItemsMutation,
  useDeleteOrderMutation,
  useOrderCheckoutMutation,
} from "../store/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCartCount } from "../store/cartCountsSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const _id = useSelector((state) => state?.user?.userInfo?._id);
  const countState = useSelector((state) => state?.cartCount);

  const [data, setData] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");

  const { data: cartData, refetch } = useGetCartByUserIdQuery(_id);
  const [updateQuantity] = useUpdateQuantityMutation();
  const [updateItems] = useUpdateItemsMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const [orderCheckout] = useOrderCheckoutMutation();

  const handleQuantity = async (quantity, itemId, price, isMinus) => {
    if (quantity !== 0) {
      const total = isMinus
        ? cartData[0]?.total - price
        : cartData[0]?.total + price;
      await updateQuantity({ quantity, itemId, id: cartData[0]?._id, total });
      refetch();
    } else {
      alert("Quantity cannot be 0!");
    }
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleDelete = async (itemId, price, quantity) => {
    const filteredItems = data?.filter((item) => item.id !== itemId);
    // Create a shallow copy of cartData
    const updatedCartData = [...cartData];

    // Create a shallow copy of the first element of cartData
    const updatedCartDataItem = { ...updatedCartData[0] };

    // Filter out the item with the matching itemId
    updatedCartDataItem.items = updatedCartDataItem.items.filter(
      (item) => item.id !== itemId
    );

    // Calculate the total price based on the provided price and quantity
    const totalPrice = price * quantity;
    updatedCartDataItem.total = totalPrice;

    // Update the first element of updatedCartData with the modified item
    updatedCartData[0] = updatedCartDataItem;

    if (filteredItems.length === 0) {
      await deleteOrder(cartData[0]?._id);
      localStorage.removeItem("cartData");
      navigate(-1);
    } else {
      await updateItems({
        items: filteredItems,
        total: quantity * price,
        id: cartData[0]?._id,
      });
      localStorage.setItem("cartData", JSON.stringify(updatedCartData[0]));
      toast.success("Item has been deleted!");
    }

    refetch();
    dispatch(setCartCount(countState - 1));
  };

  const handleCheckout = async () => {
    await orderCheckout({
      id: cartData[0]?._id,
      isCheckOut: true,
      paymentMethod,
    });
    localStorage.removeItem("cartData");
    refetch();
    dispatch(setCartCount(0));
    navigate("/");
  };

  useEffect(() => {
    if (cartData) {
      setData(cartData[0]?.items);
    }
  }, [cartData]);

  // forcing get cart by user id to call api with 200 instead of getting data from cache
  useEffect(() => {
    refetch();
  }, []);

  return (
    <section className="h-100" style={{marginTop:'10vh'}}>
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
            </div>

            {data ? (
              <>
                {data?.map((item) => (
                  <div className="card rounded-3 mb-4">
                    <div className="card-body p-4">
                      <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-2">
                          <img
                            src={
                              item?.photo
                                ? `https://ebook-backend-production.up.railway.app/uploads/${item?.photo}`
                                : require("../Assets/noImage.png")
                            }
                            className="img-fluid rounded-3"
                            alt={item?.name}
                          />
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3">
                          <p className="lead fw-normal mb-2">{item?.name}</p>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                          <button
                            className="btn btn-link px-2"
                            onClick={() => {
                              handleQuantity(
                                item?.quantity - 1,
                                item?.id,
                                item?.price,
                                true
                              );
                            }}
                          >
                            <i className="fas fa-minus"></i>
                          </button>

                          <input
                            id="form1"
                            min="0"
                            name="quantity"
                            value={item?.quantity}
                            type="number"
                            className="form-control form-control-sm"
                          />

                          <button
                            className="btn btn-link px-2"
                            onClick={() =>
                              handleQuantity(
                                item?.quantity + 1,
                                item?.id,
                                item?.price,
                                false
                              )
                            }
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                          <h5 className="mb-0">Rs. {item?.price}</h5>
                        </div>
                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                          <p
                            className="text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleDelete(
                                item?.id,
                                item?.price,
                                item?.quantity
                              );
                            }}
                          >
                            <i className="fas fa-trash fa-lg"></i>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="card mb-4">
                  <div className="card-body p-4 d-flex flex-row">
                    <div className="form-outline flex-fill">
                      <p>
                        Total : <b>Rs. {cartData ? cartData[0]?.total : "0"}</b>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card mb-4">
                  <div className="card-body p-4 d-flex flex-column">
                    <div>
                      <h4>Select Your Payment Method</h4>
                    </div>
                    <div className="d-flex">
                      <div className="form-outline flex-fill">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="COD"
                          id="cashOnDeliveryCheckbox"
                          checked={paymentMethod === "COD"}
                          onChange={handlePaymentMethodChange}
                        />
                        <label
                          className="form-check-label ml-2"
                          htmlFor="cashOnDeliveryCheckbox"
                        >
                          Cash on Delivery
                        </label>
                      </div>
                      <div className="form-outline flex-fill">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="bank"
                          id="transferToBankCheckbox"
                          checked={paymentMethod === "bank"}
                          onChange={handlePaymentMethodChange}
                        />
                        <label
                          className="form-check-label ml-2"
                          htmlFor="transferToBankCheckbox"
                        >
                          Transfer to Bank
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <button
                      onClick={() => handleCheckout()}
                      type="button"
                      className="btn btn-warning btn-block btn-lg"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="card mb-4">
                <div className="card-body p-4 d-flex flex-row">
                  <div className="form-outline flex-fill">
                    <p>Cart is Empty!</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
