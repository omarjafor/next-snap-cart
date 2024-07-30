import { fetchProductDetailsAction } from '@/actions';
import AddToCart from '@/components/add-to-cart';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import styles from './details.module.scss';

const ProductDetails = async({params}) => {
    const user = await currentUser();
    if(!user) redirect('/sign-in')

    const details = await fetchProductDetailsAction(params?.details);
    console.log(details);
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.gridContainer}>
                    <div className={styles.imageContainer}>
                        <img
                            src={details?.image}
                            alt={details?.title}
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.detailsContainer}>
                        <h2 className={styles.title}>{details?.title}</h2>
                        <p className={styles.price}>$ {details?.price}</p>
                        <h3 className={styles.category}>Category: {details?.category}</h3>
                        <h3 className={styles.category}>Brand: {details?.brand}</h3>
                        <h3 className={styles.description}>{details?.description}</h3>
                        <h3 className={styles.rating}>Rating: {details?.rating}</h3>
                        <h3 className={styles.stock}>Stock: {details?.stock}</h3>
                        <h3 className={styles.tags}>
                            #{details?.tags[0]}, #{details?.tags[1]}, #{details?.tags[2]}
                        </h3>
                        <AddToCart product={details} user={JSON.parse(JSON.stringify(user))} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;