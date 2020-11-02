import Head from 'next/head';
import Home from '../containers/Home';

export default function Index() {
    return <>
        <Head>
            <title>Main</title>
        </Head>
        <Home />
    </>;
}
