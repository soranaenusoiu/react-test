# React test 

I used the fake store API to create a simple product browsing page that allows you to add products to a cart.  
For UI components I used [shadcn](https://ui.shadcn.com/) because they are easy to use and customize and they come out of the box with theme support.  
I also used [Tailwind Css](https://tailwindcss.com/) to edit CSS properties.  

I had to always create a cart when loading the page because the fake store backend APIs didn't save my cart contents. When I was calling the cart update API, the backend returns success, but then, when I was calling the [getCartByID](https://fakestoreapi.com/docs#tag/Carts/operation/getCartById) - the returned cart had no products.  

I managed state using `useState` and `useEffect`.


