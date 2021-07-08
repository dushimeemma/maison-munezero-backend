const ProductModel = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      title: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
      category: { type: DataTypes.STRING },
      gender: { type: DataTypes.STRING },
      price: { type: DataTypes.INTEGER },
      user_id: {
        type: DataTypes.INTEGER,
        references: { model: 'User', key: 'id' },
      },
      image: { type: DataTypes.STRING },
    },
    {}
  );
  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
  };
  return Product;
};

export default ProductModel;
