const express = require('express');
const router = express.Router();
const {addTodo,updateTodo,deleteTodo,getAllTodo} = require("../controllers/todo-controllers")
const authmiddleware = require('../middleware/auth-middleware');

router.post('/add-todo',authmiddleware,addTodo)
router.get('/get-all-todo',authmiddleware,getAllTodo)
router.delete('/delete-todo/:id',authmiddleware,deleteTodo)
router.put('/update-todo/:id',authmiddleware,updateTodo)

module.exports = router