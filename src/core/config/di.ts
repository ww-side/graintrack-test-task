import { container } from 'tsyringe';
import { AuthService } from '@/features/auth/services/auth-service.ts';
import { SessionService } from '@/features/auth/services/session-service.ts';

container.registerSingleton(AuthService);
container.registerSingleton(SessionService);
