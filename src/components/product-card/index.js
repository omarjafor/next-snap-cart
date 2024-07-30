'use client'

import { deleteProductAction, updateProductAction } from "@/actions";
import { formControls } from "@/utils";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from './product.module.scss';

const ProductCard = ({ product, user }) => {
    const [pathname, setPathname] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ ...product });

    useEffect(() => {
        if(typeof window !== 'undefined'){
            setPathname(window.location.pathname);
        }
    } , []);

    async function deleteProduct(id) {
        const toastId = toast.loading('Product Deleting....');
        const deleteProduct = await deleteProductAction(id, '/account');
        if (deleteProduct?.success) {
            toast.success(deleteProduct.message, { id: toastId });
        } else {
            toast.error(deleteProduct.message, { id: toastId });
        }
    }

    async function handleUpdate() {
        const toastId = toast.loading('Product Updating....');
        const updateProduct = await updateProductAction(formData, '/account');
        if (updateProduct?.success) {
            toast.success(updateProduct?.message, { id: toastId });
        } else {
            toast.error(updateProduct?.message, { id: toastId });
        }
        setShowModal(false);
    }

    return (
        <Fragment>
            <div className={styles.productCard}>
                <Link href={`/product/${product?._id}`}>
                    <img
                        alt="Product Image"
                        src={product?.image}
                        className={styles.productImage}
                    />
                </Link>
                <div className={styles.productInfo}>
                    <dl>
                        <dd className={styles.productPrice}>$ {product?.price} <span className={styles.productOnly}>only</span></dd>
                        <dd className={styles.productTitle}>{product?.title}</dd>
                    </dl>
                    <div className={styles.productActions}>
                        <div className={styles.productStock}>
                            <svg
                                className={styles.productStockIcon}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                                />
                            </svg>
                            <div className={styles.productStockInfo}>
                                <p className={styles.productStockLabel}>Stock</p>
                                <p className={styles.productStockValue}>{product?.stock}</p>
                            </div>
                        </div>
                        {
                            pathname === '/account' && product.userId === user?.id ? <>
                                <button onClick={() => setShowModal(true)} className={styles.editButton}>Edit</button>
                                <button onClick={() => deleteProduct(product?._id)} className={styles.deleteButton}>Delete</button>
                            </> : <Link href={`/product/${product?._id}`} className={styles.editButton}>See more</Link>
                        }
                        <div className={styles.productRating}>
                            <div className={styles.productRatingInfo}>
                                <p className={styles.productRatingLabel}>Ratings</p>
                                <p className={styles.productRatingValue}>{product?.rating}</p>
                            </div>
                            <svg
                                className={styles.productRatingIcon}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            {showModal ? (
                <>
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContainer}>
                            <div className={styles.modalContent}>
                                <div className={styles.modalHeader}>
                                    <h3 className={styles.modalTitle}>Update {product?.title}</h3>
                                </div>
                                <form action={handleUpdate}>
                                    <div className={styles.modalBody}>
                                        {
                                            formControls.filter(item => item.name !== 'tags').map(item => (
                                                <div className={styles.formControl} key={item.name}>
                                                    <label className={styles.formLabel}>{item?.label}</label>
                                                    <input
                                                        value={formData[item.name]}
                                                        onChange={(e) => setFormData({
                                                            ...formData, [e.target.name]: e.target.value
                                                        })}
                                                        type={item?.componentType}
                                                        className={styles.formInput}
                                                        placeholder={item?.placeholder}
                                                        name={item?.name} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className={styles.modalFooter}>
                                        <button type="button" onClick={() => {
                                            setShowModal(false);
                                            setFormData({ ...product });
                                        }} className={styles.closeButton}>
                                            Close
                                        </button>
                                        <button type="submit" className={styles.updateButton}>
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className={styles.modalBackdrop}></div>
                </>
            ) : null}
        </Fragment>
    );
};

export default ProductCard;
