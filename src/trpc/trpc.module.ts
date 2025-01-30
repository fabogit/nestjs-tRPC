import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { TrpcPanelController } from './trpc-panel.controller';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AppContext } from './context/app.context';

/**
 * Module for configuring and providing TRPC functionality.
 * This module sets up the TRPC `server`, including `schema` generation, `context`,
 * and middleware. It also provides the `TrpcPanelController` for API exploration.
 */
@Module({
  imports: [
    TRPCModule.forRoot({
      autoSchemaFile: 'src/trpc/@generated',
      context: AppContext,
    }),
  ],
  controllers: [TrpcPanelController],
  providers: [LoggerMiddleware, AppContext],
})
export class TrpcModule {}
