'use server';
import db from "../../lib/db";

export async function shortenLink(url: string, userId: string) {
  try {
    const result = await db.link.create({
      data: {
        id: await criaIdUnico(),
        url: url,
        accessCount: 0,
        userId: userId
      }
    });
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message as string, data: null };
  }

}

const criaAleatorio = () => {
  const characters = '0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const procuraSeExisteNoBancoUmIdIdentico = async (id: string) => {
  const result = await db.link.findUnique({
    where: {
      id: id
    }
  });
  if (result) {
    return true;
  }
  return false;
}

const criaIdUnico = async () => {
  let id = criaAleatorio();
  while (await procuraSeExisteNoBancoUmIdIdentico(id)) {
    id = criaAleatorio();
  }
  return id;
}

export async function pegaLink(params: string) {
  return await db.link.findMany({
    where: {
      userId: params
    }
  });
}

export async function pegaUltimos3Links(params: string) {
  return await db.link.findMany({
    where: {
      userId: params
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 3
  });
}

export const procuraPorId = async (id: string) => {
  const lnk =  await db.link.findUnique({
    where: {
      id: id
    }
  });
  if(lnk){
    await db.link.update({
      where: {
        id: id
      },
      data: {
        accessCount: Number(lnk.accessCount) + 1
      }
    });
    return lnk;
  }else{
    return null;
  }
}