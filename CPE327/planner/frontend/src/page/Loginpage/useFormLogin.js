import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import Swal from 'sweetalert2'
import { LOGIN_USER } from "../../Graphql/mutation";
import { AuthContext } from "../../context/auth";

//Function for login
const UseForm = (callback, validate) => {
    const context = useContext(AuthContext);

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [error, setErrors] = useState({});

    //handle values variable
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    //send login input to backend
    const [login] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData);
            Swal.fire({
                title: "Log in success!",
                html: "Press Ok to your project",
                icon: "success",
                allowOutsideClick: false,
                allowEscapeKey: false,
                didClose: () => {
                    window.location.replace("/myprojects");
                },
            });
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
            console.log("error");
        }
    });


    //Handle submit form
    const handleSubmit = (event) => {
        event.preventDefault();
        
        //validate form to find error
        setErrors(validate(values));

        //if no errors go to login function
        if (Object.keys(error).length === 0) {
            console.log('hello');
            const param = {
                email: values.email,
                password: values.password
            };
            console.log(param);
            login({
                variables: { input: param }
            });
        }
    };

    return { handleChange, values, handleSubmit, error };
}

export default UseForm;