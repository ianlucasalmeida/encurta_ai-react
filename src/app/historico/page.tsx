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
        <div className="min-h-screen bg-gray-50">
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-64">
                    <Sidebar usuario={usuario} />
                </div>
                
                <div className="flex-1 px-4 py-8 md:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
                                Histórico de Links
                            </h1>
                            <hr className="my-6" />
                            
                            <div className="grid gap-6">
                                {links.map(link => (
                                    <div 
                                        key={link.id} 
                                        className="bg-gray-50 rounded-lg border border-gray-200 p-4 sm:p-6 transition-shadow hover:shadow-md"
                                    >
                                        <div className="space-y-4">
                                            <div className="break-words">
                                                <h3 className="text-sm font-semibold text-gray-600 mb-2">URL Original:</h3>
                                                <a 
                                                    href={`localhost:3000/${link.id}`}
                                                    target="_parent"
                                                    className="text-blue-600 hover:text-blue-800 break-all transition-colors"
                                                >
                                                    {link.url}
                                                </a>
                                            </div>
                                            
                                            <div className="bg-white rounded-lg p-4 space-y-4 sm:space-y-0 sm:flex sm:justify-between sm:items-center">
                                                <div className="flex items-center justify-center sm:justify-start">
                                                    <span className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700">
                                                        Acessos: {Number(link.accessCount)}
                                                    </span>
                                                </div>
                                                
                                                <div className="text-center sm:text-right">
                                                    <span className="block text-sm font-semibold text-gray-600 mb-1">
                                                        Link encurtado:
                                                    </span>
                                                    <a 
                                                        className="text-blue-600 hover:text-blue-800 text-sm break-all transition-colors"
                                                        href={`http://localhost:3000/${link.id}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        localhost:3000/{link.id}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}