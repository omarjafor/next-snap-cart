import CartItem from "@/components/cart-item";
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const Cart = async() => {
    const user = await currentUser();
    if (!user) redirect('/sign-in')
    return (
        <>
            <CartItem />
        </>
    );
};

export default Cart;