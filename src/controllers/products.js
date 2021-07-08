import { Product, User } from '../database/models';

class ProductController {
  async create(req, res) {
    const { id } = req.user;
    const { title, description, category, gender, price, image } = req.body;
    const product = {
      title,
      description,
      category,
      gender,
      price,
      image,
      user_id: id,
    };
    await Product.create(product);
    res.status(200).json({
      message: 'Product Saved Successfully',
      data: { product },
    });
  }
  async getAll(req, res) {
    const products = await Product.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
      order: [['id', 'DESC']],
    });
    res.status(200).json({
      message: 'Products retrieved Successfully',
      data: { products },
    });
  }
  async getOne(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
      order: [['id', 'DESC']],
    });
    if (!product) {
      return res.status(404).json({
        error: 'Product not found',
      });
    }
    res.status(200).json({
      message: 'Product retrieved Successfully',
      data: { product },
    });
  }
  async update(req, res) {
    const { id } = req.params;
    const { title, description, category, gender, price, image } = req.body;
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      return res.status(404).json({
        error: 'Product not found',
      });
    }
    const newProduct = {
      title,
      description,
      category,
      gender,
      price,
      image,
      user_id: id,
    };
    const updatedProduct = await Product.update(newProduct, {
      where: { id },
      returning: true,
    });
    res.status(200).json({
      message: 'Product Updated successfully',
      data: { product: updatedProduct[1][0] },
    });
  }
  async delete(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      return res.status(404).json({
        error: 'Product not found',
      });
    }
    await product.destroy();
    res.status(200).json({
      message: 'Product deleted successfully',
    });
  }
}
export default ProductController;
