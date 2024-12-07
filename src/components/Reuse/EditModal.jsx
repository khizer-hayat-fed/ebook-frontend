import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { AddCategoryForm, AddItemForm } from "../Kitchen/index";
import { useUpdateCategoryMutation } from "../../store/categorysSlice";
import { useUpdateProductMutation } from "../../store/productsSlice";
import {useUpdateCustomerMutation, useUpdateShopAdminMutation} from "../../store/adminsSlice.js"
import { useSelector } from "react-redux";
import { AddShopForm } from "../Admin/Shops";
import { AddCustomerForm } from "../Admin/Customers/AddCustomerForm.jsx";

export const EditModal = ({ show, handleClose, title, data, refetch }) => {
  const shopId = useSelector((state) => state.user?.userInfo?.shopId);
  const _id = useSelector((state) => state.user?.userInfo?._id);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    deliveryTime: ''
  });
  const [image, setImage] = useState(null)
  const [shopData, setShopData] = useState({
    name: "",
    email: '',
    address:  "",
    description: "",
    contact:  ''
  })
  const [customerProfileData, setCustomerProfileData] = useState({
    name: '',
    email: '',
    address: '',
    contact : '',
    gender: ''
})
  const [categoryName, setCategoryName] = useState("");
  const [updateCategoryMutation, {isLoading}] = useUpdateCategoryMutation(); // Initialize the mutation hook
  const [updateProduct, {isLoading: isProductLoading}] = useUpdateProductMutation()
  const [updateShopAdmin, {isLoading: isShopLoading}] = useUpdateShopAdminMutation()
  const [updateCustomer, {isLoading: isCustomerLoading}] = useUpdateCustomerMutation()

  useEffect(() => {
    if (title === "Items") {
      setFormData({
        name: data?.name || "",
        category: data?.category || "",
        price: data?.price || "",
        description: data?.description || "",
        deliveryTime: data?.deliveryTime || ''
      });
      setImage(data?.photo || null)
    } else if (title === "Categories") {
      setCategoryName(data?.name || "");
    }else if(title === 'Shops'){
      setShopData({
        name: data?.name || "",
        email: data?.email || '',
        address:  data?.address || "",
        description: data?.description || "",
        contact:  data?.contact || ''
      })
    } else if(title === 'Customers'){
      setCustomerProfileData({
        name: data?.name || '',
        address: data?.address || '',
        contact : data?.number || '',
        gender: data?.gender || ''
    })
    }
  }, [data]);

  // Handle submit function to update the category
  const handleSubmit = async () => {
    try {
      if (title === "Categories") {
        await updateCategoryMutation({
          id: data?._id, // Pass the id of the category to update
          body: { name: categoryName, shopId: data?.shopId }, // Pass the updated category name
        });
      }else if(title === 'Items'){
        const body = { ...formData, shopId, userId: _id, photo:image , id: data?._id }
        await updateProduct(body)
      }else if(title === 'Shops'){
        await updateShopAdmin({
          id: data?._id,
          body: { ...shopData, shopId }, // Pass the updated Shop name
        })
      }else if(title === 'Customers'){
        await updateCustomer({
          id: data?._id,
          body: {...customerProfileData}
        })
      }
      // Add logic for other types of data if needed
      handleClose(); // Close the modal after successful update
      refetch(); // Refetch data to reflect changes
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div>
      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {title === "Items" ? (
            <AddItemForm {...{ formData, setFormData, image, setImage, shopId }} />
          ) : title === "Shops" ? (
            <AddShopForm {...{ formData : shopData, setFormData:setShopData, shopId, isEdit:true }} />
          ) : title === 'Customers' ? (
            <AddCustomerForm {...{ formData : customerProfileData, setFormData:setCustomerProfileData, shopId, isEdit:true }} />
          ) : (
            <AddCategoryForm {...{ categoryName, setCategoryName }} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit} // Call the handleSubmit function on Save button click
            disabled={isLoading || isProductLoading || isShopLoading || isCustomerLoading}
          >
            {isLoading || isProductLoading || isShopLoading || isCustomerLoading ? 'Updating....' : 'Save'}
          </button>
        </Modal.Footer>
      </Modal>
      {/* End Modal */}
    </div>
  );
};
