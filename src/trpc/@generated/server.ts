import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  products: t.router({
    getProductById: publicProcedure
      .input(z.object({ id: z.string() }))
      .output(
        z.object({
          /**
           * Unique identifier for the product.
           */
          id: z.string(),
          /**
           * Name of the product.
           */
          name: z.string(),
          /**
           * Price of the product.
           */
          price: z.number(),
          /**
           * Detailed information about the product.
           */
          details: z.object({
            /**
             * of the product.
             */
            desciption: z.string().optional(),
            /**
             * Rating of the product.
             */
            rating: z.number().optional(),
          }),
        }),
      )
      .query(async () => 'PLACEHOLDER_DO_NOT_REMOVE' as any),
    getAllProducts: publicProcedure
      .output(
        z.array(
          z.object({
            /**
             * Unique identifier for the product.
             */
            id: z.string(),
            /**
             * Name of the product.
             */
            name: z.string(),
            /**
             * Price of the product.
             */
            price: z.number(),
            /**
             * Detailed information about the product.
             */
            details: z.object({
              /**
               * of the product.
               */
              desciption: z.string().optional(),
              /**
               * Rating of the product.
               */
              rating: z.number().optional(),
            }),
          }),
        ),
      )
      .query(async () => 'PLACEHOLDER_DO_NOT_REMOVE' as any),
    createProduct: publicProcedure
      .input(
        z.object({
          /**
           * Unique identifier for the product.
           */
          id: z.string(),
          /**
           * Name of the product.
           */
          name: z.string(),
          /**
           * Price of the product.
           */
          price: z.number(),
          /**
           * Detailed information about the product.
           */
          details: z.object({
            /**
             * of the product.
             */
            desciption: z.string().optional(),
            /**
             * Rating of the product.
             */
            rating: z.number().optional(),
          }),
        }),
      )
      .output(
        z.object({
          /**
           * Unique identifier for the product.
           */
          id: z.string(),
          /**
           * Name of the product.
           */
          name: z.string(),
          /**
           * Price of the product.
           */
          price: z.number(),
          /**
           * Detailed information about the product.
           */
          details: z.object({
            /**
             * of the product.
             */
            desciption: z.string().optional(),
            /**
             * Rating of the product.
             */
            rating: z.number().optional(),
          }),
        }),
      )
      .mutation(async () => 'PLACEHOLDER_DO_NOT_REMOVE' as any),
    updateProduct: publicProcedure
      .input(
        z.object({
          id: z.string(),
          data: z
            .object({
              /**
               * Unique identifier for the product.
               */
              id: z.string(),
              /**
               * Name of the product.
               */
              name: z.string(),
              /**
               * Price of the product.
               */
              price: z.number(),
              /**
               * Detailed information about the product.
               */
              details: z.object({
                /**
                 * of the product.
                 */
                desciption: z.string().optional(),
                /**
                 * Rating of the product.
                 */
                rating: z.number().optional(),
              }),
            })
            .partial(),
        }),
      )
      .output(
        z.object({
          /**
           * Unique identifier for the product.
           */
          id: z.string(),
          /**
           * Name of the product.
           */
          name: z.string(),
          /**
           * Price of the product.
           */
          price: z.number(),
          /**
           * Detailed information about the product.
           */
          details: z.object({
            /**
             * of the product.
             */
            desciption: z.string().optional(),
            /**
             * Rating of the product.
             */
            rating: z.number().optional(),
          }),
        }),
      )
      .mutation(async () => 'PLACEHOLDER_DO_NOT_REMOVE' as any),
    deleteProduct: publicProcedure
      .input(z.object({ id: z.string() }))
      .output(z.boolean())
      .mutation(async () => 'PLACEHOLDER_DO_NOT_REMOVE' as any),
  }),
});
export type AppRouter = typeof appRouter;
