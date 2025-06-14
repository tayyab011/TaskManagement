
import { taskModel } from "../models/taskModel.js";

export const createTask =async(req,res)=>{
try {
    const reqBody = req.body;
    reqBody.email = req.headers.email;
 const data=  await taskModel.create(reqBody);
    res.status(200).json({
      success: true,
      reqBody,
      message: "task created successfull",
    });
} catch (error) {
    res.status(400).json({
      success: false,
      message: "task created failed",
      error:error.toString()
    });
}
}

export const deleteTask =async(req,res)=>{
    try {
        const id = req.params.id;

      await taskModel.deleteOne({ _id: id });
        res.status(200).json({
          success: true,
          message: "task delete successfull",
        });
    } catch (error) {
        res.status(400).json({
          success: false,
          message: "task delete failed",
          error:error.toString()
        });
    }
    }
export const updateTask =async(req,res)=>{
    try {
        const id = req.params.id;
      const reqbody =req.body
    const task=  await taskModel.updateOne({_id:id},reqbody);
        res.status(200).json({
          success: true,
          message: "task update successfull",
        });
        
    } catch (error) {
        res.status(400).json({
          success: false,
          message: "task update failed",
          error:error.toString()
        });
    }
    }

export const listStatusTask =async(req,res)=>{
    try {
        const status = req.params.status;
       const email = req.headers.email;
       
     /*  await taskModel.aggrigate([{ $match: { email, status } }]); */
      const tasks = await taskModel.aggregate([
        { $match: { email: email, status:status } },
      ]); 
     
        res.status(200).json({
          success: true,
          tasks,
          message: "task list successfull",
        });
    } catch (error) {
        res.status(400).json({
          success: false,
          message: "task list failed",
          error: error.toString(),
        });
    }
    }

export const taskStatusCount = async (req, res) => {
  try {
    const email = req.headers.email;

    
    const data = await taskModel.aggregate([
      { $match: { email: email} },
      {$group:{_id:"$status",sum:{$count:{}}}}
    ]);

    res.status(200).json({
      success: true,
      data,
      message: "task list successfull",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "task list failed",
      error: error.toString(),
    });
  }
};