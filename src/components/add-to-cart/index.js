'use client'

import { addToCart, removeFromCart } from "@/redux/cart";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import styles from './button.module.scss';

const AddToCart = ({ product, user }) => {
    const {cart} = useSelector(state => state);
    const dispatch = useDispatch();
    const handleAddCart = () => {
        const toastId = toast.loading('Adding to Cart...');
        dispatch(addToCart(product));
        toast.success('Add to Cart Successful', {id: toastId});
    }
    const handleRemoveCart = () => {
        const toastId = toast.loading('Removing to Cart...');
        dispatch(removeFromCart(product?._id));
        toast.success('Remove from Cart Successful', { id: toastId });
    }

    return (
        <button type='button' onClick={cart?.cartItem.some(item => item._id === product._id) ? handleRemoveCart : handleAddCart}
        disabled={product?.userId === user?.id && true}
            className={styles.button}>
            {
                cart?.cartItem.some(item => item._id === product._id) ? 'Remove from cart' : 'Add to cart'
            }
        </button>
    );
};

export default AddToCart;