import React from "react";

function UserInfo({ info }) {
    //element of user infomation
    const element = [
        {
            image: "https://img.icons8.com/material-outlined/24/606B7D/briefcase.png",
            title: "Your Job",
            infomation: info.job
        },
        {
            image: "https://img.icons8.com/material-outlined/24/606B7D/organization.png",
            title: "Your Department",
            infomation: info.department
        },
        {
            image: "https://img.icons8.com/material-outlined/24/606B7D/organization-chart-people.png",
            title: "Your Organization",
            infomation: info.organization
        },
        {
            image: "https://img.icons8.com/material-outlined/24/606B7D/marker.png",
            title: "Your Address",
            infomation: info.address
        },
    ]
    return (
        <div className="bg-white p-3 shadow-sm font-medium text-sm text-gray-600 rounded-2xl p-5">
            {/* About */}
            <div className="space-y-6">
                <p className="text-gray-700 font-semibold">ABOUT</p>
                {/* Show user infomation */}
                {element.map((element) => {
                    return (
                        <p className="flex">
                            <span className="ml-2">
                                <img src = {element.image} alt="" />
                            </span>
                            {element.infomation === "" ? <span className="ml-3 text-gray-400"> {element.title}</span> : <span className="ml-3"> {element.infomation}</span>}
                        </p>
                    );
                })}
            </div>
            {/* Contract */}
            <div className="mt-6 space-y-6">
                <p className="text-gray-700 font-semibold">CONTRACT</p>
                <p className="flex">
                    <span className="ml-2">
                        <img src="https://img.icons8.com/material-outlined/24/606B7D/new-post.png" alt="" />
                    </span>
                    {info.email === "" ? <span className="ml-3 text-gray-400"> myemail@example.com</span> : <span className="ml-3"> {info.email}</span>}
                </p>
            </div>
        </div>

    );
}

export default UserInfo;

