import React, { useEffect, useState, useTransition } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    // data load in local 
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemPerPage, setItemPerPage] = useState(10)
    const [cart, setCart] = useState([]);
    const loadProducts = useLoaderData();

    // ------------------
    // ---------------pagination----------

    const totalProducts = loadProducts?.productsLength;
    const totalPages = Math.ceil(totalProducts / itemPerPage);

    const pageNumber = [];
    for (let i = 1; i <= 8; i++) {
        pageNumber.push(i);
        console.log(pageNumber)
    }

    const pageNumbers = [...Array(totalPages).keys()]
    // dropdown pagination

    const handleSelectChange = event => {
        setItemPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    }
    const options = [5, 10, 15, 20, 25]

    // done: 1 :Determine the total number of items in your dataset
    // to do: 1:Decide on the number of items you want to display per page (e.g., 10 items per page).


    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    useEffect(() => {
        const storedCart = getShoppingCart();
        const saveCart = [];
        //step 1  get id in the shopping cart 
        for (const id in storedCart) {
            // step 2 get the product using by id
            const addedProduct = products.find(product => product._id === id);
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
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }
        setCart(newCart);
        addToDb(product._id);
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
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart
                        key={cart._id}
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
            <div className='pagination'>
                <p>current page:{currentPage}</p>
                <p>items per page{itemPerPage}</p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        className={currentPage === number ? 'selected' : ''}
                        onClick={() => setCurrentPage(number)}
                    >{number}</button>)
                }
                <select
                    value={itemPerPage}
                    onChange={handleSelectChange}
                >
                    {
                        options.map(option => (
                            <option
                                key={option}
                                value={option}
                            >
                                {option}
                            </option>))
                    }
                </select>
            </div>
        </div>
    );
};

export default Shop;