import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setCartCount } from "../../store/cartCountsSlice";
import { useAddToCartMutation, useUpdateItemsMutation } from "../../store/ordersSlice";
import Swal from "sweetalert2";
import {toast} from "react-toastify"

export const Card = ({
  name,
  description,
  id,
  category,
  price,
  deliveryTime,
  photo
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shopId } = useParams();
  const _id = useSelector((state) => state?.user?.userInfo?._id);
  const countState = useSelector((state) => state?.cartCount);

  const [cartData, setCartData] = useState(
    localStorage.getItem("cartData")
      ? JSON.parse(localStorage.getItem("cartData"))
      : null
  );

  const [itemData, setItemData] = useState(
    localStorage.getItem("itemData")
      ? JSON.parse(localStorage.getItem("itemData"))
      : []
  );

  const cartId = localStorage.getItem('cartId') ? JSON.parse(localStorage.getItem('cartId')) : null

  const [addToCart] = useAddToCartMutation();
  const [updateItems] = useUpdateItemsMutation()

  const generateRandomId = () => {
    // Generate a random number between 10000 and 99999 (inclusive)
    const randomId = Math.floor(10000 + Math.random() * 90000);
    return randomId;
  };

  const handleNavigation = async (
    productId,
    productName,
    productCategory,
    productPrice,
    productPhoto
  ) => {
    if (_id) {

      let newItemDataArray = localStorage.getItem("itemData")
      ? JSON.parse(localStorage.getItem("itemData"))
      : []

      const existingItem = newItemDataArray.find((item) => item.id === productId);
      if (existingItem) {
        toast.error("This item is already in your cart!");
      } else {
        let newItemObject = {
          id: productId,
          name: productName,
          category: productCategory,
          price: productPrice,
          quantity: 1,
          photo: productPhoto,
        };
        const newArray = [...newItemDataArray, newItemObject]
        newItemDataArray = newArray
        setItemData(newArray)

        // Calculate total price
        const totalPrice = newItemDataArray.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

        // Update cartData with new itemData
        const body = {
          orderId: generateRandomId(),
          customerId: _id,
          shopId,
          items: newItemDataArray,
          status: "Pending",
          remark: false,
          total: totalPrice,
        };

        if(cartId){
          await updateItems({
            items: newItemDataArray,
            total: totalPrice,
            id: cartId,
          })
        }else{
          const response = await addToCart(body);
          localStorage.setItem("cartId", JSON.stringify(response?.data?.data?._id))
        }
        setCartData(body);
        localStorage.setItem("cartData", JSON.stringify(body));
        localStorage.setItem('itemData', JSON.stringify(newItemDataArray))
        toast.success('Item has been added to cart!')
        dispatch(setCartCount(countState + 1));
      }
      // navigate(`/items/${shopId}`);
    } else {
      Swal.fire({
        title: "Login Required",
        text: "You need to login first to add items to your cart.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login / Signup",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <div
      class="card mx-auto"
      style={{ width: "18rem", marginTop: "10px", marginBottom: "10px", height:'28rem' }}
    >
      <img
        src={photo ? `http://localhost:5000/uploads/${photo}` : require("../../Assets/noImage.png")}
        class="card-img-top"
        alt="Laptop"
        style={{height:'20vh'}}
      />
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <p class="small">
            <p class="text-muted">{category}</p>
          </p>
          {/* <p class="small text-danger"><s>$1099</s></p> */}
        </div>

        <div class="d-flex justify-content-between mb-3">
          <h5 class="mb-0">{name}</h5>
          <h5 class="text-dark mb-0">Rs. {price}</h5>
        </div>

        <div class="d-flex justify-content-between mb-2">
          <p class="text-muted mb-0">{description}</p>
        </div>

        <div class="d-flex justify-content-between mb-2">
          <p class="text-muted mb-0">
            Delivery Time: <span class="fw-bold">{deliveryTime} days</span>
          </p>
        </div>

        <div class="d-flex justify-content-center mb-2">
          <button
            class="btn btn-outline-primary btn-sm mt-2"
            type="button"
            onClick={() => handleNavigation(id, name, category, price, photo)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
