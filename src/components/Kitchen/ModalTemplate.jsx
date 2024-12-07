import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { AddCategoryForm, AddItemForm } from "./index";
import { useCreateCategoryMutation } from "../../store/categorysSlice";
import { useCreateProductMutation } from "../../store/productsSlice";
import {useCreateShopAdminMutation, useAddManagerMutation, useAddCustomerMutation} from "../../store/adminsSlice"
import { useSelector } from "react-redux";
import { AddShopForm } from "../Admin/Shops";
import { AddCustomerForm } from "../Admin/Customers";

export const ModalTemplate = ({ show, handleClose, title, refetch }) => {
  const shopId = useSelector((state) => state.user?.userInfo?.shopId);
  const _id = useSelector((state) => state.user?.userInfo?._id);
  const [createCategory, { isLoading, isError, error }] =
    useCreateCategoryMutation();
    const [createProduct, {isLoading: isProductLoading, isError: isProductError , error: errorProduct}] = useCreateProductMutation()
    const [addManager, {isLoading: isManagerLoading, isError: isManagerError , error: managerProduct}] = useAddManagerMutation()
    const [createShopAdmin, {isLoading: isShopLoading, isError: isShopError , error: shopProduct}] = useCreateShopAdminMutation()
    const [addCustomer] = useAddCustomerMutation()

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    deliveryTime: ''
  });
  const [image, setImage] = useState(null);

  const [shopData, setShopData] = useState({
    name: "",
    email: '',
    address:  "",
    description: "",
    contact:  ''
  })

  const [managerData, setManagerData] = useState({
    type: 'manager',
    password: '',
    confirmPassword: '',
  })

  const [customerProfileData, setCustomerProfileData] = useState({
    name: '',
    email: '',
    address: '',
    contact : '',
    gender: ''
})
  
  const [customerData, setCustomerData] = useState({
    type: 'customer',
    password: '',
    confirmPassword: '',
})

  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(title === 'Categories'){
      try {
        // Call the createCategory mutation with the category name
        await createCategory({ name: categoryName, shopId });
        // Reset the category name input
        setCategoryName("");
        refetch()
        handleClose()
        // Handle success or additional actions if needed
      } catch (error) {
        // Handle error
        console.error("Error creating category:", error);
      }
    } else if(title === 'Items'){
      try {
        // Call the createCategory mutation with the category name
        await createProduct({ ...formData, shopId, userId: _id, photo: image });
        // Reset the category name input
        setFormData({
          name: "",
          category: "",
          price: "",
          description: "",
          deliveryTime: ''
        });
        
        setImage(null)

        refetch()
        handleClose()
        // Handle success or additional actions if needed
      } catch (error) {
        // Handle error
        console.error("Error creating Item:", error);
      }
    }else if(title === 'Shops'){
      try{
        if(managerData?.password !== managerData?.confirmPassword){
          alert('Password and Confirm Password is not same!');
          return;
        }

        await createShopAdmin({ ...shopData });
        await addManager({...managerData, email: shopData?.email})
        // Reset the category name input
        setShopData({
          name: "",
          email: '',
          address:  "",
          description: "",
          contact:  ''
        })

        setManagerData({
          type: 'manager',
          password: '',
          confirmPassword: '',
        })

        refetch()
        handleClose()
      }catch(error){
        console.log(error)
      }
    }else if(title === "Customers"){
      try{
        if(customerData?.password !== customerData?.confirmPassword){
          alert('Password and Confirm Password is not same!');
          return;
        }
        await addCustomer({...customerData, ...customerProfileData})
        // Reset the category name input
        setCustomerProfileData({
          name: '',
          email: '',
          address: '',
          contact : '',
          gender: ''
      })

      setCustomerData({
          type: 'customer',
          password: '',
          confirmPassword: '',
      })

        refetch()
        handleClose()
    }catch(error){
      console.log(error)
    }
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
          ) : title === 'Shops' ? (
            <AddShopForm {...{ formData: shopData, setFormData: setShopData, managerData, setManagerData, shopId }} />
          ) : title === 'Customers' ? (
            <AddCustomerForm {...{ formData: customerProfileData, setFormData: setCustomerProfileData, managerData: customerData, setManagerData: setCustomerData, shopId }} />
          ) : (
            <AddCategoryForm {...{ categoryName, setCategoryName }} />
          )}

          {(isError || isProductError) && <div className="text-danger">{isError ? error.message : errorProduct?.message}</div>}
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
            onClick={handleSubmit}
            disabled={isLoading || isProductLoading}
          >
            {isLoading || isProductLoading ? "Creating..." : "Save"}
          </button>
        </Modal.Footer>
      </Modal>
      {/* End Modal */}
    </div>
  );
};
