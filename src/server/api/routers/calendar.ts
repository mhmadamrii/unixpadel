import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const calendarRouter = createTRPCRouter({
  getCalendarEvents: publicProcedure.query(async ({ ctx }) => {
    const [sales, customers] = await Promise.all([
      ctx.db.sales.findMany(),
      ctx.db.customer.findMany(),
    ]);

    return {
      sales,
      customers,
    };
  }),

  createEvent: publicProcedure
    .input(
      z.object({
        sales_name: z.string().min(1),
        customer_name: z.string().min(1),
        date_event: z.coerce.date(),
        type_event: z.string(),
        note: z.string(),
        amount: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.event.create({
        data: {
          sales: input.sales_name,
          customer: input.customer_name,
          date: input.date_event,
          type: input.type_event,
          note: input.note,
          amount: input.amount,
          salesId: input.sales_name,
        },
      });
    }),
});
