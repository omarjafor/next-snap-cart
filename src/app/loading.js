import styles from './styles/loading.module.scss';

const Loading = () => {
    return (
        <div className={styles.loadingSkeleton}>
            <div className={styles.avatarContainer}>
                <span className={styles.avatar}></span>
            </div>

            <div className={styles.contentContainer}>
                <p className={`${styles.line} ${styles.lineShort}`}></p>

                <ul className={styles.lineList}>
                    <li className={styles.lineItem}></li>
                    <li className={styles.lineItem}></li>
                    <li className={styles.lineItem}></li>
                    <li className={styles.lineItem}></li>
                </ul>
            </div>
        </div>
    );
};

export default Loading;