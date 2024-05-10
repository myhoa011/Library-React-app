import { useState, useEffect } from "react";
import { BookModel } from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";

export const SearchBooksPage = () => {
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl = "http://localhost:9000/api";
            const searchUrl = search ? `/search?keyword=${encodeURIComponent(search)}` : '/books';

            try {
                const response = await fetch(baseUrl + searchUrl);
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const responseJson = await response.json();
                const loadedBooks: BookModel[] = []
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
            } catch (error: any) {
                setHttpError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBooks();
        window.scrollTo(0, 0);
    }, [searchUrl]);

    const handleSearch = () => {
        setSearchUrl(search ? `/search?keyword=${search}` : '');
    };

    if (isLoading) {
        return <SpinnerLoading />;
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-6">
                        <div className="d-flex">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-labelledby="Search"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <button className="btn btn-outline-success" onClick={handleSearch}>
                                Search
                            </button>
                        </div>
                    </div>
                    {books.map(book => (
                                <SearchBook book={book} key={book.product_id} />
                            ))}
                </div>
            </div>
        </div>
    );
};
