import { ReturnBook } from "./ReturnBook";
import { useState, useEffect } from "react";
import { BookModel } from "../../../models/BookModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";

export const Carousel = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:9000/api/books/pagination?page=0&limit=9";


            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            console.log(responseJson);

            const loadedBooks: BookModel[] = [];

            for (const key in responseJson) {
                loadedBooks.push({
                    product_id: responseJson[key].product_id,
                    product_name: responseJson[key].product_name,
                    product_finalprice: responseJson[key].product_finalprice,
                    product_price: responseJson[key].product_price,
                    product_url: responseJson[key].product_url,
                    image_src: responseJson[key].image_src,
                    discount: responseJson[key].discount
                });
            }
            setBooks(loadedBooks);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    if (isLoading) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        <div className="container m-5">
            <p>{httpError}</p>
        </div>
    }

    return (
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='homepage-carousel-title'>
                <h3>Find your next "I stayed up too late reading" book.</h3>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 
                d-none d-lg-block' data-bs-interval='false'>

                {/* Desktop */}
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(0, 3).map(book => (
                                <ReturnBook book={book} key={book.product_id} />
                            ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(3, 6).map(book => (
                                <ReturnBook book={book} key={book.product_id} />
                            ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(6, 9).map(book => (
                                <ReturnBook book={book} key={book.product_id} />
                            ))}
                        </div>
                    </div>
                    <button className='carousel-control-prev' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                    <button className='carousel-control-next' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Next</span>
                    </button>
                </div>
            </div>

            {/* Mobile */}
            <div className='d-lg-none mt-3'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <ReturnBook book={books[7]} key={books[7].product_id} />
                </div>
            </div>
            <div className='homepage-carousel-title mt-3'>
                <Link to='/search' className='btn btn-outline-secondary btn-lg'>View More</Link>
            </div>
        </div>
    );
}