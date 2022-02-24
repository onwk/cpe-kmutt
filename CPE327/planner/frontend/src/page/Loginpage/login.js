import React from "react";
import validate from "./validateLogin";
import useForm from "./useFormLogin";

function Login({ submitForm }) {

    const { handleChange, handleSubmit, values, error } = useForm(
        submitForm,
        validate
      );

    return (
        <div className="bg-gray-50 min-w-full min-h-screen flex items-center justify-center px-10 py-10">
            <div className="flex items-center bg-gray-800 rounded-lg shadow-lg overflow-hidden m-11 w-full sm:max-w-md lg:max-w-4xl">
                {/* Right Side with image */}
                <div className="w-full min-h-full hidden lg:block lg:w-1/2">
                    <img
                        className="object-cover object-center"
                        src="img/login.gif"
                        alt="planning"
                    />
                </div>
                {/* Left Side with form for login */}
                <div className="w-full bg-white p-10 lg:w-1/2">
                    <h1 className="text-2xl font-bold text-center mt-7 pb-8">Login</h1>
                    <form onSubmit={handleSubmit} className="space-y-6 ng-untouched ng-pristine ng-valid" noValidate>
                        {/* Input E-mail */}
                        <div className="space-y-1 text-sm">
                            <label className="block text-base font-semibold">E-mail</label>
                            <input type="email" name="email" id="email" 
                                className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-md block w-full appearance-none border-0 " required 
                                placeholder="myemail@example.com" value={values.email}
                                onChange={handleChange}
                            />
                            {error.email && <div className="text-xs text-red-400 mb-0">{error.email}</div>}
                        </div>
                        {/* Input Password */}
                        <div className="space-y-1 text-sm">
                            <label className="block text-base font-semibold">Password</label>
                            <input type="password" name="password" id="password"
                                className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-md block w-full appearance-none border-0" required  
                                placeholder="*****************" value={values.password}
                                onChange={handleChange}
                            />
                            {error.password && <div className="text-xs text-red-400 mb-0">{error.password}</div>}
                        </div>
                        {/* Submit Button */}
                        <button className="block w-full p-3 text-center font-semibold rounded-md text-white bg-gray-800 hover:bg-gray-600" type="submit">Sign in</button>
                    </form>
                    {/* Link to register */}
                    <p className="text-xs text-center mt-5 mb-8 sm:px-6 text-gray-400">Don't have an account?
                        <a href="/regis" className="underline text-indigo-500 hover:text-indigo-700"> Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;