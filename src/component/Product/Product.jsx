import React from 'react';
import './Product.css';

const Product = (props) => {
    const { img, name, price, seller, quantity, ratings, stock } = props.product
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
                <h6 className='product-name'>{name}</h6>
                <p className='price'>Price: ${price}</p>
                <p className='Manufacturer'><small>Manufacturer: {seller}</small></p>
                <p className='rating'><small>Rating: {ratings} star</small></p>
            </div>
                <button className='cart-btn'>Add to Cart</button>
        </div>
    );
};

export default Product;