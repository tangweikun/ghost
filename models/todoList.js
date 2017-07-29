import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TodoListSchema = new Schema({
  createdAt: Date,
  updatedAt: Date,
  task: String,
  isDelete: Boolean,
  isCompleted: Boolean,
})

const TodoListModel = mongoose.model('todoLists', TodoListSchema)

export default TodoListModel
