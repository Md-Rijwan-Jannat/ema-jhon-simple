import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    // data load in local 
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    return (
        <div>
            <div className="shop-container">
                <div className="products-container">
                    {
                        products.map(product => <Product key={product.id} product={product}>
                            
                        </Product>)
                    }
                </div>
                <div className="cart-container">
                    <h4>Al right</h4>
                </div>
            </div>
        </div>
    );
};

export default Shop;