import type { NextApiRequest, NextApiResponse } from 'next'
 
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient()
export   default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  p
) {
    // console.log(req.query.id)
 let users=  await prisma.user.findFirst({where:{id:Number.parseInt( req.query.id as string)}});
  res.status(200).json(users)
}