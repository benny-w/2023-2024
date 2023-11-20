import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'

export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return {
    req,
    res,
  }
}
type Context = inferAsyncReturnType<typeof createContext>
const t = initTRPC.context<Context>().create()
const isAuthenticated = t.middleware(async ({ next, ctx }) => {
  // Check authentication
  const isLoggedIn = true

  if (isLoggedIn) {
    return next({
      ctx: {
        ...ctx,
        user: {
          isLoggedIn: isLoggedIn,
        },
      },
    })
  } else {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Not authorized' })
  }
})
export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuthenticated)
