import { Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Cart from "@/data/cart";

function MyCartMiniList(props: {cart: Cart}) {
  const items = props.cart.products;
  
  console.log(JSON.stringify(props.cart));
  
  return (
    <>
      {items.map((item) => {
        return (
          <>
            <DropdownMenuItem>
            <div className="flex flex-row">
              <img src={item.image} className="size-5" />
              <p className="p-1">{item.title}</p>
            </div>  
            </DropdownMenuItem>
            <DropdownMenuSeparator></DropdownMenuSeparator>
          </>
        );
      })}
    </>
  )
} 


function Header(props: {cart: Cart}) {
  const cart = props.cart;
  return (
    <>
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-1">
        <nav className="bg-background">
          <div className="max-w-screen-xl flex items-center justify-between mx-auto p-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>
                      <Link to="/">Products</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink>
                      <Link to="about">About</Link>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </nav>
        
        <div className="flex flex-row space-x-1">
          <DropdownMenu>
            <DropdownMenuTrigger>My Cart</DropdownMenuTrigger>
            <DropdownMenuContent>
              <MyCartMiniList cart={cart} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}

export default Header;
