import { z } from "zod";
import {
  AnnotatedPdf,
  Highlight,
  CurriculumNode,
} from "@prisma/client";

import { db } from "@src/lib/db";
import { createTRPCRouter, publicProcedure } from "@src/server/api/trpc";
import { IHighlightSchema } from "@src/app/pdf/ui/types";

export type CurriculumNodeWithChildren =
  CurriculumNode & {
    children: CurriculumNode[];
  };

export type AnnotatedPdfWithRelations = AnnotatedPdf & {
  highlights: Highlight[] & {
    node?: CurriculumNodeWithChildren;
  };
};

export const annotatedPdfRouter = createTRPCRouter({
  // Create new highlight object if doesn't exist
  // Otherwise, update the highlight objects
  upsertAnnotatedPdf: publicProcedure
    .input(
      z.object({
        // todo: fix zod schema compatibility with complex prisma types
        highlights: z.array(IHighlightSchema),
        userId: z.string(),
        source: z.string(),
        id: z.string(), // mongo id is provided ahead of time for new documents
      }),
    )
    .mutation<AnnotatedPdf | null>(async ({ ctx, input }) => {
      let res: AnnotatedPdf;
      try {
        res = await db.annotatedPdf.upsert({
          where: {
            id: input.id,
          },
          update: {
            highlights: {
              create: input.highlights,
            },
          },
          create: {
            userId: input.userId,
            source: input.source,
            highlights: {
              create: input.highlights,
            },
          },
        });
      } catch (error) {
        console.error("Failed to upsert highlights:", error);
        return null;
      }
      return res;
    }),
  fetchAnnotatedPdf: publicProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        source: z.string().optional(),
      }),
    )
    .query<AnnotatedPdfWithRelations | null>(async ({ ctx, input }) => {
      const whereClause: Record<string, string> = {};
      if (input.userId) {
        whereClause["userId"] = input.userId;
      }
      if (input.source) {
        whereClause["source"] = input.source;
      }
      let result;

      // TODO: add bark for recursive tree structure quieries: https://prisma-extension-bark.gitbook.io/docs/getting-started
      try {
        result = await db.annotatedPdf.findFirst({
          where: whereClause,
          include: {
            highlights: {
              include: {
                node: {
                  include: {
                    children: true,
                  },
                },
              },
            },
          },
        });
        if (!result) {
          return null;
        }
      } catch (error) {
        console.error("Failed to fetch highlights:", error);
        return null;
      }
      console.log("Fetched single highlights:", result);
      return result;
    }),
  fetchAllAnnotatedPdfs: publicProcedure
    .input(
      z.object({
        source: z.string().optional(),
        userList: z.array(z.string()),
      }),
    )
    .query<AnnotatedPdfWithRelations[] | null>(async ({ ctx, input }) => {
      const whereClause: Record<string, any> = {};

      whereClause["userId"] = { in: input.userList };

      if (input.source) {
        whereClause["source"] = input.source;
      }
      let result;
      try {
        const start = Date.now();
        result = await db.annotatedPdf.findMany({
          where: whereClause,
          include: {
            highlights: {
              include: {
                node: {
                  include: {
                    children: true,
                  },
                },
              },
            },
          },
        });
        const end = Date.now();
        console.log(`Query took ${end - start}ms`);
      } catch (error) {
        console.error("Failed to fetch highlights:", error);
        return null;
      }

      return result;
    }),
});
