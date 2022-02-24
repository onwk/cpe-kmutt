import { Link, useParams } from "react-router-dom";
import TaskItem from "../../components/taskitem";
import CreateTasks from "../../components/modal/createtask";
import gql from "graphql-tag";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

function Tasks() {
  // current userId logged in
  const { user } = useContext(AuthContext);
  const onwerId = user.sub;

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

  const params = useParams();

  // Check value of Object
  let projectId = params?.projectId;

  const [showCreateTaskModal, setShowCreateTaskModal] = React.useState(false);
  const [task, setTask] = useState([]);
  const [projectName, setProjectName] = useState("");

  function changeStateModalFromChild(state) {
    setShowCreateTaskModal(state);
  }
  // query task informations
  async function getMyTasks() {
    setTask([]);
    const { data } = await client.query({
      query: gql`
        query project {
          project(id: ${projectId}) {
            projectName
            task {
              taskId
              taskName
              startDate
              dueDate
              taskStatusId{
                taskStatusId
              }
              onwerId
              description
              assign {
                id 
              }
            }
          }
        }
      `,
    });
    if (data) {
      await setProjectName(data.project.projectName);
      await setTask([...data.project.task, ...task]);
    }
  }
  // function add task
  async function addTask(
    projectId,
    taskName,
    startDate,
    dueDate,
    description,
    userId
  ) {
    const taskStatus = 1; // to do
    const newTask = {
      projectId,
      taskName,
      startDate: new Date(startDate),
      dueDate: new Date(dueDate),
      description,
      taskStatus,
      userId,
      onwerId,
    };
    const { data } = await client.mutate({
      mutation: gql`
        mutation createTask($createTaskInput: CreateTaskInput!) {
          createTask(createTaskInput: $createTaskInput) {
            project {
              projectName
            }
            taskId
            taskName
            startDate
            dueDate
            taskStatusId {
              taskStatusId
            }
            description
            assign {
              id
            }
          }
        }
      `,
      variables: { createTaskInput: newTask },
    });
    if (data?.createTask) {
      setTask([data.createTask, ...task]);
      setShowCreateTaskModal(false);
    }
  }
  // function edit task
  async function editTask(newData) {
    const { data } = await client.mutate({
      mutation: gql`
        mutation updateTask($updateTaskInput: UpdateTaskInput!) {
          updateTask(updateTaskInput: $updateTaskInput) {
            taskId
            taskName
            taskStatusId {
              taskStatusId
            }
            description
            startDate
            dueDate
            assign {
              id
            }
          }
        }
      `,
      variables: { updateTaskInput: newData },
    });
    if (data?.updateTask) {
      setTask([]);
      setTask([
        data.updateTask,
        ...task.filter((task) => task.taskId !== newData.id),
      ]);
      return true;
    }
    return false;
  }
  // function delete task
  async function deleteTask(target) {
    const { data } = await client.mutate({
      mutation: gql`
        mutation removeTask($id: Int!) {
          removeTask(id: $id)
        }
      `,
      variables: { id: target },
    });
    if (data.removeTask === "Delete Success") {
      setTask(task.filter((task) => task.taskId !== target));
      return true;
    }
    return false;
  }
  // function add assignee in task
  async function addAssignee(newData) {
    const { data } = await client.mutate({
      mutation: gql`
        mutation newTaskMember($taskMember: CreateAssignInput!) {
          newTaskMember(taskMember: $taskMember) {
            task {
              taskId
              taskName
              taskStatusId {
                taskStatusId
              }
              description
              startDate
              dueDate
              assign {
                id
              }
            }
          }
        }
      `,
      variables: { taskMember: newData },
    });
    if (data?.newTaskMember) {
      setTask([]);
      setTask([
        data.newTaskMember[0].task,
        ...task.filter((task) => task.taskId !== newData.taskId),
      ]);
      return true;
    }
    return false;
  }
  // use funcction
  useEffect(() => {
    getMyTasks();
  }, []);

  return (
    <>
      {/* title */}
      <div className="MyProjects font-bold md:container md:mx-auto  font-mono ">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1 flex flex-row ">
            <h3 className="font-semibold text-base px-4 ">
              <Link to="/myprojects">My Projects</Link>
            </h3>
            <h3 className="font-semibold text-base ">/ Tasks</h3>
          </div>
          <div className="relative w-full px-4 max-w-3 flex-grow flex-1 text-right">
            <button
              className="bg-gray-800  text-white hover:shadow-lg rounded-full  text-xs font-bold uppercase px-4 py-2 rounded outline-none focus:outline-none mr-3 mb-1 ease-linear"
              type="button"
              onClick={() => setShowCreateTaskModal(true)}
            >
              CREATE TASKS +
            </button>
          </div>
        </div>

        <div className="Titletasks font-mono font-bold px-4">
          <div className="flex flex-col mb-6">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 mt-6">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-x divide-gray-500 divide-opacity-50 divide-dashed">
                    <thead className="bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-32 py-3 text-center text-xs font-medium text-white font-bold uppercase tracking-wider"
                        >
                          To do
                        </th>

                        <th
                          scope="col"
                          className="px-32 py-3 text-center text-xs font-medium text-white font-bold uppercase tracking-wider"
                        >
                          In Progress
                        </th>
                        <th
                          scope="col"
                          className="px-32 py-3  text-center text-xs font-medium text-white font-bold uppercase tracking-wider"
                        >
                          Success
                        </th>
                      </tr>
                    </thead>
                    {/* content */}
                    <tr>
                      <td>
                        {task
                          .filter(
                            (task) => task.taskStatusId.taskStatusId === 1
                          )
                          .map((data) => {
                            return (
                              <TaskItem
                                taskData={data}
                                deleteTask={deleteTask}
                                editTask={editTask}
                                addTask={addTask}
                                projectId={projectId}
                                addAssignee={addAssignee}
                              />
                            );
                          })}
                      </td>
                      <td>
                        {task
                          .filter(
                            (task) => task.taskStatusId.taskStatusId === 2
                          )
                          .map((data) => {
                            return (
                              <TaskItem
                                taskData={data}
                                deleteTask={deleteTask}
                                editTask={editTask}
                                addTask={addTask}
                                projectId={projectId}
                                addAssignee={addAssignee}
                              />
                            );
                          })}
                      </td>
                      <td>
                        {task
                          .filter(
                            (task) => task.taskStatusId.taskStatusId === 3
                          )
                          .map((data) => {
                            return (
                              <TaskItem
                                taskData={data}
                                deleteTask={deleteTask}
                                editTask={editTask}
                                addTask={addTask}
                                projectId={projectId}
                                addAssignee={addAssignee}
                              />
                            );
                          })}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal  */}
      {showCreateTaskModal ? (
        <>
          <CreateTasks
            setShowCreateTaskModalFromParent={changeStateModalFromChild}
            addTask={addTask}
            projectId={projectId}
          />
        </>
      ) : null}
    </>
  );
}

export default Tasks;
