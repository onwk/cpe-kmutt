import { useState, useEffect, useContext } from "react";
import { ReactComponent as EditSvg } from "../../assets/icons/edit.svg";
import Select from "react-select";
import gql from "graphql-tag";
import { AuthContext } from "../../context/auth";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

function EditProject({
  setShowEditProjectModalFromParent,
  projectData,
  editProject,
  members,
}) {
  // currentUserId logged in
  const { user } = useContext(AuthContext);
  const currentUserId = user.sub;

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

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const [values, setValues] = useState(projectData);

  useEffect(() => {
    getUsers();
  }, []);

  const [selectedOption, setSelectedOption] = useState(
    members
      .map((item) => item.prop)
      .filter((item) => item.value !== currentUserId)
  );

  const [users, setUsers] = useState([]);

  const [errors, setErrors] = useState({});

  function handleMultiChange(option) {
    setSelectedOption(option);
  }
  // query all user in DB
  async function getUsers() {
    const userResponse = await client.query({
      query: gql`
        query users {
          users {
            userId
            email
          }
        }
      `,
    });
    const userOptions = userResponse.data.users.map((user) => {
      return {
        value: user.userId,
        label: user.email,
      };
    });

    const filteredOptions = userOptions.filter(
      (option) => option.value !== currentUserId
    );

    setUsers([...filteredOptions]);
  }
  // validation input data
  function ValidateCreateProjectInfo() {
    let errors = {};

    if (!values.projectName) {
      errors.projectName = "Please input project name";
    } else if (/[^a-zA-Z0-9\s]/.test(values.projectName)) {
      errors.projectName = "Plese input only characters or number";
    }

    if (!values.startDate) {
      errors.startDate = "Please input start date";
    } else if (/^\d{2}([./-])\d{2}\1\d{4}$/.test(values.startDate)) {
      errors.startDate = "Plese input only date format";
    }

    if (!values.dueDate) {
      errors.dueDate = "Please input due date";
    } else if (/^\d{2}([./-])\d{2}\1\d{4}$/.test(values.dueDate)) {
      errors.dueDate = "Plese input only date format";
    }

    if (!values.description) {
      errors.description = "Please input description";
    }
    setErrors(errors);
    return errors;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  async function onSubmit(event) {
    event.preventDefault();

    const members = [
      currentUserId.toString(),
      ...selectedOption.map((item) => {
        return item.value.toString();
      }),
    ];

    const errors = ValidateCreateProjectInfo();
    if (Object.keys(errors).length === 0) {
      const editedProject = {
        id: projectData.projectId,
        projectName: values.projectName,
        startDate: values.startDate,
        dueDate: values.dueDate,
        description: values.description,
        members: members,
      };
      editProject(editedProject);
    }
  }

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none z-40">
      <div className="CreateProject font-mono">
        <div className="absolute bg-black opacity-80 inset-0 z-0 "></div>
        <div className="w-screen  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white mt-0 ">
          <div className="">
            <div className="text-center p-5 flex-auto justify-center ">
              <EditSvg />
              <h2 className="text-xl font-bold py-4  ">Edit Project</h2>
              <div className="space-y-4">
                <form>
                  <label className="block text-gray-700 text-sm font-normal mb-2 text-left ">
                    Name Project
                  </label>
                  <input
                    style={errors.projectName ? { borderColor: "red" } : null}
                    type="text"
                    name="projectName"
                    placeholder="Name Project"
                    className="block text-sm py-3 px-4 rounded-lg w-full border outline-none border-gray-300"
                    value={values.projectName}
                    onChange={handleChange}
                  />
                  <small>
                    {errors.projectName && (
                      <div className="block text-red-400 text-sm font-normal mt-2 mb-2 text-left ">
                        {errors.projectName}
                      </div>
                    )}
                  </small>
                  <label className="block text-gray-700 text-sm font-normal mb-2 mt-2 text-left ">
                    Start Date
                  </label>
                  <input
                    style={errors.startDate ? { borderColor: "red" } : null}
                    type="date"
                    name="startDate"
                    placeholder="Start Date"
                    className="block text-sm py-3 px-4 rounded-lg w-full border outline-none border-gray-300 "
                    value={values.startDate}
                    onChange={handleChange}
                  />
                  <small>
                    {errors.startDate && (
                      <div className="block text-red-400 text-sm font-normal mt-2 mb-2 text-left ">
                        {errors.startDate}
                      </div>
                    )}
                  </small>
                  <label className="block text-gray-700 text-sm font-normal mb-2 mt-2 text-left ">
                    Due Date
                  </label>
                  <input
                    style={errors.dueDate ? { borderColor: "red" } : null}
                    type="date"
                    name="dueDate"
                    placeholder="Due Date"
                    className="block text-sm py-3 px-4 rounded-lg w-full border outline-none border-gray-300 "
                    value={values.dueDate}
                    onChange={handleChange}
                  />
                  <small>
                    {errors.dueDate && (
                      <div className="block text-red-400 text-sm font-normal mt-2 mb-2 text-left ">
                        {errors.dueDate}
                      </div>
                    )}
                  </small>
                  <label className="block text-gray-700 text-sm font-normal mb-2 mt-2 text-left ">
                    Description
                  </label>
                  <input
                    style={errors.description ? { borderColor: "red" } : null}
                    type="text"
                    name="description"
                    placeholder="Description"
                    className="block text-sm py-3 px-4 rounded-lg w-full border outline-none border-gray-300 "
                    value={values.description}
                    onChange={handleChange}
                  />
                  <small>
                    {errors.description && (
                      <div className="block text-red-400 text-sm font-normal mt-2 mb-2 text-left ">
                        {errors.description}
                      </div>
                    )}
                  </small>
                  <label className="block text-gray-700 text-sm font-normal mb-2 mt-2 text-left ">
                    Members
                  </label>
                  <Select
                    placeholder="Members"
                    style={
                      errors.members
                        ? { borderColor: "red" }
                        : { borderColor: "red" }
                    }
                    defaultValue={selectedOption}
                    onChange={handleMultiChange}
                    options={users}
                    isMulti={true}
                  />
                  <div className="p-3  mt-2 text-center space-x-4 md:block">
                    {/* Cancle Button */}
                    <button
                      className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100 "
                      onClick={() => setShowEditProjectModalFromParent(false)}
                    >
                      Cancel
                    </button>
                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="mb-2 md:mb-0 bg-yellow-400  border  px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-yellow-500"
                      onClick={onSubmit}
                    >
                      Edit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProject;
