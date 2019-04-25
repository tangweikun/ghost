const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoListSchema = new Schema({
  createdAt: Date,
  updatedAt: Date,
  task: String,
  isDeleted: Boolean,
  isCompleted: Boolean,
});

const TodoListModel = mongoose.model('todoLists', TodoListSchema);

export default TodoListModel;
