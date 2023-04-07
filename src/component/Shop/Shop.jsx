import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    // data load in local 
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    useEffect(() => {
        const storedCart = getShoppingCart();
        const saveCart = [];
        //step 1  get id in the shopping cart 
        for (const id in storedCart) {
            // step 2 get the product using by id
            const addedProduct = products.find(product => product.id === id);
            // step 3 get quantity
            if (addedProduct) {
                const quantity = storedCart[id]
                addedProduct.quantity = quantity;
                saveCart.push(addedProduct);
                setCart(saveCart);
            }
            // console.log(addedProduct)
        }
    }, [products])


    const handleAddToCart = (product) => {
        let newCart = [];
        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }
        setCart(newCart);
        addToDb(product.id);
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart()
    }

    return (
        <div>
            <div className="shop-container">
                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product.id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart
                        key={cart.id}
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >
                        <div>
                            <Link to={'/order'}>
                                <div>
                                    <button className='review-btn'>Review Order <FontAwesomeIcon icon={faArrowRight} /></button>
                                </div>
                            </Link>
                        </div>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;