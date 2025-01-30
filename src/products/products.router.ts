import {
  Ctx,
  Input,
  Mutation,
  Query,
  Router,
  UseMiddlewares,
} from 'nestjs-trpc';
import { z } from 'zod';
import { ProductsService } from './products.service';
import { Product, productSchema } from './product.schema';
import { LoggerMiddleware } from 'src/trpc/middleware/logger.middleware';
import { IAppContext } from 'src/trpc/context/context.interface';

/**
 * TRPC router for handling product related operations.
 */
@Router({ alias: 'products' })
@UseMiddlewares(LoggerMiddleware)
export class ProductsRouter {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Retrieves a product by its ID.
   * @param id - The ID of the product to retrieve.
   * @returns A promise that resolves to the product.
   */
  @Query({
    input: z.object({ id: z.string() }),
    output: productSchema,
  })
  getProductById(@Input('id') id: string) {
    return this.productsService.getProductById(id);
  }

  /**
   * Retrieves all products.
   * @returns A promise that resolves to an array of products.
   */
  @Query({
    output: z.array(productSchema),
  })
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  /**
   * Creates a new product.
   * @param productData - The data for the new product.
   * @param context - The application context.
   * @returns A promise that resolves to the created product.
   */
  @Mutation({
    input: productSchema,
    output: productSchema,
  })
  createProduct(@Input() productData: Product, @Ctx() context: IAppContext) {
    console.log('App context', context);
    return this.productsService.createProduct(productData);
  }

  /**
   * Updates an existing product.
   * @param id - The ID of the product to update.
   * @param data - The data to update the product with.
   * @returns A promise that resolves to the updated product.
   */
  @Mutation({
    input: z.object({
      id: z.string(),
      data: productSchema.partial(),
    }),
    output: productSchema,
  })
  updateProduct(
    @Input('id') id: string,
    @Input('data') data: Partial<Product>,
  ) {
    return this.productsService.updateProduct(id, data);
  }

  /**
   * Deletes a product by its ID.
   * @param id - The ID of the product to delete.
   * @returns A promise that resolves to true if the product was deleted, false otherwise.
   */
  @Mutation({
    input: z.object({ id: z.string() }),
    output: z.boolean(),
  })
  deleteProduct(@Input('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
