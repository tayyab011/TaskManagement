import Swal from "sweetalert2"
import { deleteApi, TaskListByStatusApi } from "../apiRequest/api";

// In DeleteAlert.js
export const deleteAlert = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteResult = await deleteApi(id);
        if (deleteResult) {
          Swal.fire("Deleted!", "Your task has been deleted.", "success");
          // You might want to refresh the task list here
          await TaskListByStatusApi(); // Add this import at the top
         setTimeout(()=>{
            window.location.reload();
        },1500) 
        } else {
          Swal.fire("Error!", "Failed to delete task.", "error");
        }
      }
    });
  };
/* Swal.fire({
  title: "Deleted!",
  text: "Your file has been deleted.",
  icon: "success",
}); */