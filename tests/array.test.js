import Joi from 'joi';

describe('Joi', () => {
  it('should validate array', () => {
    const hobbiesSchema = Joi.array().items(
        Joi.string().required().min(3).max(100),
    ).min(1).unique();

    const hobbies = ['A', 'Reading', 'Coding', 'Coding'];

    const result = hobbiesSchema.validate(hobbies, {
      abortEarly: false,
    });

    console.info(result);
  });

  it('should validate array of object', () => {
    const addressSchema = Joi.array().min(1).items(Joi.object({
      street: Joi.string().required().max(200),
      city: Joi.string().required().max(100),
      country: Joi.string().required().max(100),
      zipCode: Joi.string().required().max(100),
    }))

    const address = [{
      street: 'Jalan cinta',
    }]

    const result = addressSchema.validate(address, {
      abortEarly: false,
    });

    console.info(result);
  });
});