// convex/products.js
v
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mahsulotlarni olish
export const getProducts = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    
    // Har bir mahsulot uchun rasm URL manzilini biriktirish
    return Promise.all(
      products.map(async (product) => {
        let imageUrl = null;
        if (product.imageId) {
          imageUrl = await ctx.storage.getUrl(product.imageId);
        }
        return { ...product, imageUrl };
      })
    );
  },
});

// Rasm yuklash uchun URL yaratish
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// Yangi mahsulot qo'shish
export const addProduct = mutation({
  args: {
    title: v.string(),
    price: v.number(),
    imageId: v.optional(v.id("_storage")),
    description: v.string(),
    processor: v.string(),
    ram: v.string(),
    storage: v.string(),
    gpu: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("products", {
      title: args.title,
      price: args.price,
      imageId: args.imageId,
      description: args.description,
      processor: args.processor,
      ram: args.ram,
      storage: args.storage,
      gpu: args.gpu,
    });
  },
});

// Mahsulotni o'chirish
export const deleteProduct = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
}); 