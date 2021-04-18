import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
import cors from '@koa/cors'

import { getWeekSchedule } from './api'

export * from './types/types'

const app = new Koa()
const router = new Router()

app.use(koaBody())
app.use(cors())

router.get('/', async (ctx, next) => {
  ctx.body = {
    message: 'OK',
  }

  return next()
})

router.get('/schedule', async (ctx, next) => {
  const week = ctx.request.query.week as string

  if (!week) {
    ctx.response.status = 400
    ctx.body = {
      message: 'Week param missing.',
    }
  } else {
    ctx.body = await getWeekSchedule(parseInt(week, 10))
  }

  return next()
})

app.use(router.routes())

export {
  app
}
