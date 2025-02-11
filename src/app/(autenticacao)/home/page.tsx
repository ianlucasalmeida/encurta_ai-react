/* eslint-disable @next/next/no-img-element */
'use client';
import { pegaUltimos3Links } from '@/components/linkCreate';
import getSession from '@/lib/auth-server-request';
import { Link } from '@prisma/client';
import { useEffect, useState } from 'react';
import ShortenerForm from '../../../components/ShortenerForm';
import Sidebar from '../../../components/Sidebar';
import UrlList from '../../../components/UrlList';

const HomePage = () => {
    const [urls, setUrls] = useState<Link[]>([]);
    const [usuario, setUsuario] = useState<any|undefined>();

    const handleShorten = (shortUrl: Link) => {
        if(urls.length === 3)
            urls.pop();
        setUrls((prevUrls) => [shortUrl, ...prevUrls]);
    };

    useEffect(() => {
        async function fetchData() {
            const session = await getSession();
            if (session) {
                setUsuario(session.user);
                if (session.user?.id) {
                    const data = await pegaUltimos3Links(session.user.id);
                    setUrls(data);
                }
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            if (usuario !== undefined && usuario?.id) {
                // Futuras implementações aqui
            }
        }
        fetchData();
    }, [usuario]);

    return (
        <div className="home-container">
            <Sidebar usuario={usuario}/>
            
            <div className="main-content">
                <header className="header">
                    <img 
                        src="/rede.png" 
                        alt="Logo" 
                        className="logo"
                    />
                    <h1 style={{ 
                        textAlign: 'center',
                        margin: '20px 0',
                        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
                    }}>
                        Bem-vindo ao Encurta Ai!
                    </h1>
                </header>

                <section className="shortener-section">
                    <div className="shorten-form">
                        <ShortenerForm onShorten={handleShorten} usuario={usuario} />
                    </div>
                </section>

                <section className="url-list-section" style={{
                    maxWidth: '800px',
                    margin: '20px auto',
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                    <h2 style={{
                        marginBottom: '20px',
                        fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                        borderBottom: '2px solid #f0f0f0',
                        paddingBottom: '10px'
                    }}>
                        Últimos Links Encurtados
                    </h2>
                    <UrlList urls={urls} />
                </section>
            </div>
        </div>
    );
};

export default HomePage;