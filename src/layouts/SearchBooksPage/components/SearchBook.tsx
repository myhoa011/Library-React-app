import { BookModel } from "../../../models/BookModel";

export const SearchBook: React.FC<{book : BookModel}> = (props) => {
    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-2'>
                    <div className='d-none d-lg-block'>
                        {props.book.product_price ?
                            <img src={props.book.image_src}
                                width='200'
                                height='196'
                                alt='Book'
                            />
                            :
                            <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')}
                                width='123'
                                height='196'
                                alt='Book'
                            />
                        }
                    </div>
                    <div className='d-lg-none d-flex justify-content-center 
                        align-items-center'>
                        {props.book.product_price ?
                            <img src={props.book.image_src}
                                width='123'
                                height='196'
                                alt='Book'
                            />
                            :
                            <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')}
                                width='123'
                                height='196'
                                alt='Book'
                            />
                        }
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h4 className='card-title'>
                            {props.book.product_name}
                        </h4>
                        <h5>
                            {props.book.product_finalprice} đ
                        </h5>
                        <p className='card-text'  style={{textDecoration: 'line-through'}}>
                            {props.book.product_price} đ
                        </p>
                        <p className='card-text'>
                            Giảm {props.book.discount}%
                        </p>
                    </div>
                </div>
                <div className='col-md-4 d-flex justify-content-center align-items-center'>
                    <a className='btn btn-md main-color text-white' href={props.book.product_url}>
                        View Details
                    </a>
                </div>
            </div>
        </div>
    )
}