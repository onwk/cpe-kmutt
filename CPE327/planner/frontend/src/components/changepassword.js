import React,{ useState } from "react";
import { CHANGE_PASSWORD } from "../Graphql/mutation";
import { useMutation } from "@apollo/client";
import Swal from 'sweetalert2'

function ChangePassword({ ID }) {
    //set initial
    const [values, setValues] = useState({
        id: ID,
        oldPassword: '',
        password: '',
    });

    //handle values variable
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const [error, setErrors] = useState({});

    //validate form
    function validate(value) {
        let errors = {}

        //check all inputs is not null
        //check password must be 6 characters or more
        if (!values.oldPassword) {
            errors.oldPassword = 'Please input your password';
        } else if (values.oldPassword.length < 6) {
            errors.oldPassword = 'Password needs to be 6 characters or more';
        }

        //check password must be 6 characters or more
        if (!values.password) {
            errors.password = 'Please input your password';
        } else if (values.password.length < 6) {
            errors.password = 'Password needs to be 6 characters or more';
        }

        return errors;
    }

    //send user info to backend for change password
    const [updateUser] = useMutation(CHANGE_PASSWORD, {
        onCompleted(success) {
            if (success) {
                Swal.fire({
                    title: "Change password success!",
                    html: "Press Ok",
                    icon: "success",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didClose: () => {
                        window.location.replace("/manage_account");
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

    //Handle submit form
    const handleSubmit = (event) => {
        event.preventDefault();

        setErrors(validate(values));

        if (Object.keys(error).length === 0) {
            const param = {
                id: values.id,
                oldPassword: values.oldPassword,
                password: values.password,
            };
            console.log(param);
            updateUser({
                variables: { input: param }
            });
        }
    };

    // Input of change password form
    const passwordForm = {
        inputs: [
            {
                label: "Current Password",
                name: "oldPassword",
                type: "password",
                placeholder: "Enter current password",
                value: values.oldPassword
            },
            {
                label: "New Password",
                name: "password",
                type: "password",
                placeholder: "Enter new password",
                value: values.password
            },
        ],
    };
    return (
        <div className="w-8/12 p-20 bg-white rounded-2xl">
            <h1 className="text-2xl font-bold text-center pb-8">Change Password</h1>
            <form onSubmit={handleSubmit} noValidate>
                {passwordForm.inputs.map((input) => {
                    //Input in form
                    return (
                        <div className="space-y-2 mt-6 text-sm"> 
                            <label for={input.name} className="block text-base font-semibold">{input.label}</label>
                            <input type={input.type} name={input.name} id={input.name}
                                className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-md block w-full appearance-none border-0" required
                                placeholder={input.placeholder} value={input.value} onChange={handleChange}
                            />
                        </div>
                    );
                })}
                {/* Submit button */}
                <button className="block w-full mt-10 p-2 text-center text-base font-medium rounded-full text-white bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-green-400 hover:to-blue-500" type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default ChangePassword;