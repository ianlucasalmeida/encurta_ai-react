/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from "react";
import { CredentialsSchema } from "../../../../lib/zod";
import login from "../_actions/login";

//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";


export default function LoginForm(){
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('handleSubmit')
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("formData", formData.get('email'), formData.get('password'))
    const {email, password } = Object.fromEntries(formData.entries()) as { email: string, password: string };
    const validCredentials = await CredentialsSchema.safeParse({ email, password });
    if(validCredentials.error){
      setError(validCredentials.error.errors[0].message);
      console.log(validCredentials.error.errors)
    }
    const response = await login(formData);
    if(response?.error){
      setError(response.error);
      console.log(response)
    }
  }
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };
      setIsButtonDisabled(!(updatedFormData.email && updatedFormData.password));
      return updatedFormData;
    });
  };

    return (
      <div className="login-container">
      <div className="login-card">
        <img src="/rede.png" alt="Logo" className="logo" />
        <h2 className="login-title">Entrar</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            id="email"
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
            className="login-input"
          />
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
            className="login-input"
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" disabled={isButtonDisabled} className="login-button">
            Entrar
          </button>
        </form>
        <p className="login-footer">
          Não tem uma conta?{' '}
          <a href="/register" className="login-link">
            Criar Conta
          </a>
        </p>
      </div>
    </div>
      )
}