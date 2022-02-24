import { ReactComponent as CompleteSvg } from "../../assets/icons/completeicon.svg";

function CompleteProject({
  setShowCompleteProjectModalFromParent,
  projectData,
  editProject,
}) {
  function computeData(projectData) {
    let projectStatusId = 2 // inprogress 
    const today = new Date()
    const dueDate = new Date(projectData.dueDate)
    if (today > dueDate) {
      projectStatusId = 3 // late
    }
    return {
      id: projectData.projectId,
      completeDate: today,
      projectStatusId 
    }
  }
  return (
    <>
      <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="w-screen  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white mt-0">
            <div className="">
              <div className="text-center p-5 flex-auto justify-center ">
                <CompleteSvg />
                <h2 className="text-xl font-bold py-4 ">Are you sure?</h2>
                <p className="text-sm text-gray-500 px-8">
                  Do you really want to complete project{" "}
                  <span style={{ color: "red" }}>
                    '{projectData.projectName}'
                  </span>{" "}
                  project? This process cannot be undone
                </p>
              </div>
               {/* Cancle Button */}
              <div className="p-3  mt-2 text-center space-x-4 md:block">
                <button
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                  onClick={() => setShowCompleteProjectModalFromParent(false)}
                >
                  Cancel
                </button>
                 {/* Submit Button */}
                <button
                  className="mb-2 md:mb-0 bg-green-400  border  px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500"
                  onClick={() => editProject(computeData(projectData))}
                >
                  complete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompleteProject;
