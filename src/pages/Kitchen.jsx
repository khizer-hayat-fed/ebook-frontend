import React, { useState, useEffect } from 'react';
import ModalTemplate from "../components/ModalTemplate"
import profile from '../Assets/profile.jpg';
import { useSelector } from 'react-redux';
import { useGetProductByUserIdQuery, useDeleteProductMutation } from '../store/productsSlice';
import { toast } from "react-toastify";
import { Sidebar, Home } from '../components/Kitchen';

const Kitchen = () => {
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const id = useSelector(state => state?.user?.userInfo?._id)

  const handleClose = () => setShow(false);
  const handleEditClose = () => setShowEdit(false);
  const handleShow = () => setShow(true);

  // Fetch products by user ID
  const { data: products, isLoading, isError, refetch } = useGetProductByUserIdQuery(id);
  // Mutation hook for deleting a product
  const [deleteProductMutation] = useDeleteProductMutation();

  const refetchAgain = () => {
    refetch({ force: true });
  }

  // Handle delete action
  const handleDelete = async (productId) => {
    try {
      await deleteProductMutation(productId);
      toast.success('Product has been deleted!');
      refetch({ force: true });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product. Please try again.');
    }
  }

  const handleEdit = (product) => {
    setEditData(product);
    setShowEdit(true);
  }

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div className='row'>
    <div className='col-md-3'>
    <Sidebar />
    </div>
    <div className='col-md-9'>

      {/* <div className="d-flex justify-content-end mt-5 mb-3">
        <button type="button" className='btn btn-info' onClick={handleShow}>Add Products</button>
      </div> */}

      <Home />
    </div>
    </div>
  )
}

export default Kitchen
