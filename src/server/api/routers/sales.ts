import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const salesRouter = createTRPCRouter({
  getCustomers: publicProcedure.query(({ ctx }) => {
    return ctx.db.customer.findMany();
  }),

  createSales: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        target: z.number().min(100).max(10000),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.sales.create({
        data: {
          name: input.name,
          email: input.email,
          target: input.target,
        },
      });
    }),

  deleteCustomer: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.customer.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
