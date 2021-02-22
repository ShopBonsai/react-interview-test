import { MigrationInterface, QueryRunner } from "typeorm";
import merchants from "../../../mockMerchantData";
import Brand from "../entity/Brand";
import Merchant from "../entity/Merchant";
import Product from "../entity/Product";

interface IMockProduct {
  belongsToBrand: number;
  id: string;
  name: string;
  price: number;
  description: string;
  color: string;
  size: string;
  quantity: number;
  image: string;
}

interface IMockMerchant {
  index: number;
  guid: string;
  logo: string;
  dateCreated: string;
  publishedState: boolean;
  brands: string[];
  products: IMockProduct[];
  merchant: string;
  commissionFee: string;
  contactEmail: string;
  phone: string;
  address: string;
  publishedDate: string;
  publishedBy: {
    userId: string;
  };
  companyDescription: string;
}

// helper function to marshall mock data to entity data
const productMockToEntity = ({
  id,
  belongsToBrand,
  name,
  price,
  description,
  color,
  size,
  quantity,
  image
}: IMockProduct): Product => {
  const product = new Product();
  product.id = id;
  product.belongsToBrand = belongsToBrand;
  product.name = name;
  product.price = price;
  product.description = description;
  product.color = color;
  product.size = size;
  product.quantity = quantity;
  product.image = image;
  return product;
};

const mockDateToJSDate = (dateString: string) =>
  new Date(dateString.replace(/\s/g, ""));

export class INITIALMIGRATION1613917176139 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const brandRepository = queryRunner.connection.getRepository(Brand);
    const productRepository = queryRunner.connection.getRepository(Product);
    const merchantRepository = queryRunner.connection.getRepository(Merchant);

    // traverse through merchants mockData array and
    // 1) save all brands to a Set to avoid duplicate values
    // 2) save all products to an array
    // 3) save all merchants to an array
    for (const merchant of merchants as IMockMerchant[]) {
      // gather brand entities for a given merchant
      const merchantBrands = [];
      for (const brand of merchant.brands) {
        const existingBrand = await brandRepository.findOne({ name: brand });
        if (existingBrand) {
          // Brand already exists so saving it's entity
          merchantBrands.push(existingBrand);
        } else {
          // Brand doesn't already exist to so creating it first and then saving it's entity
          const newBrand = new Brand();
          newBrand.name = brand;
          await brandRepository.save(newBrand);
          merchantBrands.push(newBrand);
        }
      }

      // gather product entities for a given merchant
      const merchantProducts = [];
      for (const product of merchant.products) {
        // save product entity
        const newProduct = productMockToEntity(product);
        const savedProduct = await productRepository.save(newProduct);
        merchantProducts.push(savedProduct);
      }

      const newMerchant = new Merchant();
      newMerchant.address = merchant.address;
      newMerchant.commissionFee = merchant.commissionFee;
      newMerchant.companyDescription = merchant.companyDescription;
      newMerchant.contactEmail = merchant.contactEmail;
      newMerchant.dateCreated = mockDateToJSDate(merchant.dateCreated);
      newMerchant.guid = merchant.guid;
      newMerchant.id = merchant.index;
      newMerchant.logo = merchant.logo;
      newMerchant.name = merchant.merchant;
      newMerchant.phone = merchant.phone;
      newMerchant.publishedByUserId = merchant.publishedBy.userId;
      newMerchant.publishedDate = mockDateToJSDate(merchant.publishedDate);
      newMerchant.publishedState = merchant.publishedState;

      newMerchant.products = merchantProducts;
      newMerchant.brands = merchantBrands;
      await merchantRepository.save(newMerchant);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
