import Joi from 'joi';

describe('Prisma Client', () => {
  it('should use custom messages', () => {
    const schema = Joi.string().min(3).max(10).required().messages({
      'string.min': '{{#label}} panjang harus minimal {{#limit}} karakter',
      'string.max': '{{#label}} panjang harus maksimal {{#limit}} karakter',
    });

    const request = 'aaaaaaaaaaaaaaaaaaaaaaaaaaa';
    const result = schema.validate(request);
    console.info(result);
  });

  it('should use custom messages in object validation', () => {
    const schema = Joi.object({
      username: Joi.string().required().email().messages({
        'any.required': '{{#label}} harus diisi',
        'string.email': '{{#label}} harus valid email',
      }),
      password: Joi.string().required().min(6).max(10).messages({
        'any.required': '{{#label}} harus diisi',
        'string.min': '{{#label}} harus lebih dari {{#limit}} karakter',
        'string.max': '{{#label}} harus kurang dari {{#limit}} karakter',
      }),
    });

    const request = {
      username: 'chuluq',
      password: 'chu',
    }
    const result = schema.validate(request, {
      abortEarly: false,
    });
    console.info(result);
  });
});