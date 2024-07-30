import { SignIn } from "@clerk/nextjs";
import style from './style.module.scss'

export default function Page() {
    return <div className={style.container}>
        <SignIn />
    </div>;
}