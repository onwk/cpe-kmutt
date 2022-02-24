import React, {useContext} from "react";
import "../../components/base.css";
import "../../App.css";
import { AuthContext } from '../../context/auth'

//Home Page
function Home() {

  //define user to check loged in
  const { user }  = useContext(AuthContext);
  
  //define path of get start button
  const path = user? (
    "/myprojects"
  ):(
    "/login"
  );

  return (
    <div className="App">
      <div className="pdbase">
        <div className="grid lg:grid-cols-2 2xl:grid-cols-5 py-16">
          <div className="py-12 max-w-md mx-auto sm:max-w-xl lg:py-24 lg:max-w-full xl:mr-0 2xl:col-span-2">
            <div className="pl-7 xl:max-w-xl">
              {/* Image */}
              <img
                className="mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover object-center lg:hidden"
                src="img/home.gif"
                alt="planning"
              />
              {/* Text */}
              <h1 className="mt-6 text-2xl font-headline tracking-tight font-bold text-base sm:mt-8 sm:text-2xl lg:text-4xl xl:text-5xl">
                The best software
                <br className="hidden lg:inline" />{" "}
                <span className="text-brand">development tool</span>
                <br className="hidden lg:inline" />{" "}
                <span className="text-brand">used by agile teams</span>
              </h1>
              <p className="mt-2 text-gray-600 sm:mt-4 sm:text-xl sm:pt-3 lg:pt-6">
                Chigyo Soy Milk software is built for every member of your
                software team to plan
              </p>
              {/* Button to move path */}
              <div className="mt-4 space-x-1 sm:mt-6 sm:pt-3 lg:pt-8 font-base">
                <a
                  className="py-4 px-6 bg-blue-600 hover:bg-blue-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  href={path}
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
          {/* Responsive */}
          <div className="hidden relative lg:block 2xl:col-span-3">
            <img
              className="absolute inset-0 w-full h-full object-cover object-right"
              src="img/home.gif"
              alt="Planning"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
