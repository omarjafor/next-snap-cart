'use client'

import { useDispatch, useSelector } from "react-redux";
import styles from '../../app/account/account.module.scss';
import ProductCard from "@/components/product-card";
import { setSearch } from "@/redux/search";
import { useEffect, useState } from "react";

const ProductInfo = ({ products }) => {
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const dispatch = useDispatch();
    const { search } = useSelector(state => state.search);

    const brands = [...new Set(products.data.map(product => product.brand))];
    const categories = [...new Set(products.data.map(product => product.category))];

    useEffect(() => {
        let filtered = products.data;
        if (search) {
            filtered = filtered.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
        }
        if (selectedBrands.length > 0) {
            filtered = filtered.filter(product => selectedBrands.includes(product.brand));
        }
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(product => selectedCategories.includes(product.category));
        }
        setFilteredProducts(filtered);
    }, [search, selectedBrands, selectedCategories])

    const handleBrandChange = (brand) => {
        setSelectedBrands(prevState =>
            prevState.includes(brand)
                ? prevState.filter(item => item !== brand)
                : [...prevState, brand]
        );
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories(prevState =>
            prevState.includes(category)
                ? prevState.filter(item => item !== category)
                : [...prevState, category]
        );
    };

    return (
        <div>
            <div className={styles.container}>
                <div>
                    <h1 className={styles.heading}>Find All Products Here</h1>
                </div>
                <input type="search" name="search" id="" placeholder="Search by product name" onChange={(e) => dispatch(setSearch(e.target.value))} className={styles.search} />
                <div className={styles.addNewProduct}>
                    <div className={styles.dropdown}>
                        <p>Brand</p>
                        <div className={styles.dropdownContent}>
                            {brands.map((brand, idx) => (
                                <div className={styles.brand}>
                                    <input
                                        type="checkbox"
                                        value={brand}
                                        onChange={() => handleBrandChange(brand)}
                                        checked={selectedBrands.includes(brand)}
                                    />
                                    <label key={idx}>
                                        {brand}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.dropdown}>
                        <p>Category</p>
                        <div className={styles.dropdownContent}>
                            {categories.map((category, idx) => (
                                <div className={styles.brand}>
                                    <input
                                        type="checkbox"
                                        value={category}
                                        onChange={() => handleCategoryChange(category)}
                                        checked={selectedCategories.includes(category)}
                                    />
                                    <label key={idx}>
                                        {category}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <span className={styles.divider}>
                <span className={styles.text}>Snap Up Great Deals by SnapCart</span>
            </span>
            <div className={styles.grid}>
                {
                    filteredProducts && filteredProducts.length > 0
                        ? filteredProducts.map((product, idx) => (
                            <ProductCard product={product} key={idx} />
                        )) : <p className={styles.noProducts}>No Product Found</p>
                }
            </div>
        </div>
    );
};

export default ProductInfo;