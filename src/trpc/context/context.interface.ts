import { Request, Response } from 'express';

/**
 * Interface defining the application context.
 * This interface provides access to the Express `request` and `response` objects.
 */
export interface IAppContext {
  /**
   * The Express request object.
   */
  req: Request;

  /**
   * The Express response object.
   */
  res: Response;

  // userId: string;
}
