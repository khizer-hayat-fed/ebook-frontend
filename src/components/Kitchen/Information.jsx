import React, { useState, useEffect } from "react";
import { Header } from "../Reuse";
import {useUpdateShopMutation, useGetShopByIdQuery} from "../../store/shopsSlice"
import { useSelector } from "react-redux";
import { MapMarker } from "./MapMarker";
import { toast } from "react-toastify";

const InformationForm = () => {
  const user =  useSelector((state) => state.user?.userInfo);
  const {data} = useGetShopByIdQuery(user?.shopId)
  const [updateShop, {isLoading}] = useUpdateShopMutation()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || '',
    address:  "",
    description: "",
    contact:  '',
    location: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async() => {
    try{
      const { address, description, contact, location } = formData;

      if (!address || !description || !contact || !location) {
        toast.error('Fill all fields');
        return;
      }

      await updateShop({
        id:user?.shopId,
        body:{...formData, userId: user?._id}
      })
      toast.success('Shop updated successfully!');
    }catch(error){
      toast.error('Failed to update shop');
      console.log(error.message)
    }

  };

  useEffect(()=>{
    if(data){
      setFormData({
        name: data?.name || "",
        email: data?.email  || '',
        address: data?.address || "",
        description: data?.description || "",
        contact: data?.contact || '',
        location: data?.location || ''
      })
    }
  },[data])
  return (
    <>
      <div className="row">
        <div className="col-md-6 text-start">
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-md-6 text-start">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label">
              Email:
            </label>
            <input
              type="email"
              disabled={true}
              className="form-control"
              id="exampleInputEmail"
              name="email"
              value={formData.email}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 text-start">
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">
              Address:
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-md-6 text-start">
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">
              Contact:
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputAddress"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-start">
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlDescription"
              className="form-label"
            >
              Description:
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlDescription"
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-start">
          <div className="mb-3">
            <p
              className="form-label"
            >
              Location:
            </p>
            <MapMarker form={formData} setForm={setFormData} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-end">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
            disabled={isLoading}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export const Information = () => {
  return (
    <div className="card mb-5">
      <div className="card-body">
        <div className="row">
          <div className="col-md-12">
            <Header title={"Shop Information"} showButton={false} />
            <InformationForm />
          </div>
        </div>
      </div>
    </div>
  );
};
