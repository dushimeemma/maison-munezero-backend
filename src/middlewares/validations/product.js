import Joi from 'joi';

export const ProductSchema = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().messages({
      'any.required': 'Title is required',
      'string.empty': 'Title can not be empty',
    }),
    description: Joi.string().required().messages({
      'any.required': 'Description is required',
      'string.empty': 'Description can not be empty',
    }),
    category: Joi.string().required().messages({
      'any.required': 'Category is required',
      'string.empty': 'Catehory can not be empty',
    }),
    gender: Joi.string().required().messages({
      'any.required': 'Gender is required',
      'string.empty': 'Gender can not be empty',
    }),
    price: Joi.number().required().messages({
      'any.required': 'Price is required',
      'number.empty': 'Price can not be empty',
    }),
    image: Joi.string().required().messages({
      'any.required': 'Image is required',
      'string.empty': 'Image can not be empty',
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};

export const UpdateProductSchema = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().messages({
      'string.empty': 'Title can not be empty',
    }),
    description: Joi.string().messages({
      'string.empty': 'Description can not be empty',
    }),
    category: Joi.string().messages({
      'string.empty': 'Catehory can not be empty',
    }),
    gender: Joi.string().messages({
      'string.empty': 'Gender can not be empty',
    }),
    price: Joi.number().messages({
      'number.empty': 'Price can not be empty',
    }),
    image: Joi.string().messages({
      'string.empty': 'Image can not be empty',
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
