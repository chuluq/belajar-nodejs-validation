import Joi from 'joi';

describe('Joi', () => {
  it('should validate object', () => {
    const loginSchema = Joi.object({
      username: Joi.string().required().min(3).max(100).email(),
      password: Joi.string().required().min(6).max(100),
    })

    const request = {
      username: "Chuluq",
      password: "123456",
    }

    const result = loginSchema.validate(request, {
      abortEarly: false,
    });

    console.info(result);
  });

  it('should validate nested object', () => {
    const userSchema = Joi.object({
      id: Joi.string().required().max(100),
      name: Joi.string().required().min(3).max(100),
      address: Joi.object({
        street: Joi.string().required().min(3).max(100),
        city: Joi.string().required().min(3).max(100),
        country: Joi.string().required().min(3).max(100),
        zipCode: Joi.string().required().min(3).max(100),
      }).required()
    })

    const request = {
      address: {}
    }

    const result = userSchema.validate(request, {
      abortEarly: false,
    });

    if(result.error){
      result.error.details.forEach(value => {
        console.info(`${value.path} : ${value.message}`);
      })
    }
  });
});