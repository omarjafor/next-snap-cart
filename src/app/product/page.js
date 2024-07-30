import { fetchAllProducts } from "@/actions";
import ProductInfo from "@/components/product-info";

const ProductPage = async() => {

    const products = await fetchAllProducts();

    return (
        <>
            <ProductInfo products={products} />
        </>
    );
};

export default ProductPage;