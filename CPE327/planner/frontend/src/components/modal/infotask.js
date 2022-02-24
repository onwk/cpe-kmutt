function StatusTag({ status }) {
  if (status === 1) {
    return (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
        TO DO
      </span>
    );
  } else if (status === 2) {
    return (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
        IN PROGRESS 
      </span>
    );
  }
  else if (status === 3) {
    return (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        SUCESS
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

function InfoTask({setShowInfoTaskModalFromParent,taskData, assignMember}) {
  function dateTranform(date) {
    // check date not have date return "-"
    if (!date) {
      return "-";
    }
    const newDate = new Date(date).toString().split(" ");
    const completeDate = newDate[2] + " " + newDate[1] + " " + newDate[3];
    return completeDate;
  }
  return (
    <>
      <div className="opacity-80 fixed inset-0 z-40 bg-black "></div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="min-h-screen flex items-center justify-center px-4 ">
            <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl ">
              <div className="p-4 border-b">
                <h2 className="text-2xl "> Task Information</h2>
              </div>
              <div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600 mr-48">Task Name</p>
                  <p>{taskData.taskName}</p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600 mr-48">Date</p>
                  <p>{dateTranform(taskData.startDate)}</p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600 mr-48">Due Date</p>
                  <p>{dateTranform(taskData.dueDate)}</p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600 mr-48">Status</p>
                  <p>
                    <StatusTag status={taskData.taskStatusId.taskStatusId} />
                  </p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600 mr-48">Descriptions</p>
                  <p>{taskData.description}</p>
                </div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4">
                  <p className="text-gray-600">Members</p>
                  <p class="overflow-ellipsis overflow-hidden">
                    {assignMember.map((member, index) => {
                      if (index === assignMember.length - 1) {
                        return `${member.name}`;
                      }
                      return `${member.name} ,`;
                    })}
                  </p>
                </div>
                <div className="p-3  mt-2 text-center space-x-4 md:block">
                  {/* Close Button */}
                  <button className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100 "
                  onClick={() => setShowInfoTaskModalFromParent(false)}
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

export default InfoTask;
