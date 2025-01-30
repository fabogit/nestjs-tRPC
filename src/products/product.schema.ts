import { z } from 'zod';

/**
 * Zod schema for validating product data.
 * Defines the structure and types of a Product object.
 */
export const productSchema = z.object({
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
});

/**
 * Type representing a product, inferred from the productSchema.
 */
export type Product = z.infer<typeof productSchema>;
