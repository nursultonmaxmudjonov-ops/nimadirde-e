// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    title: v.string(),
    price: v.number(),
    imageId: v.optional(v.id("_storage")),
    description: v.optional(v.string()),
    processor: v.optional(v.string()),
    ram: v.optional(v.string()),
    storage: v.optional(v.string()),
    gpu: v.optional(v.string()),
  }),
});