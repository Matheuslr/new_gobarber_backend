import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      user_id,
    });

    return response.json(
      providers.map(provider => ({
        id: provider.id,
        name: provider.name,
        email: provider.email,
        created_at: provider.created_at,
        updated_at: provider.updated_at,
      })),
    );
  }
}
