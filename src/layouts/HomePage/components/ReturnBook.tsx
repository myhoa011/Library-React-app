import React from "react";
import { BookModel } from "../../../models/BookModel";

export const ReturnBook: React.FC<{ book: BookModel }> = (props) => {
    return (
        <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
            <div className='text-center'>
                {props.book.product_price ?
                    <img
                        src={props.book.image_src}
                        width='250'
                        height='233'
                        alt="book"
                    />
                    :
                    <img
                        src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                        width='250'
                        height='233'
                        alt="book"
                    />
                }

                <h5 className='mt-2'>{props.book.product_name}</h5>
                <h6>{props.book.product_finalprice} đ</h6>
                <p style={{textDecoration: 'line-through'}}>{props.book.product_price} đ</p>
                <a className='btn main-color text-white' href='#'>Reserve</a>
            </div>
        </div>
    );
}