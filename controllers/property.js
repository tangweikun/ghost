import PropertyModel from '../models/property'

export async function findProperty(ctx) {
  await PropertyModel.find()
    .sort({ date: -1 })
    .limit(100)
    .exec((err, properties) => {
      if (err) {
        console.log(err)
      } else {
        ctx.body = properties
      }
    })
}

export function insertProperty(ctx) {
  const { date, income, outlay } = ctx.request.body
  PropertyModel({ date, income, outlay, createdAt: new Date() }).save()
  ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`
}
