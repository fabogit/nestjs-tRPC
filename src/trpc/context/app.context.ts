import { Injectable } from '@nestjs/common';
import { ContextOptions, TRPCContext } from 'nestjs-trpc';

/**
 * Provides the application context for TRPC requests.
 * Implements the `TRPCContext` interface to create the context object.
 */
@Injectable()
export class AppContext implements TRPCContext {
  /**
   * Creates the TRPC context object.
   * @param opts The context options provided by TRPC.
   * @returns The TRPC context object containing the `request` and `response`.
   */
  create(opts: ContextOptions) {
    return {
      req: opts.req,
      res: opts.res,
    };
  }
}
