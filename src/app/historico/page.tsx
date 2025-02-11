/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { pegaLink } from "@/components/linkCreate";
import Sidebar from "@/components/Sidebar";
import getSession from "@/lib/auth-server-request";
import { Link } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Historico() {
    const [links, setLinks] = useState<Link[]>([]);
    const [usuario, setUsuario] = useState<any | undefined>();

    useEffect(() => {
        async function fetchData() {
            const us = await getSession();
            if (us) {
                setUsuario(us.user);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            if (usuario !== undefined && usuario?.id) {
                const data = await pegaLink(usuario.id);
                setLinks(data);
            }
        }
        fetchData();
    }, [usuario]);

    return (
        <div className="content container mx-auto px-4">
            <Sidebar usuario={usuario} />
            <div className="card p-4 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
                <h1 className="text-center text-xl md:text-2xl font-bold text-gray-800 mb-4">Histórico de Links</h1>
                <hr className="my-4" />
                
                <div className="flex flex-col gap-4">
                    {links.map(link => (
                        <div key={link.id} className="p-4 bg-gray-100 rounded-lg border border-gray-300">
                            <div className="mb-2">
                                <strong>URL Original:</strong>
                                <a 
                                    href={`localhost:3000/${link.id}`}
                                    target="_parent"
                                    className="block text-blue-600 break-words mt-1 hover:underline"
                                >
                                    {link.url}
                                </a>
                            </div>
                            
                            <div className="flex flex-col md:flex-row justify-between items-center mt-3 p-3 bg-white rounded-md">
                                <span className="bg-gray-200 px-3 py-1 rounded-md text-sm">
                                    Acessos: {Number(link.accessCount)}
                                </span>
                                <div className="mt-2 md:mt-0">
                                    <strong>Link encurtado: </strong>
                                    <a 
                                        className="text-blue-600 underline"
                                        href={`http://localhost:3000/${link.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        localhost:3000/{link.id}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
