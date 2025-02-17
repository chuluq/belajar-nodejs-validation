import Joi from 'joi';

describe('Joi', () => {
  it('should create custom validation', () => {
    const registerSchema = Joi.object({
      username: Joi.string().required().min(3).max(100).email(),
      password: Joi.string().
          required().
          min(6).
          max(100).
          custom((value, helpers) => {
            if (value.startsWith('@')) {
              return helpers.error('password.wrong');
            }
          }).
          messages({
            'password.wrong': 'password can not start with "@"',
          }),
      confirmPassword: Joi.string().required().min(6).max(100),
    }).custom((value, helpers) => {
      if (value.password !== value.confirmPassword) {
        return helpers.error('register.password.different');
      }
      return value;
    }).messages({
      'register.password.different': 'password and confirm password are different',
    });

    const request = {
      username: 'chuluq@email.com',
      password: 'password',
      confirmPassword: 'confirm password',
    };
    const result = registerSchema.validate(request, {abortEarly: false});
    console.info(result);
  });

});