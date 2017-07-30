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

// await smsModel.findByIdAndUpdate(newSms._id, {
//     $set: {
//       error_response
//     }
//   })

export async function updateTask(ctx) {
  const { id, isCompleted } = ctx.request.body
  await TodoListModel.findOneAndUpdate({ _id: id }, { $set: { isCompleted } })
  ctx.body = 'TODO'

  // await TodoListModel.findOneAndRemove({ _id })

  // TodoListModel.findById(_id, (err, doc) => {
  //   if (err) console.log(err)
  //   console.log('---->>>', doc)
  // })
  // TodoListModel.update({ task: 'qqqqq' }, { $set: { task: '000' } })
  // TodoListModel.update(
  //   { _id },
  //   {
  //     $set: {
  //       isCompleted: true,
  //     },
  //   },
  // )
}
