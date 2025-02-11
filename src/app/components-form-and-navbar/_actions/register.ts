'use server';

import bcryptjs from 'bcryptjs';
import { redirect } from 'next/navigation';
import db from '../../../../lib/db';

export default async function register(formData: FormData) {
  const entries = Array.from(formData.entries());
  const { name, email, password } = Object.fromEntries(entries) as {
    name: string;
    email: string;
    password: string;
  };

  // Verifique se o usuário já existe
  const userExists = await db.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return {
      error:'Usuário já existe'
    };
  }

  const pswrd = await bcryptjs.hashSync(password, 10);
  await db.user.create({
    data: {
      name,
      email,
      password: pswrd,
    },
  });

  redirect('/login');
}