import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const dashboardRouter = createTRPCRouter({
  getDashboardData: publicProcedure.query(async ({ ctx }) => {
    // Fetch customer list: name, company, isActive
    const customers = await ctx.db.customer.findMany({
      select: {
        id: true,
        name: true,
        company: true,
        isActive: true,
      },
    });

    // Fetch recent activities from Event
    const recentActivities = await ctx.db.event.findMany({
      take: 10, // Limit to the 10 most recent events
      orderBy: {
        date: "desc",
      },
      select: {
        id: true,
        sales: true,
        customer: true,
        date: true,
        type: true,
        note: true,
        amount: true,
        createdAt: true,
      },
    });

    // Fetch sales performance
    const salesPerformance = await ctx.db.sales.findMany({
      select: {
        name: true,
        target: true,
        events: {
          select: {
            amount: true,
          },
        },
      },
    });

    // Calculate performance for each salesperson
    const sales = salesPerformance.map((sale) => {
      const totalAmount = sale.events.reduce(
        (sum, event) => sum + (event.amount || 0),
        0,
      );
      const performance =
        sale.target > 0 ? (totalAmount / sale.target) * 100 : 0;

      return {
        name: sale.name,
        target: sale.target,
        totalAmount,
        performance: performance.toFixed(2) + "%",
      };
    });

    return {
      customers,
      recentActivities,
      sales,
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
        },
      });
    }),
});
