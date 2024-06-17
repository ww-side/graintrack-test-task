import { z } from 'zod';
import { messages } from '@/core/config/messages.ts';

export const validatePassword = z
  .string()
  .min(1, { message: messages.passwordRequired })
  .min(9, { message: messages.passwordLengthMin })
  .regex(new RegExp('.*[A-Z].*'), {
    message: messages.passwordOneUppercase,
  })
  .regex(new RegExp('.*[a-z].*'), {
    message: messages.passwordOneLowercase,
  })
  .regex(new RegExp('.*\\d.*'), { message: messages.passwordOneNumeric })
  .regex(new RegExp('.*[!@#$%^&*()_+\\-=\\[\\]{};:\\\'",.<>\\/?`~].*'), {
    message: messages.passwordOneSpecialCharacter,
  });

export const validateUsername = z.string().min(3, messages.usernameLengthMin);
