import express, { Request, Response, NextFunction } from 'express';

import FormTemplate from '../db/models/FormTemplate'

// console.log({ models });
const router = express.Router()

router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const env = process.env.NODE_ENV || 'development';
  console.error(err.stack)
  if (env === 'development') {
    res.status(500).json({ error: { message: err.message, name: err.name, stack: err.stack }, status: 500 })
  } else {
    res.status(500).json({ error: { message: 'Something broke!' }, status: 500 })
  }
})

router.get('/', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.send('You look lost!')
  } else {
    const ft = FormTemplate.build({ title: 'test', description: 'test' })
    await ft.save();
    const fts = await FormTemplate.findAll()
    res.json(fts)
  }
})

router.get('/:slug', async (req, res) => {
  const ft = await FormTemplate.findOne({ where: { slug: req.params.slug } })
  res.json(ft)
})

router.post('/', async (req, res) => {
  const ftParams = req.body.formTemplate // or somthing like that
  const ft = FormTemplate.build({ title: ftParams.title, description: ftParams.description })
  await ft.save();
  res.json(ft)
})

router.patch('/:slug/', async (req, res) => {
  try {
    const ft = await FormTemplate.findOne({ where: { slug: req.params.slug } })
    if (!ft) { return res.status(404).json('Not found') }
    if (req.body.slug) { ft.set({ slug: req.body.slug }) }
    if (req.body.title) { ft.set({ slug: req.body.title }) }
    if (req.body.description) { ft.set({ slug: req.body.description }) }
    await ft.save()
    res.json(ft)
  } catch (error) {
    return res.status(500).json('Not found')
  }
})

export const formsRouter = router