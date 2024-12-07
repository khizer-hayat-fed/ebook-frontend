import React, { useRef, useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useAddManagerMutation, useUpdateManagerMutation  } from '../store/adminsSlice';

const AdminModal = ({ show, handleClose, title, data, isManager, refetchAgain }) => {
    const id = useSelector(state => state?.user?.userInfo?._id)
    const [form, setForm] = React.useState({
        email: '',
        type: isManager ? 'manager' : 'customer',
        password: '',
        confirmPassword: '',
    })

    const [addManager, { isLoading }] = useAddManagerMutation();
    const [updateManager, { isLoading: isUpdating }] = useUpdateManagerMutation();

    const handleSave = async () => {
        try {
            const { email, type, password, confirmPassword } = form;
            if (password !== confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }
            if (data) {
                await updateManager({ email, userId: data._id });
                toast.success("Manager updated successfully");
            } else {
                await addManager({ email, password, type });
                toast.success("Manager added successfully");
            }
            refetchAgain();
            handleClose();
        } catch (error) {
            toast.error("Failed to save manager");
            console.error("Error saving manager:", error);
        }
    }

      useEffect(()=>{
        if(data){
          setForm({
            email: data?.email || ""
          })
        }
      },[data])

    return (
        <div>
            {/* Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {data ? (
                        <>
                            <h5 className="text-start mt-2" htmlFor="email">
                                Email address
                            </h5>
                            <div className="form" bis_skin_checked={1}>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="name@example.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <h5 className="text-start mt-2" htmlFor="email">
                                Email address
                            </h5>
                            <div className="form" bis_skin_checked={1}>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="name@example.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group" bis_skin_checked={1}>
                                <h5 className="text-start mt-2" htmlFor="position">
                                    Select position
                                </h5>
                                <select
                                    className="form-control"
                                    id="type"
                                    value={form.type}
                                >
                                    <option value="">Select position</option>
                                    <option value="manager">Manager</option>
                                    <option value="customer">Customer</option>
                                </select>
                            </div>

                            <h5 className="text-start mt-2" htmlFor="password">
                                Password
                            </h5>
                            <div className="form" bis_skin_checked={1}>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                />
                            </div>

                            <h5 className="text-start mt-2" htmlFor="confirmPassword">
                                Confirm Password
                            </h5>
                            <div className="form" bis_skin_checked={1}>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm Password"
                                    value={form.confirmPassword}
                                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                />
                            </div>
                        </>
                    )}

                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className='btn btn-secondary' onClick={handleClose}>
                        Close
                    </button>
                    <button disabled={isLoading || isUpdating} type="button" className='btn btn-primary' onClick={handleSave}>
                    {isLoading || isUpdating ? 'Saving...' : 'Save Changes'}
                    </button>
                </Modal.Footer>
            </Modal>
            {/* End Modal */}
        </div>
    )
}

export default AdminModal
