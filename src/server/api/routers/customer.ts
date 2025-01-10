import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const customerRouter = createTRPCRouter({
  getCustomers: publicProcedure.query(({ ctx }) => {
    return ctx.db.customer.findMany();
  }),

  getCustomerById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.customer.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  createCustomer: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        company: z.string().min(1),
        isActive: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.customer.create({
        data: {
          name: input.name,
          company: input.company,
          email: input.email,
          isActive: input.isActive,
        },
      });
    }),

  updateCustomer: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        email: z.string().email(),
        company: z.string().min(1),
        isActive: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.customer.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          company: input.company,
          email: input.email,
          isActive: input.isActive,
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
