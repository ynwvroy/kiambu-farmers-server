import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ProductCategory from 'App/Models/ProductCategories'

export default class ProductCategoriesSeeder extends BaseSeeder {
  public async run() {
    await ProductCategory.createMany([
      {
        name: 'Livestock',
        slug: 'livestock',
        description: 'Cattle, sheep, and other livestock raised on the farm',
      },
      {
        name: 'Honey and Bee Products',
        slug: 'honey-bee-products',
        description: 'Pure honey, beeswax, and other bee-related products',
      },
      {
        name: 'Herbs and Spices',
        slug: 'herbs-spices',
        description: 'Fresh herbs and aromatic spices grown in the herb garden',
      },
      {
        name: 'Aquaculture',
        slug: 'aquaculture',
        description: 'Freshwater fish, shrimp, and other aquatic organisms',
      },
      {
        name: 'Nuts',
        slug: 'nuts',
        description: 'Nutritious nuts like almonds, walnuts, and pecans',
      },
      {
        name: 'Flowers',
        slug: 'flowers',
        description: 'Beautiful flowers grown for decoration or sale',
      },
      {
        name: 'Mushrooms',
        slug: 'mushrooms',
        description: 'Gourmet mushrooms cultivated in controlled environments',
      },
      {
        name: 'Vegetables',
        slug: 'vegetables',
        description: 'Fresh vegetables grown on the farm',
      },
      {
        name: 'Fruits',
        slug: 'fruits',
        description: 'Juicy fruits harvested from the orchard',
      },
      {
        name: 'Dairy Products',
        slug: 'dairy-products',
        description: 'Fresh milk, cheese, and yogurt from the dairy farm',
      },
      {
        name: 'Poultry',
        slug: 'poultry',
        description: 'Organic chicken, turkey, and eggs',
      },
      {
        name: 'Grains',
        slug: 'grains',
        description: 'Wholesome grains like wheat, rice, and barley',
      },
    ])
  }
}
