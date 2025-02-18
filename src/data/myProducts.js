import { products } from './products'

// For now, let's just use a subset of the existing products for 'My Products' and add stock quantity
export const myProducts = products.slice(0, 10).map((product, index) => ({
  ...product,
  stockQuantity: index % 3 === 0 ? 0 : Math.floor(Math.random() * 100), // Example stock quantities, some will be 0
  isListed: index % 2 === 0 // Example isListed status, some will be false (Not Listed)
}));
