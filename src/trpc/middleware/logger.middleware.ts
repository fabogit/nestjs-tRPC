import { Injectable, Logger } from '@nestjs/common';
import { MiddlewareOptions, TRPCMiddleware } from 'nestjs-trpc';

@Injectable()
export class LoggerMiddleware implements TRPCMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name, {
    timestamp: true,
  });

  async use(opts: MiddlewareOptions) {
    const start = Date.now();
    const { next, path, type } = opts;

    try {
      const result = await next(); // Await the next middleware/handler
      const meta = {
        path,
        type,
        durationMs: Date.now() - start,
      };
      this.logger.log('Success', meta);
      // Return the result to continue the chain
      return result;
    } catch (error) {
      const meta = {
        path,
        type,
        durationMs: Date.now() - start,
        error: error.message, // Include error message for debugging
      };
      this.logger.error('Error', meta);
      // Re-throw the error to propagate it up the chain
      throw error;
    }
  }
}
