import { z } from 'zod';
import {
  validatePassword,
  validateUsername,
} from '@/core/utils/validators/common-rules.ts';

export const loginSchema = z.object({
  username: validateUsername,
  password: validatePassword,
});

export type LoginSchema = z.infer<typeof loginSchema>;
