import { AuthContext } from "./AuthContext";
import { CartContext } from "./CartContext";
import { useContext, useState, useEffect } from "react";

export default function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email || "guest";
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`cartItems_${userEmail}`);
      setCartItems(saved ? JSON.parse(saved) : []);
    } catch (error) {
      console.error("Error loading cart:", error);
      setCartItems([]);
    }
  }, [userEmail]);

  useEffect(() => {
    try {
      localStorage.setItem(`cartItems_${userEmail}`, JSON.stringify(cartItems));
    } catch (error) {
      console.error(error);
    }
  }, [cartItems, userEmail]);

  const addToCart = (product) => {
    const exist = cartItems.find((item) => item.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const exist = cartItems.find((item) => item.id === product.id);
    if (!exist) return;
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotal,
  
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
