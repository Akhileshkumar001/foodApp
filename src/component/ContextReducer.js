

// import React, { useReducer, useContext } from 'react';

// const CartStateContext = React.createContext();
// const CartDispatchContext = React.createContext();

// const reducer = (state, action) => {
//     switch (action.type) {
//         case "ADD":
//             const newState = [...state, { 
//                 id: action.id, 
//                 name: action.name, 
//                 price: action.price, 
//                 qty: action.qty, 
//                 size: action.size 
//             }];
//             localStorage.setItem('cart', JSON.stringify(newState));
//             return newState;
//         case "REMOVE":
//             const updatedState = state.filter((_, index) => index !== action.index);
//             localStorage.setItem('cart', JSON.stringify(updatedState));
//             return updatedState;
//         case "CLEAR":
//             localStorage.removeItem('cart');
//             return [];
//         default:
//             console.log("Error in reducer");
//             return state;
//     }
// }


// export const CartProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(reducer, []);

//     return (
//         <CartStateContext.Provider value={state}>
//             <CartDispatchContext.Provider value={dispatch}>
//                 {children}
//             </CartDispatchContext.Provider>
//         </CartStateContext.Provider>
//     );
// };

// export const useCart = () => useContext(CartStateContext);
// export const useDispatchCart = () => useContext(CartDispatchContext);


import React, { createContext, useState, useEffect, useReducer, useContext } from 'react';

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
    const [foodItems, setFoodItems] = useState([]);
    const [foodCat, setFoodCat] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await fetch('http://localhost:3005/foodItems');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFoodItems(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        const fetchFoodCat = async () => {
            try {
                const response = await fetch('http://localhost:3005/foodCategories');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setFoodCat(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchFoodItems();
        fetchFoodCat();
    }, []);

    return (
        <FoodContext.Provider value={{ foodItems, foodCat, loading, error }}>
            {children}
        </FoodContext.Provider>
    );
};

// CartContext


const CartStateContext = createContext();
const CartDispatchContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            const newState = [...state, { 
                id: action.id, 
                name: action.name, 
                price: action.price, 
                qty: action.qty, 
                size: action.size 
            }];
            localStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        case "REMOVE":
            const updatedState = state.filter((_, index) => index !== action.index);
            localStorage.setItem('cart', JSON.stringify(updatedState));
            return updatedState;
        case "CLEAR":
            localStorage.removeItem('cart');
            return [];
        default:
            console.log("Error in reducer");
            return state;
    }
};

export const CartProvider = ({ children }) => {
    // Initialize state from localStorage if available, otherwise use an empty array
    const initialState = JSON.parse(localStorage.getItem('cart')) || [];

    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartStateContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);

// Combined Providers
const Providers = ({ children }) => {
    return (
        <FoodProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </FoodProvider>
    );
};

export default Providers;
