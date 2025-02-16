import Joi from 'joi';

describe('Joi', () => {
  it('should create schema', () => {
    const schema = Joi.string().min(3).max(100).required();

    const result = schema.validate('chuluq')
    if(result.error) {
      console.info(result.error);
    }
  });

  it('should validate basic data type', () => {
    const usernameSchema = Joi.string().email().required();
    const isAdminSchema = Joi.boolean().required();
    const priceSchema = Joi.number().required().min(1000).max(1000000);

    const resultUsername = usernameSchema.validate('chuluq@email.com');
    console.info(resultUsername);

    const resultIsAdmin = isAdminSchema.validate("false")
    console.info(resultIsAdmin);

    const resultPrice = priceSchema.validate("10000");
    console.info(resultPrice);
  });
});