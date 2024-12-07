import React, { useState, useEffect, useRef } from 'react';
import profile from '../Assets/profile.jpg';
import { useGetUserProfileQuery, useUpdateUserMutation, useCreateProfileMutation, useDeleteProfileMutation } from "../store/profilesSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from "../store/usersSlice";
import { logout } from "../store/authSlice";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const id = useSelector(state => state?.user?.userInfo?._id)
    const emailUser = useSelector(state => state?.user?.userInfo?.email)
    const [email, setEmail] = useState(emailUser || "")
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        gender: '',
        address: '',
    });

    const { data, isLoading } = useGetUserProfileQuery(id)
    const [updateUser, { isLoading: updateLoading }] =
        useUpdateUserMutation();
    const [createProfile, { isLoading: createLoading, }] =
        useCreateProfileMutation();
    const [deleteProfile] = useDeleteProfileMutation()
    const [logoutApiCall] = useLogoutMutation();


    const handleImageUpload = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleUploadButtonClick = () => {
        // Trigger the hidden file input
        fileInputRef.current.click();
    };

    const handleSave = async () => {
        const dataToSend = { ...formData, photo: image, email, userId: id }
        data ? await updateUser(dataToSend) : await createProfile(dataToSend)

        toast.success('Data Saved')
    }

    const handleDelete = async() => {
        await deleteProfile(id)
        await logoutApiCall().unwrap();
        dispatch(logout());
        toast.success('User has been deleted!')
        navigate('/')
    }

    useEffect(() => {
        if (data) {
            setFormData({
                name: data?.data?.name || '',
                number: data?.data?.number || '',
                gender: data?.data?.gender || '',
                address: data?.data?.address || '',
            });

            setEmail(data?.data?.userId?.email || '')
        }
    }, [isLoading])

    return (
        <div className="row" style={{marginTop:'20vh'}}>
            {/* Left Side */}
            <div className='col-md-4'>
                <div className="border m-4">
                    {image || data?.data?.photo ? (
                        <img
                            src={
                                image ?
                                    URL.createObjectURL(image)
                                    : `http://localhost:5000/uploads/${data?.data?.photo}`
                            }
                            alt="UploadedImage"
                            className="mb-1"
                            width={180} height={180}
                        />
                    ) : (
                        <img
                            src={profile}
                            alt="Logo"
                            className="mb-1"
                            width={180} height={180}
                        />
                    )}
                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        id="imageInput"
                        name="photo"
                    />
                    <div>
                    <button type="button" className='btn btn-danger' style={{ marginRight: '20px', marginBottom: '20px' }} onClick={handleDelete}>Delete User</button>
                    <button type="button" className='btn btn-secondary' style={{ marginBottom: '20px' }} onClick={handleUploadButtonClick}>Edit Image</button>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className='col-md-6'>
                <div className="border m-4">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="text-start mt-2 m-2">
                                Name
                            </h5>
                            <div className="form m-2" bis_skin_checked={1}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="John Smith"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h5 className="text-start mt-2 m-2">
                                Email
                            </h5>
                            <div className="form m-2" bis_skin_checked={1}>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="none@exaple.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="text-start mt-2 m-2">
                                Contact
                            </h5>
                            <div className="form m-2" bis_skin_checked={1}>
                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="03000000000"
                                    value={formData.number}
                                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group m-2" bis_skin_checked={1}>
                                <h5 className="text-start mt-2" >
                                    Select Gender
                                </h5>
                                <select
                                    className="form-control"
                                    id="type"
                                    value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="text-start mt-2 m-2">
                                Address
                            </h5>
                            <div className="form m-2" bis_skin_checked={1}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Address here"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button disable={updateLoading || createLoading} type="button" className="btn btn-primary mb-2 m-2" onClick={handleSave}>{updateLoading || createLoading ? 'Loading...' : 'Save'}</button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Profile
