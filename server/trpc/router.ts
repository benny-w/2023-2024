import { publicProcedure, router } from './trpc'

export const appRouter = router({
  example: publicProcedure.query(() => {
    return { message: 'example response' }
  }),
})

export type AppRouter = typeof appRouter
