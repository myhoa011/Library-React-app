export class BookModel {
    product_id: string;
    product_name: string;
    product_finalprice: string;
    product_price: string;
    product_url: string;
    image_src: string;
    discount: number;
    
    constructor(product_id: string, product_name: string, product_finalprice: string, product_price: string,
                product_url: string, image_src: string, discount: number
    ) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.product_finalprice = product_finalprice;
        this.product_price = product_price;
        this.product_url = product_url;
        this.image_src = image_src;
        this.discount = discount;
    }
}