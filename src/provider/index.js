'use client'

import Header from "@/components/header"
import store from "@/redux/store"
import { Provider } from "react-redux"
import styles from './styles.module.scss';
import { Toaster } from "react-hot-toast";

export default function ReduxProvider({ children, user }) {
    return <div className={styles.container}>
        <Provider store={store}>
            <Header user={user} />
            <main>{children}</main>
            <Toaster />
        </Provider>
    </div>
}