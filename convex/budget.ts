import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createBudget = mutation({
  args: {
    name: v.string(),
    amount: v.number(),
    category: v.string(),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("User not authenticated");
    }

    await ctx.db.insert("budget", {
      name: args.name,
      amount: args.amount,
      category: args.category,
      tokenIdentifier: userId,
    });
  },
});

export const getBudget = query({
  async handler(ctx) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("User not authenticated");
    }

    return await ctx.db
      .query("budget")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .collect();
  },
});
