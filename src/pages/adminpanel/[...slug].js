import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Page({ data }) {
    const router = useRouter();

    useEffect(() => {
        if (!data) {
            router.replace('/adminpanel/404');
        }
    }, [data]);

    if (!data) return null;

    return <div>{data.title}</div>;
}