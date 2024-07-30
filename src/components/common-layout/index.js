
import ReduxProvider from "@/provider";
import { currentUser } from "@clerk/nextjs/server";

async function CommonLayout({ children }) {
    const user = await currentUser();

    return <ReduxProvider user={JSON.parse(JSON.stringify(user))}>
        {children}
    </ReduxProvider>
}

export default CommonLayout;