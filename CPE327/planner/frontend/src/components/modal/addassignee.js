import { ReactComponent as MemberSvg } from "../../assets/icons/member.svg";
import Select from "react-select";
import React, { useState } from "react";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

function AddAssignee({
  setShowAddAssigneeModalFromParent,
  members,
  assignMember,
  addAssignee,
  taskId,
}) {
  const httpLink = createHttpLink({
    uri: "http://localhost:5000/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("jwtToken");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const [selectedOption, setSelectedOption] = useState([]);

  function handleMultiChange(option) {
    setSelectedOption(option);
  }

  async function onSubmit() {
    const editedTask = {
      taskId: taskId,
      userId: selectedOption.map((member) => member.value),
    };
    return addAssignee(editedTask);
  }
  return (
    <>
      <div className="opacity-80 fixed inset-0 z-40 bg-black "></div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="w-screen  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white mt-0 font-mono">
            <div className="">
              <div className="text-center p-5 flex-auto justify-center">
                <MemberSvg />
                <h2 className="text-xl font-bold py-4 ">Add Members</h2>
              </div>
              <div className="space-y-4 ">
                <label className="block text-gray-700 text-sm font-normal mb-2 ">
                  Email
                </label>

                <Select
                  placeholder="Members"
                  defaultValue={selectedOption}
                  onChange={handleMultiChange}
                  options={members
                    .filter(
                      (allMemberItem) =>
                        assignMember.filter((oldMember) => {
                          return (
                            allMemberItem.prop.value === oldMember.prop.value
                          );
                        }).length === 0
                    )
                    .map((member) => member.prop)}
                  isMulti={true}
                />
              </div>
              {/* Cancle Button */}
              <div className="p-3  mt-2 text-center space-x-4 md:block">
                <button
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                  onClick={() => setShowAddAssigneeModalFromParent(false)}
                >
                  Cancel
                </button>
                {/* Submit Button */}
                <button
                  className="mb-2 md:mb-0 bg-blue-400  px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-500"
                  onClick={() => {
                    if (onSubmit()) {
                      setShowAddAssigneeModalFromParent(false);
                    }
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAssignee;
