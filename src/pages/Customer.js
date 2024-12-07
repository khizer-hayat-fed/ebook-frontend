import React, { useState, useEffect } from 'react';
import AdminModal from "../components/AdminModal";
import { BsPencil  } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { useGetAllCustomersQuery, useDeleteCustomerMutation } from '../store/adminsSlice';
import { toast } from "react-toastify";
import { Sidebar } from '../components/Admin';
import { Home } from '../components/Admin/Customers';


const Customer = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState(false);

  // Fetch all customers
  const { data: customers, isLoading, isError, refetch } = useGetAllCustomersQuery();
  const [deleteCustomer] = useDeleteCustomerMutation();


  const handleClose = () => setShow(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShow = () => setShow(true);
  const handleShowEdit = () => setShowEdit(true);

  const handleEdit = (data) => {
    setEditData(data)
    handleShowEdit()
  };

  const handleDelete = async (userId) => {
    try {
      await deleteCustomer(userId);
      refetch();
      toast.success("Customer deleted successfully");
    } catch (error) {
      console.error("Error deleting manager:", error);
      toast.error("Error deleting manager:", error.message);
    }
  };

  const refetchAgain = () => {
    refetch()
  }

  const data = [
    { email: 'test@gmail.com', createdAt:"2024-02-29T05:33:26.267+00:00", action: 'text' },
    { email: 'test@gmail.com', createdAt:"2024-02-29T05:33:26.267+00:00", action: 'text' },
    { email: 'test@gmail.com', createdAt:"2024-02-29T05:33:26.267+00:00", action: 'text' },
    { email: 'test@gmail.com', createdAt:"2024-02-29T05:33:26.267+00:00", action: 'text' },
    { email: 'test@gmail.com', createdAt:"2024-02-29T05:33:26.267+00:00", action: 'text' },
    // Add more data objects here
  ];

  useEffect(() => {
    // Refetch data when showEdit changes
    if (showEdit) {
      refetch();
    }
  }, [showEdit, refetch]);

  return (
    <>
       <div className='row'>
    <div className='col-md-3'>
    <Sidebar />
    </div>
    <div className='col-md-9'>
      <Home />
    </div>
    </div>

      {/* Modal */}
      <AdminModal
      show={show}
          handleClose={handleClose}
          title="Add Customer"
          isManager={false}
          refetchAgain={refetchAgain}
       />
      <AdminModal
      show={showEdit}
          handleClose={handleCloseEdit}
          title="Edit Customer"
          isManager={false}
          data={editData}
          refetchAgain={refetchAgain}
       />
      {/* End Modal */}
    </>
  );
};

export default Customer;
