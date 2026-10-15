import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// 1. Генерация URL для загрузки файла
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// 2. Получение списка продуктов с URL картинок
export const getProducts = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").order("desc").collect();
    
    return Promise.all(
      products.map(async (product) => {
        const imageUrl = await ctx.storage.getUrl(product.imageId);
        return { ...product, imageUrl };
      })
    );
  },
});

// 3. Добавление нового продукта
export const addProduct = mutation({
  args: {
    title: v.string(),
    price: v.number(),
    imageId: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("products", {
      title: args.title,
      price: args.price,
      imageId: args.imageId,
      description: args.description,
    });
  },
});