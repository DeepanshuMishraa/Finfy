import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  budget: defineTable({
    name: v.string(),
    amount: v.number(),
    category: v.string(),
  }),
});
