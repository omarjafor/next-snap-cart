'use client'

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import styles from './header.module.scss';

const Header = ({ user }) => {

    const menuItem = [
        {
            label: 'Home',
            path: '/',
            show: true
        },
        {
            label: 'Product',
            path: '/product',
            show: true
        },
        {
            label: 'Login',
            path: '/sign-in',
            show: !user
        },
        {
            label: 'Sign Up',
            path: '/sign-up',
            show: !user
        },
        {
            label: 'Cart',
            path: '/cart',
            show: user
        },
        {
            label: 'Account',
            path: '/account',
            show: user
        }
    ]

    return (
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <Image src={'/icon.png'} width={48} height={48} alt="Logo" />
                <Link className={styles.logo} href={'/'}>SnapCart</Link>
            </div>
            <nav className={styles.headerNav}>
                {
                    menuItem.map((item, idx) => item.show ?
                        <Link key={idx} href={item.path} className={styles.navLink}>
                            {item.label}
                        </Link>
                        : null)
                }
                <UserButton afterSignOutUrl="/"/>
            </nav>
        </header>
    );
};

export default Header;
