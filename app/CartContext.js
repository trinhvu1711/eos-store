// CartContext.js

import React, { createContext, useState, useContext } from "react";

// Tạo CartContext
const CartContext = createContext();

// Tạo Provider để cung cấp dữ liệu cho các thành phần con
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Các hàm thêm, xóa, cập nhật giỏ hàng
  const addItemToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeItemFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addItemToCart, removeItemFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Tạo custom hook để sử dụng dễ dàng
export const useCart = () => useContext(CartContext);
