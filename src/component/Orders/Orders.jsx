import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItems from '../ReviewItems/ReviewItems';
import { removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const saveCart = useLoaderData();
    const [cart, setCart] = useState([saveCart])

    const removeItemHandler = (id) => {
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id)
    }

    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    cart.map(product => <ReviewItems
                        key={product.id}
                        product={product}
                        removeItemHandler={removeItemHandler}
                    ></ReviewItems>)
                }
            </div>
            <div className='cart-container'>
                <Cart
                    key={cart.id}
                    cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Orders;