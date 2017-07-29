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

export async function findTasks(ctx) {
  await TodoListModel.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .exec((err, tasks) => {
      if (err) {
        console.log(err)
      } else {
        ctx.body = tasks
      }
    })
}
