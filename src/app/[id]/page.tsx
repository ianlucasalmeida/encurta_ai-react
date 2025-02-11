/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { procuraPorId } from '@/components/linkCreate';
import { Link } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const [link, setLink] = useState<Link | null>(null);
    const id = params.id;
    useEffect(() => {
        async function fetchData() {
            if (id) {
                if (typeof id === 'string') {
                    const lnk: Link | null = await procuraPorId(id);
                    console.log(lnk);
                    if (lnk !== null) {
                        setLink(link);
                        
                        router.push(lnk.url);
                    } else if(lnk === null){
                        if(id==="not-found"){
                            router.push('/not-found');
                        }
                    }else {
                        if(id!=="not-found"){
                            router.push('/not-found');
                        }
                    }
                }
            }
        }
        fetchData();
    }, [id, router]);

    return (
        <div>
            {link ? (
                <p>Redirecting to {link.url}...</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Page;