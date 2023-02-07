let Task = require('../models/taskModel')
let User = require('../models/userModel')

async function createTask(req, res) {
    console.log("new task for user ", req.user._id)
    try{
        const newTask = await Task.create({task: req.body.task});
        const activeUser = await User.findOne({_id: req.user._id});

        activeUser.tasks.push(newTask._id);

        activeUser.save();
        res.status(200).json({
            success: true,
            task: newTask
        });
    }catch(error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
     }
         
};

function removeTask(req, res) {

    var completeTask = req.body._id;

    Task.deleteOne( {_id: completeTask}, function(error){
        if (error) console.log(error);
        res.status(200).json({
            success: true,
            message: `Task with id ${completeTask} was deleted`
        });
    });

    //TODO : WE SHOULD ALSO DELETE THE REF FROM USER TASKS ARRAY, ALTHOUGH MONGODB WILL NOT POPULATE IDs THAT DO NOT EXIST ANYWAY, SO IT ISN'T A PROBLEM
    
};

function deleteAll(req, res) {

};

function getTasks(req, res) {

    User.findOne({_id: req.user.id}).populate("tasks").exec(function (error, data) {
        if (error) {
            res.status(400).json({
                success: false,
                message: error
            });
        }
        res.status(200).json(data.tasks);
    });;

    // RETURN USER TASKS AS ABOVE INSTEAD OF ALL TASKS
    // Task.find().sort('task').limit(10)
    // .then(task => {
    //     res.status(200).json(task);
    //   })
    // .catch(error => {
    //     res.status(400).json({
    //         success: false,
    //         message: error.message
    //     });
    // });
};

module.exports = {getTasks, deleteAll, removeTask, createTask}