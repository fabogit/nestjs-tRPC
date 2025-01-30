import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsRouter } from './products.router';

/**
 * Module for managing products.
 * This module provides the necessary components for interacting with product data,
 * including the service for business logic and the router for handling API requests.
 */
@Module({
  providers: [ProductsService, ProductsRouter],
})
export class ProductsModule {}
