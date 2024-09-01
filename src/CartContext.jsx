import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

const fetchCartItems = async () => {
    const response = await fetch("https://run.mocky.io/v3/278b4f1f-92d7-452f-8e0b-32f1d268deb7");
    const data = await response.json();
   
    return data;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity]= useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        fetchCartItems().then(data => {
            let product = data.products;
            for (let i = 0; i < product.length; i++) {
                product[i].quantity = 0;
            }
            setCartItems(product)
        });
    }, []);

    const updateQuantity = (id, quantity) => {
        cartItems.forEach(item => {
            if (item.id === id) {
                item.quantity = item.quantity + quantity;
                setTotalQuantity(value=> value +quantity);
                setTotalAmount(value=> (value + (item.price*quantity)));
            }
        })
        setCartItems([...cartItems]);
    };

    const removeItem = id => {

        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    
    return (
        <CartContext.Provider value={{ cartItems, updateQuantity, removeItem, totalQuantity, totalAmount }}>
            {children}
        </CartContext.Provider>
    );
};