import * as trpcExpress from '@trpc/server/adapters/express'
import dotenv from 'dotenv'
import express from 'express'
import { expressHandler } from 'trpc-playground/handlers/express'

import { appRouter } from '../trpc/router'
import { createContext } from '../trpc/trpc'

dotenv.config()

const app = express()
app.use(express.json())

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
)

expressHandler({
  trpcApiEndpoint: '/trpc',
  playgroundEndpoint: '/trpc-playground',
  router: appRouter,
}).then((handeler: any) => {
  app.use(handeler)
})

app.listen(3001, () => {})

export default app
