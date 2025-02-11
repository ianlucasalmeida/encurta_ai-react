/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from "react";
import { signUpSchema } from "../../../../lib/zod";
import register from "../_actions/register";
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";


export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };
      setIsButtonDisabled(!(updatedFormData.name && updatedFormData.email && updatedFormData.password));
      return updatedFormData;
    });
  };

  const [errors, setErrors] = React.useState<any>();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { name, email, password } = Object.fromEntries(formData.entries()) as { name: string, email: string, password: string };
    const verifica = signUpSchema.safeParse({ name, email, password });
    if (verifica.error) {
      setErrors(verifica.error.errors);
      console.log(verifica.error.errors)
      return;
    }
    const response = await register(formData);
    if (response?.error) {
      setErrors(response.error);
      console.log(response)
    }
  }
  return (
    <div className="register-container">
      <div className="register-card">
        <img src="/rede.png" alt="Logo" className="logo" />
        <h2 className="register-title">Criar Conta</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            required
            className="register-input"
          />
          {errors?.find((error: any) => error.path[0] === 'name') && (
            <p className="error-message">{errors.find((error: any) => error.path[0] === 'name').message}</p>
          )}
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
            className="register-input"
          />
          {errors?.find((error: any) => error.path[0] === 'email') && (
            <p className="error-message">{errors.find((error: any) => error.path[0] === 'email').message}</p>
          )}
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
            className="register-input"
          />
          {errors?.find((error: any) => error.path[0] === 'password') && (
            <p className="error-message">{errors.find((error: any) => error.path[0] === 'password').message}</p>
          )}
          <button type="submit" disabled={isButtonDisabled} className="register-button">
            Cadastrar
          </button>
        </form>
        <p className="register-footer">
          Já tem uma conta?{' '}
          <a href="/login" className="register-link">
            Entrar
          </a>
        </p>
      </div>
    </div>
  )
}