import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

import './Product.css';

const Product = (props) => {
    const { img, name, price, seller, quantity, ratings, stock } = props.product;
    const handleAddToCart = props.handleAddToCart;
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
                <h6 className='product-name'>{name}</h6>
                <p className='price'>Price: ${price}</p>
                <p className='Manufacturer'><small>Manufacturer: {seller}</small></p>
                <p className='rating'><small>Rating: {ratings} star</small></p>
            </div>
            <button onClick={() => handleAddToCart(props.product)} className='cart-btn'>Add to Cart <FontAwesomeIcon icon={faCartShopping} /></button>
        </div>
    );
};

export default Product;