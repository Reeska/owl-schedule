import * as functions from 'firebase-functions'
import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
import cors from '@koa/cors'

import { getWeekSchedule } from './api'

export * from './types/types'

const PORT = 5000

const app = new Koa()
const router = new Router()

app.use(koaBody())
app.use(cors())

router.get('/', async (ctx, next) => {
  ctx.body = {
    message: 'OK',
  }

  next()
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

  next()
})

app.use(router.routes())

// console.log(`Listen ${PORT}`);
// app.listen(PORT);

export const api = functions.https.onRequest(app.callback())
