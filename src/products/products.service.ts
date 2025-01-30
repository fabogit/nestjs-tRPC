import { Injectable } from '@nestjs/common';
import { Product } from './product.schema';
import { TRPCError } from '@trpc/server';

/**
 * Service for managing products.
 * Provides business logic for retrieving, creating, updating, and deleting products.
 */
@Injectable()
export class ProductsService {
  private products: Product[] = [];

  /**
   * Retrieves all products.
   * @returns An array of all products.
   */
  getAllProducts() {
    return this.products;
  }

  /**
   * Retrieves a product by ID.
   * @param id The ID of the product to retrieve.
   * @returns The product with the given ID.
   * @throws {TRPCError} If the product is not found.
   */
  getProductById(id: string) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new TRPCError({
        message: 'Product not found',
        code: 'NOT_FOUND',
      });
    }
    return product;
  }

  /**
   * Creates a new product.
   * @param productData The data for the new product.
   * @returns The newly created product.
   */
  createProduct(productData: Product) {
    this.products.push(productData);
    return productData;
  }

  /**
   * Updates an existing product.
   * @param id The ID of the product to update.
   * @param data The updated data for the product.
   * @returns The updated product.
   * @throws {TRPCError} If the product is not found.
   */
  updateProduct(id: string, data: Partial<Product>) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      throw new TRPCError({
        message: 'Product not found',
        code: 'NOT_FOUND',
      });
    }
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...data,
    };
    return this.products[productIndex];
  }

  /**
   * Deletes a product.
   * @param id The ID of the product to delete.
   * @returns `true` if the product was deleted, `false` otherwise.
   */
  deleteProduct(id: string) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      return false;
    }
    this.products.splice(productIndex, 1);
    return true;
  }
}
