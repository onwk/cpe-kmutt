import React from "react";
import { useState, useContext, useEffect } from "react";
import EditProfile from "../../components/editprofile";
import ChangePassword from "../../components/changepassword";
import { GET_USER_INFO } from "../../Graphql/query";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../../context/auth";

function ManageAccount() {
    const context = useContext(AuthContext);

    //call userId of current loged in
    const userId = Number(context.user.sub);

    //Query data
    const { data }= useQuery(GET_USER_INFO,{
        variables:{ input: userId }
    });

    const [user, setUser] = useState({});

    //set user varaible to be query data
    useEffect(() => {
        if(data){
            setUser(data.user);
        }
    }, [data]);

    // control section (control side bar)
    const [section, setSection] = useState("PROFILE");
    function handleProfileSection() {
        setSection("PROFILE");
    }
    function handlePasswordSection() {
        setSection("PASSWORD");
    }

    return (
        <div className="parent md:h-screen md:grid md:grid-cols-11">
            {/* ---------------------- Side bar ------------------------ */}
                <section className="sidebar md:col-span-2 p-5 space-y-6 pt-10 text-sm" style={{ backgroundColor: "#25273A" }}>
                    <button className="block w-full  p-2 text-center font-semibold rounded-full text-white hover:bg-yellow-200 hover:text-gray-700" onClick={handleProfileSection}>Edit Profile</button>
                    <button className="block w-full  p-2 text-center font-semibold rounded-full text-white hover:bg-yellow-200 hover:text-gray-700" onClick={handlePasswordSection}>Change Password</button>
                </section>
            {/* -------------------- End Side bar ---------------------- */}

            {/* -------------------- Main section ---------------------- */}
                <main className="main md:col-span-9 p-8 flex justify-center" style={{ backgroundColor: "#E6E6E6" }}>
                    { section === "PROFILE" ? <EditProfile infoUser={ user } userId = { userId }  /> : <ChangePassword ID= { userId } />}
                </main>
            {/* ------------------ End Main section -------------------- */}
        </div>
    );
}

export default ManageAccount;