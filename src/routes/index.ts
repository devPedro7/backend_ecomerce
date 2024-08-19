import { FastifyInstance } from 'fastify'
import {z, ZodError} from 'zod'

import dayjs from 'dayjs'

import prisma from '../prisma'

export async function Routes(app: FastifyInstance) {
    app.post('/product', async (req, res) => {
        const createProduct = z.object({
            type: z.string(),
            name: z.string(),
            session: z.string(),
            category: z.string(),
            brand: z.string(),
            gender: z.string(),
            price: z.number(),
            discount: z.number().optional(),
            size: z.string(),
            image: z.string(),
            description: z.string(),
            slug: z.string()
        })

        try {
            const { type, name, session, category, brand, gender, price, discount, size, image, description, slug } = createProduct.parse(req.body)
            const today = dayjs().toDate()
            const possibleProduct = await prisma.product.findUnique({
                where: {slug}
            })

            if (possibleProduct) {
                throw new Error('O Produto já está cadastrado!')
            }

            await prisma.product.create({
                data: {
                    type,
                    name,
                    session,
                    category,
                    brand,
                    gender,
                    price,
                    discount,
                    size,
                    image,
                    description,
                    slug,
                    created_at: today
                }
            })

            return res.status(200).send({message: 'Produto criado com sucesso'})

        } catch (err: any) {
          if (err instanceof ZodError) {
            const issueError = {
              validationError: true,
              message: 'Error de validação',
              fields: [] as Array<string | number>
            }
            err.issues && err.issues.forEach(issue => {
              issue.path.forEach(item => {
                issueError.fields.push(item)
              })
            })
            return res.status(400).send(issueError)
          }
          return res.status(500).send({message: err.message})
        }
    })

    app.get('/products', async (req, res) => {
      try {
        const products = await prisma.product.findMany({
          select: {
            id: true,
            type: true,
            name: true,
            session: true,
            category: true,
            brand: true,
            gender: true,
            price: true,
            discount: true,
            size: true,
            image: true,
            description: true,
            slug: true,
          }
        })

        return res.status(200).send(products)

      } catch (eer: any) {
        return res.status(500).send({message: eer.message})
      }
    })

    app.get('/product/:slug', async (req, res) => {
      try {
        const { slug } = req.params as { slug: string }
        const product = await prisma.product.findUnique({
          where: { slug }
        })

        if (!product) {
          return res.status(404).send({message: 'Produto não encontrado.'})
        }

        return res.status(200).send(product)

      } catch (eer: any) {
        return res.status(500).send({message: eer.message})
      }
    })

}
