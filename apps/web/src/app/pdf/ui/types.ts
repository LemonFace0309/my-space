import { z } from "zod";
import { AnnotatedPdf, User } from "@prisma/client";
export interface LTWH {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface LTWHP extends LTWH {
  pageNumber?: number;
}

export interface Scaled {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  height: number;
  pageNumber?: number;
}

export interface Position {
  boundingRect: LTWHP;
  rects: Array<LTWHP>;
  pageNumber: number;
}

export interface ScaledPosition {
  boundingRect: Scaled;
  rects: Array<Scaled>;
  pageNumber: number;
  usePdfCoordinates?: boolean;
}

export interface Content {
  text?: string | null;
  image?: string | null;
}

export interface HighlightContent {
  content: Content;
}

export interface Comment {
  text: string | null;
  emoji: string | null;
  timestamp: Date;
  userId: string;
}

export interface NewHighlight extends HighlightContent {
  position: ScaledPosition;
  timestamp: Date;
  comments: Array<Comment>;
}

export interface IHighlight extends NewHighlight {
  id: string;
}

export interface ViewportHighlight extends HighlightContent {
  position: Position;
  comments: Array<Comment>;
}

export interface Viewport {
  convertToPdfPoint: (x: number, y: number) => Array<number>;
  convertToViewportRectangle: (pdfRectangle: Array<number>) => Array<number>;
  width: number;
  height: number;
}

export interface Page {
  node: HTMLElement;
  number: number;
}

export interface PDFHighlightsWithProfile extends AnnotatedPdf {
  userProfilePicture: string;
  firstName: string;
  lastName: string;
}

export interface UserWithProfile extends User {
  imageUrl: string;
}

export const LTWHSchema = z.object({
  left: z.number(),
  top: z.number(),
  width: z.number(),
  height: z.number(),
});

export const LTWHPSchema = LTWHSchema.extend({
  pageNumber: z.number(),
});

export const ScaledSchema = z.object({
  x1: z.number(),
  y1: z.number(),
  x2: z.number(),
  y2: z.number(),
  width: z.number(),
  height: z.number(),
  pageNumber: z.number().or(z.null()),
});

export const PositionSchema = z.object({
  boundingRect: LTWHPSchema,
  rects: z.array(LTWHPSchema),
  pageNumber: z.number(),
});

export const ScaledPositionSchema = z.object({
  boundingRect: ScaledSchema,
  rects: z.array(ScaledSchema),
  pageNumber: z.number(),
  usePdfCoordinates: z.boolean().or(z.null()),
});

export const ContentSchema = z.object({
  text: z.string().or(z.null()),
  image: z.string().or(z.null()),
});

export const HighlightContentSchema = z.object({
  content: ContentSchema,
});

export const CommentSchema = z.object({
  text: z.string().or(z.null()),
  emoji: z.string().or(z.null()),
  timestamp: z.date(),
  userId: z.string(),
});

export const CurriculumNodeSchema = z.object({
  comments: z.array(CommentSchema),
  prompt: z.string().or(z.null()),
  response: z.string().or(z.null()),
  timestamp: z.date(),
});

export const ICurriculumNodeSchema = CurriculumNodeSchema.extend({
  id: z.string(),
  children: z.array(z.any()),
});

export const HighlightSchema = z.object({
  content: ContentSchema,
  position: ScaledPositionSchema,
  comment: CommentSchema.or(z.null()),
  nodeId: z.string().or(z.null()),
  annotatedPdfId: z.string(),
});

export const HighlightWithCurriculumNodeSchema = HighlightSchema.extend({
  node: CurriculumNodeSchema.or(z.undefined()).or(z.null()),
}).omit({ nodeId: true });

export const IHighlightSchema = HighlightSchema.extend({
  id: z.string(),
});

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  first_name: z.string(),
  followers: z.array(z.string()),
  follows: z.array(z.string()),
  handle: z.string(),
  last_name: z.string(),
});
