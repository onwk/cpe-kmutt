import React from "react";
import useForm from "./useFormRegis";
import validate from "./validateInfo";

function Register({ submitForm }) {
    
    const { handleChange, handleSubmit, values, error } = useForm(
        submitForm,
        validate
      );

    return (
        <div className="bg-gray-50 min-w-full min-h-screen flex justify-center items-center px-10">
            <div className="flex items-center bg-gray-800 rounded-lg shadow-lg overflow-hidden m-8 w-full sm:max-w-md lg:max-w-5xl">
                <div className="w-full p-5 hidden lg:block lg:w-1/2 bg-cover">
                    <img
                        className="object-cover"
                        src="img/regis.gif"
                        alt="planning"
                    />
                </div>
                {/* Register Form */}
                <div className="w-full bg-white p-10 lg:w-1/2">
                    <h1 className="text-2xl font-bold text-center pb-8">Sign Up</h1>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="flex text-sm">
                            {/* First name Input */}
                            <div className="w-1/2 mr-5 space-y-2">
                                <label className="block text-base font-semibold">First name</label>
                                <div className="flex">
                                    <input type="text" name="firstName" id="firstName"
                                        className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-md block w-full appearance-none border-0 " required
                                        placeholder="John" value={values.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                {error.firstName && <div className="text-xs text-red-400 mb-0">{error.firstName}</div>}
                            </div>
                            {/* Last name Input */}
                            <div className="w-1/2 space-y-2">
                                <label className="block text-base font-semibold">Last name</label>
                                <div className="flex">
                                    <input type="text" name="lastName" id="lastName"
                                        className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-md block w-full appearance-none border-0 " required
                                        placeholder="Smith" value={values.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                                {error.lastName && <div className="text-xs text-red-400 mb-0">{error.lastName}</div>}
                            </div>
                        </div>
                        {/* E-mail Input */}
                        <div className="space-y-2 mt-6 text-sm">
                            <label className="block text-base font-semibold">E-mail</label>
                            <input type="email" name="email" id="email"
                                className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-md block w-full appearance-none border-0 " required
                                placeholder="myemail@example.com" value={values.email}
                                onChange={handleChange}
                            />
                            {error.email && <div className="text-xs text-red-400 mb-0">{error.email}</div>}
                        </div>
                        {/* Password Input */}
                        <div className="space-y-2 mt-6 text-sm">
                            <label className="block text-base font-semibold">Password</label>
                            <input type="password" name="password" id="password"
                                className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-md block w-full appearance-none border-0" required
                                placeholder="*****************" value={values.password}
                                onChange={handleChange}
                            />
                            {error.password && <div className="text-xs text-red-400 mb-0">{error.password}</div>}
                        </div>
                        {/* Comfirm password Input */}
                        <div className="space-y-2 mt-6 text-sm3">
                            <label className="block text-base font-semibold">Comfirm Password</label>
                            <input type="password" name="cfpassword" id="cfpassword"
                                className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-md block w-full appearance-none border-0 " required
                                placeholder="*****************" value={values.cfpassword}
                                onChange={handleChange}
                            />
                            {error.cfpassword && <div className="text-xs text-red-400 mb-0">{error.cfpassword}</div>}
                        </div>
                        {/* Sublit button */}
                        <button className="block w-full mt-9 p-3 text-center font-semibold rounded-md text-white bg-gray-800 hover:bg-gray-600" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;