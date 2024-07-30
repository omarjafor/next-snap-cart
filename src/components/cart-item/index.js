'use client'

import { removeAll, removeFromCart } from "@/redux/cart";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import styles from './cart.module.scss';

const CartItem = () => {
    const { cart } = useSelector(state => state);
    const dispatch = useDispatch();
    const subtotal = cart?.cartItem.reduce((acc, cur) => acc + cur?.price, 0);
    const vat = ((5 / 100) * subtotal).toFixed(2);
    const total = parseFloat(subtotal) + parseFloat(vat);

    return (
        <div className={styles.cartContainer}>
            <div className={styles.cartInner}>
                <header className={styles.cartHeader}>
                    <h1>Your Cart {cart?.cartItem.length > 0 ? '' : 'is Empty'}</h1>
                </header>
                <ul className={styles.cartItems}>
                    {
                        cart && cart?.cartItem.length > 0 ? cart?.cartItem.map((item, idx) => (
                            <li className={styles.cartItem} key={idx}>
                                <img
                                    src={item?.image}
                                    alt="product image"
                                    className={styles.itemImage}
                                />

                                <div className={styles.itemDetails}>
                                    <h3 className={styles.itemTitle}>{item?.title}</h3>

                                    <dl className={styles.itemInfo}>
                                        <div>
                                            <dt className={styles.infoValue}>Brand: </dt>
                                            <dd className={styles.infoValue}>{item?.brand}</dd>
                                        </div>

                                        <div>
                                            <dt className={styles.infoValue}>Price: </dt>
                                            <dd className={styles.infoValue}>$ {item?.price}</dd>
                                        </div>
                                    </dl>
                                </div>

                                <div className={styles.itemActions}>
                                    <form>
                                        <label htmlFor="Line1Qty" className="sr-only"> Quantity </label>

                                        <input
                                            type="number"
                                            min="1"
                                            value="1"
                                            id="Line1Qty"
                                            className={styles.quantityInput}
                                        />
                                    </form>

                                    <button onClick={() => dispatch(removeFromCart(item?._id))} className={styles.removeButton}>
                                        <span className="sr-only">Remove item</span>

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className={styles.removeIcon}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        )) : <Image src={'/shopping.png'} width={450} height={350} alt="Empty Cart" />
                    }
                </ul>
                <div className={styles.cartFooter}>
                    <div className={styles.summary}>
                        <dl className={styles.summaryDetails}>
                            <div className={styles.detail}>
                                <dt>Subtotal</dt>
                                <dd>$ {subtotal}</dd>
                            </div>

                            <div className={styles.detail}>
                                <dt>VAT 5%</dt>
                                <dd>$ {vat} </dd>
                            </div>

                            <div className={styles.detail}>
                                <dt>Discount</dt>
                                <dd>-$00</dd>
                            </div>

                            <div className={`${styles.detail} ${styles.total}`}>
                                <dt>Total</dt>
                                <dd>$ {total}</dd>
                            </div>
                        </dl>

                        <div className={styles.checkoutButton}>
                            <Link
                                href="/"
                                onClick={() => dispatch(removeAll())}
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;