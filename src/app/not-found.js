import React from 'react';
import Link from 'next/link';
import styles from './styles/styles.module.scss';

const NotFoundPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.errorCode}>404</h1>
            <p className={styles.errorMessage}>Page Not Found</p>
            <Link href="/" className={styles.homeLink}>
                Go Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
