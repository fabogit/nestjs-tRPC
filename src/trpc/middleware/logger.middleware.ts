import { Injectable, Logger } from '@nestjs/common';
import { MiddlewareOptions, TRPCMiddleware } from 'nestjs-trpc';
import { IAppContext } from '../context/context.interface';

/**
 * Middleware for logging TRPC requests.
 * Logs request details, duration, and any errors that occur.
 */
@Injectable()
export class LoggerMiddleware implements TRPCMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name, {
    timestamp: true,
  });

  /**
   * Logs TRPC requests and their outcomes.
   * @param opts Middleware options containing context, path, type, and the next function.
   * @returns The result of the next middleware/handler in the chain.
   * @throws {Error} If an error occurs during request processing.
   */
  async use(opts: MiddlewareOptions<IAppContext>) {
    const start = Date.now();
    const { next, path, type } = opts;

    try {
      const result = await next(); // Await the next middleware/handler
      const { req, res } = opts.ctx;
      const meta = {
        path,
        type,
        durationMs: Date.now() - start,
        method: req.method,
        statusCode: res.statusCode,
        ip: req.ip,
        headers: req.headers,
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
