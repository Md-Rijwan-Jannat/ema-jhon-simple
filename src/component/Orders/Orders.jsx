import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItems from '../ReviewItems/ReviewItems';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Orders = () => {
    const saveCart = useLoaderData();
    const [cart, setCart] = useState(saveCart)

    const removeItemHandler = (id) => {
        const remaining = cart.filter(product => product._id !== id);
        setCart(remaining);
        removeFromDb(id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart()
    }

    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    cart.map(product => <ReviewItems
                        key={product._id}
                        product={product}
                        removeItemHandler={removeItemHandler}
                    ></ReviewItems>)
                }
            </div>
            <div className='cart-container'>
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <div>
                        <div>
                            <Link to={'/chakeout'}>
                                <button className='review-btn'>Prosead Order <FontAwesomeIcon icon={faArrowRight} /></button>
                            </Link>
                        </div>
                    </div>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;