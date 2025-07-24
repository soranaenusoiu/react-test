import Product from "./product";

interface Cart {
  id: number,
  userId: number,
  products: Product[],
}

export default Cart;
