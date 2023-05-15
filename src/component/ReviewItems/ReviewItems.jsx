import React from 'react';
import './reviewItrms.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ReviewItems = ({ product, removeItemHandler}) => {
    const { _id, img, name, price, quantity } = product  ;
    return (
        <div className='review-item'>
            <img src={img} alt="" />
            <div className='details-container'>
                <div className='review-detail'>
                    <h4>{name}</h4>
                    <p>Price: <span className='price'>${price}</span></p>
                    <p>Quantity : {quantity}</p>
                </div>

                <button onClick={()=>removeItemHandler(_id)} > <FontAwesomeIcon className='icon' icon={faTrashAlt} /></button>

            </div>
        </div>
    );
};

export default ReviewItems;
