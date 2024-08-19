import { fastify } from 'fastify'
import cors from '@fastify/cors'

import { Routes } from './routes'

const app = fastify()

app.register(cors)
app.register(Routes)

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
    console.log('Servidor iniciado!')
})
