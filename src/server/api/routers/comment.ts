import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const commentRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ text: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.comment.create({ data: { text: input.text } });
    }),

  get: publicProcedure.query(async ({ ctx }) => {
    // return ctx.db.comment.findMany({ where: { parentId: null } });
    return ctx.db.comment.findMany({ include: { replies: true } });
  }),
  getRepliesByParentId: publicProcedure
    .input(z.object({ parentId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.comment.findMany({ where: { parentId: input.parentId } });
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.comment.delete({ where: { id: input.id } });
    }),

  createReply: publicProcedure
    .input(z.object({ text: z.string().min(1), parentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.comment.create({
        data: { text: input.text, parentId: input.parentId },
      });
    }),
});
