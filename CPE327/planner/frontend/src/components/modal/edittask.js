import { useState, useEffect, useContext } from "react";
import { ReactComponent as EditSvg } from "../../assets/icons/edit.svg";
import Select from "react-select";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// //! Set to query data

function EditTask({
  setShowEditTaskModalFromParent,
  taskData,
  editTask,
  assignMember,
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

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const [values, setValues] = useState(taskData);

  const [selectedOption, setSelectedOption] = useState(
    assignMember.map((item) => item.prop)
  );

  const [errors, setErrors] = useState({});

  function handleMultiChange(option) {
    setSelectedOption(option);
  }

  // validation input data
  function ValidateCreateTaskInfo() {
    let errors = {};

    if (!values.taskName) {
      errors.taskName = "Please input Task name";
    } else if (/[^a-zA-Z0-9\s]/.test(values.taskName)) {
      errors.taskName = "Plese input only characters or number";
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

  async function onSubmit() {
    const members = [
      ...selectedOption.map((item) => {
        return item.value;
      }),
    ];

    const errors = ValidateCreateTaskInfo();
    if (Object.keys(errors).length === 0) {
      const editedTask = {
        id: taskData.taskId,
        taskName: values.taskName,
        startDate: values.startDate,
        dueDate: values.dueDate,
        description: values.description,
        userId: members,
      };
      return editTask(editedTask);
    }
    return false;
  }

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none z-50">
      <div className="CreateProject font-mono">
        <div className="absolute bg-black opacity-80 inset-0"></div>
        <div className="w-screen  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white mt-0">
          <div className="">
            <div className="text-center p-5 flex-auto justify-center ">
              <EditSvg />
              <h2 className="text-xl font-bold py-4  ">Edit Task</h2>
              <div className="space-y-4">
                <form>
                  <label className="block text-gray-700 text-sm font-normal mb-2 text-left ">
                    Name Tasak
                  </label>
                  <input
                    style={errors.taskName ? { borderColor: "red" } : null}
                    type="text"
                    name="taskName"
                    placeholder="Name Task"
                    className="block text-sm py-3 px-4 rounded-lg w-full border outline-none border-gray-300"
                    value={values.taskName}
                    onChange={handleChange}
                  />
                  <small>
                    {errors.taskName && (
                      <div className="block text-red-400 text-sm font-normal mt-2 mb-2 text-left ">
                        {errors.taskName}
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
                    Assignee
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
                    isMulti={true}
                  />
                  <div className="p-3  mt-2 text-center space-x-4 md:block">
                    {/* Cancle Button */}
                    <button
                      className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100 "
                      onClick={() => setShowEditTaskModalFromParent(false)}
                    >
                      Cancel
                    </button>
                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="mb-2 md:mb-0 bg-yellow-400  border  px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-yellow-500"
                      onClick={() => {
                        if (onSubmit()) {
                          setShowEditTaskModalFromParent(false);
                        }
                      }}
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

export default EditTask;
