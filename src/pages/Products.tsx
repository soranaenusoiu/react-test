import { useEffect, useState } from "react";
import "./Products.css";
import Product from "../data/product";
import { Button } from "@/components/ui/button";
import Cart from "@/data/cart";

function ProductInfo(props: {
  product: Product;
  addToCart: (product: Product) => void;
}) {
  const product = props.product;
  const addToCart = props.addToCart;

  return (
    <>
      <div className="flex flex-row pb-6">
        <img src={product.image} className="w-50 h-auto" />
        <div className="flex flex-col ps-4 w-full">
          <p className="text-2xl text-bold">{product.title}</p>
          <p>{product.description}</p>
          <div className="flex justify-end h-full place-items-end">
            <div className="p-8">
              <Button
                onClick={() => {
                  addToCart(product);
                }}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function createCartFromId(cartId: number, userId: number) {
  return {
    id: cartId,
    userId: userId,
    products: [],
  } as Cart;
}

function Products(props: { cart: Cart, setCart: (cart: Cart) => void }) {
  const userID = 105; //Hardcoded user id, pretend we logged in with this user and this is our token.
  const cartID = 100; //Hardcoded cart id for the first call.

  const [readProducts, setProducts] = useState<Product[]>([]);
  const cart = props.cart;
  const setCart = props.setCart;

  const storeUrl = "https://fakestoreapi.com/products";
  const cartsUrl = "https://fakestoreapi.com/carts";

  // Get all the products.
  useEffect(() => {
    fetch(storeUrl, {
      method: "GET",
    })
      .then((response) => {
        const json = response.json();
        console.log("Response:" + json);
        return json;
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
        const products = jsonResponse as Product[];
        setProducts(products);
      });
  }, []);

  //Get the cart for this user if we have none.
  useEffect(() => {
    if (cart == null) {
      fetch(cartsUrl, {
        method: "POST",
        body: JSON.stringify({
          id: cartID,
          userId: userID,
          products: [],
        }),
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          console.log(JSON.stringify(jsonResponse));
          const cartID = jsonResponse.id;
          const cart = createCartFromId(cartID, userID);
          console.log(JSON.stringify(cart));
          setCart(cart);
        });
    }
  });

  //Run each time cart changes and call the backend
  useEffect(() => {
    console.log("Cart changed to: " + JSON.stringify(cart));
    fetch(cartsUrl, {
      method: "POST",
      body: JSON.stringify(cart),
    })
      .then((response) => response.status)
      .then((status) => {
        if (status != 200) {
          console.log("Cart update failed");
        }
      });
  }, [cart]);

  // We need to pass this to each item in our product list
  const addToCart = (product: Product) => {
    if (cart != null) {
      cart.products.push(product);
      setCart({
        id: cart.id,
        userId: cart.userId,
        products: cart.products,
      });
    }
  };

  return (
    <>
      <div className="card">
        <ul>
          {readProducts.map((product) => {
            return (
              <li key={product.id}>
                <ProductInfo product={product} addToCart={addToCart} />
              </li>
            );
          })}
        </ul>
      </div>
      <p>Cart is {JSON.stringify(cart)}</p>
    </>
  );
}

export default Products;
