import { fetchProductForUser } from "@/actions";
import AddNewProduct from "@/components/add-new-product";
import ProductCard from "@/components/product-card";
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import styles from './account.module.scss';

const Account = async () => {
    const user = await currentUser();
    if (!user) redirect('/sign-in')
    const products = await fetchProductForUser(user?.id);

    return (
        <div>
            <div className={styles.container}>
                <div>
                    <h1 className={styles.heading}>Browse Your Product Here</h1>
                </div>
                <div className={styles.addNewProduct}>
                    <AddNewProduct user={JSON.parse(JSON.stringify(user))} />
                </div>
            </div>
            <span className={styles.divider}>
                <span className={styles.text}>Snap Up Great Deals by SnapCart</span>
            </span>
            <div className={styles.grid}>
                {
                    products && products.length > 0 ? products.map((product, idx) => (
                        <ProductCard product={product} key={idx} user={JSON.parse(JSON.stringify(user))} />
                    )) : <p className={styles.noProducts}>No Product Found</p>
                }
            </div>
        </div>
    );
};

export default Account;