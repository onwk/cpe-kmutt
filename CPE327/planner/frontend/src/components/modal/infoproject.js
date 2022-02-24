import gql from "graphql-tag";
import React, { useState, useEffect } from "react";
import ApolloClient from "apollo-boost";

function StatusTag({ status }) {
  if (status === 1) { // in progress
    return (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
        In Progress
      </span>
    );
  } else if (status === 2) { // sucess
    return (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        Success
      </span>
    );
  } else if (status === 3) { // late
    return (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
        Late
      </span>
    );
  } else {
    return (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
        Error
      </span>
    );
  }
}
function InfoProject({ setShowInfoProjectModalFromParent, projectData }) {
  function dateTranform(date) {
    if (!date) {
      return "-";
    }
    const newDate = new Date(date).toString().split(" ");
    const completeDate = newDate[2] + " " + newDate[1] + " " + newDate[3];
    return completeDate;
  }

  const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
  });

  const [getMember, setData] = useState([]);

  async function getMembers(members) {
    setData([]);
    const { data } = await client.query({
      query: gql`
        query member($id: Int!) {
          member(id: $id) {
            user {
              firstName
            }
          }
        }
      `,
      variables: { id: members },
    });

    if (data.member.length !== 0) {
      const completeMembers = data.member.map((item) => {
        return item.user.firstName;
      });
      setData([...completeMembers]);
    }
  }
  useEffect(() => {
    getMembers(projectData.projectId);
  }, []);

  return (
    <>
      <div className="opacity-80 fixed inset-0 z-40 bg-black "></div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="min-h-screen flex items-center justify-center px-0 ">
            <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl ">
              <div className="p-4 border-b">
                <h2 className="text-2xl "> Project Information</h2>
              </div>
              <div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600 mr-48">Project Name</p>
                  <p>{projectData.projectName}</p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600  mr-48">Date</p>
                  <p> {dateTranform(projectData.startDate)}</p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600  mr-48">Due Date</p>
                  <p>{dateTranform(projectData.dueDate)}</p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600  mr-48">Status</p>
                  <p>
                    <StatusTag
                      status={projectData.projectStatus.projectStatusId}
                    />
                  </p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600  mr-48">Descriptions</p>
                  <p>{projectData.description}</p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4">
                  <p>Members</p>
                  <p class="overflow-ellipsis overflow-hidden">
                    {getMember.map((member, index) => {
                      if (index === getMember.length - 1) {
                        return `${member}`;
                      }
                      return `${member} ,`;
                    })}
                  </p>
                </div>
                <div className="p-3  mt-2 text-center space-x-4 md:block">
                  {/* close Button */}
                  <button
                    className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100 "
                    onClick={() => setShowInfoProjectModalFromParent(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoProject;
