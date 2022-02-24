import React, { useState, useEffect } from "react";
import { UPDATE_USER_INFO } from "../Graphql/mutation";
import { useMutation } from "@apollo/client";
import Swal from 'sweetalert2'
import axios from "axios";

function EditProfile({ infoUser, userId }) {

    // define value
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        job: '',
        department: '',
        organization: '',
        address: '',
        image: infoUser.image
    });

    useEffect(() => {
        if (infoUser) {
            setValues(infoUser);
        }
    }, [infoUser]);

    //handle values variable
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const [error, setErrors] = useState({});

    function validate(value) {
        let errors = {}

        //check all inputs is not null
        //check firstName is only String
        if (!value.firstName) {
            errors.firstName = "Please input your first name"
        } else if (/[^a-zA-Z\s]/.test(value.firstName)) {
            errors.firstName = "Plese input only characters"
        }

        //check firstName is only String
        if (!value.lastName) {
            errors.lastName = "Please input your last name"
        } else if (/[^a-zA-Z-\s]/.test(value.lastName)) {
            errors.lastName = "Plese input only characters"
        }

        return errors;
    }
    //For upload and show image
    const [selectedImage, setSelectedImage] = useState("https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg");
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            //convert image to link url
            setSelectedImage(URL.createObjectURL(e.target.files[0]));
        }
    };
    console.log(infoUser.image);
    console.log(selectedImage);
    //send user info to backend for change password
    const [updateUser] = useMutation(UPDATE_USER_INFO, {
        onCompleted(success) {
            if (success) {
                Swal.fire({
                    title: "Update profile success!",
                    html: "Press Ok ",
                    icon: "success",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didClose: () => {
                        window.location.replace("/profile");
                    },
                });
            }
        },
        onError(errors) {
            if (errors) {
                const err = errors.message;
                Swal.fire({
                    title: "Not success!",
                    html: err,
                    icon: "error",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                });
            }
        },
    });

    //Image variable
    const [pictureFile, setPictureFile] = useState("");

    //Handle submit form
    const handleSubmit = (event) => {
        event.preventDefault();

        setErrors(validate(values));

        if (pictureFile) {
            let formdata = new FormData();

            //Upload image convert to URL
            formdata.append("file", pictureFile, pictureFile.name);
            axios({
                url: "http://20.212.81.174/upload",
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: formdata,
            })
                .then((res) => {
                    console.log("Enter");
                    const url = "http://20.212.81.174/";
                    const picURL = url + res.data.imagePath
                    if (Object.keys(error).length === 0) {
                        const param = {
                            id: userId,
                            firstName: values.firstName,
                            lastName: values.lastName,
                            job: values.job,
                            department: values.department,
                            organization: values.organization,
                            address: values.address,
                            image: picURL
                        };
                        // console.log(param);
                        updateUser({
                            variables: { input: param }
                        });
                    }
                })
        }
        else{
            if (Object.keys(error).length === 0) {
                const param = {
                    id: userId,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    job: values.job,
                    department: values.department,
                    organization: values.organization,
                    address: values.address,
                    image: infoUser.image
                };
                // console.log(param);
                updateUser({
                    variables: { input: param }
                });
            }
        }

    };

    return (
        <div className="w-8/12 p-12 bg-white rounded-2xl">
            <h1 className="text-2xl font-bold text-center pb-8">Edit Profile</h1>
            <form onSubmit={handleSubmit} noValidate>
                <div className="image overflow-hidden text-center">
                    {/* Profile Image */}
                    <img className="h-auto w-3/12 mx-auto rounded-full"
                        src={selectedImage}
                        alt=""
                    />
                    <h1 className="text-center mt-3">
                        {/* Upload image */}
                        <label
                            htmlFor="img"
                            className="relative cursor-pointer font-semibold text-indigo-600 hover:text-indigo-400 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input id="img" name="img" accept="image/*" type="file" className="sr-only" 
                                onChange={(event) => {
                                    setPictureFile(event.target.files[0]);
                                    imageChange(event);
                                }} />
                        </label>
                    </h1>
                </div>
                {/* Edit user infomation */}
                <div className="flex text-sm mt-6">
                    <div className="w-1/2 mr-5 space-y-2">
                        <label className="block text-base font-semibold">First name</label>
                        <div className="flex">
                            <input type="text" name="firstName" id="firstName"
                                className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-md block w-full appearance-none border-0 " required
                                placeholder="John" value={values.firstName} onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="w-1/2 space-y-2">
                        <label className="block text-base font-semibold">Last name</label>
                        <div className="flex">
                            <input type="text" name="lastName" id="lastName"
                                className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-md block w-full appearance-none border-0 " required
                                placeholder="Smith" value={values.lastName} onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex text-sm mt-6">
                    <div className="w-1/2 mr-5 space-y-2">
                        <label className="block text-base font-semibold">Job Title</label>
                        <div className="flex">
                            <input type="text" name="job" id="job"
                                className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-md block w-full appearance-none border-0 "
                                placeholder="Software Engineer" value={values.job} onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="w-1/2 space-y-2">
                        <label className="block text-base font-semibold">Department</label>
                        <div className="flex">
                            <input type="text" name="department" id="department"
                                className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-md block w-full appearance-none border-0 "
                                placeholder="Your Department" value={values.department} onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex text-sm mt-6">
                    <div className="w-1/2 mr-5 space-y-2">
                        <label className="block text-base font-semibold">Organization</label>
                        <div className="flex">
                            <input type="text" name="organization" id="organization"
                                className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-md block w-full appearance-none border-0 "
                                placeholder="Your Organization" value={values.organization} onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="w-1/2 space-y-2">
                        <label className="block text-base font-semibold">Based In</label>
                        <div className="flex">
                            <input type="text" name="address" id="address"
                                className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-md block w-full appearance-none border-0 "
                                placeholder="Your Address" value={values.address} onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                {/* Submit button */}
                <button className="block w-full mt-7 p-2 text-center text-base font-medium rounded-full text-white bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-green-400 hover:to-blue-500" type="submit">Save</button>
            </form>
        </div>
    );
}

export default EditProfile;