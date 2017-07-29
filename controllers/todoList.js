import TodoListModel from '../models/todoList'

export function insertTask(ctx) {
  const { task } = ctx.request.body
  TodoListModel({
    task,
    isDelete: false,
    isCompleted: false,
    createdAt: new Date(),
  }).save()
  ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`
}
