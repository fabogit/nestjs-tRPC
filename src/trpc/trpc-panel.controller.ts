import { All, Controller, Inject, OnModuleInit } from '@nestjs/common';
import { AnyRouter } from '@trpc/server';
import { AppRouterHost } from 'nestjs-trpc';
import { renderTrpcPanel } from 'trpc-panel';

/**
 * Controller for serving the TRPC panel.
 * This controller provides an endpoint to render the TRPC panel for API exploration.
 */
@Controller()
export class TrpcPanelController implements OnModuleInit {
  private appRouter!: AnyRouter;

  constructor(
    @Inject(AppRouterHost) private readonly appRouterHost: AppRouterHost,
  ) {}

  /**
   * Initializes the controller and retrieves the TRPC router.
   */
  onModuleInit() {
    this.appRouter = this.appRouterHost.appRouter;
  }

  /**
   * Serves the TRPC panel.
   * @returns The rendered TRPC panel HTML.
   */
  @All('/panel')
  panel() {
    return renderTrpcPanel(this.appRouter, {
      url: 'http://localhost:3000/trpc',
    });
  }
}
