import express, { Request, Response, NextFunction } from 'express';

import Form from '../db/models/Form'

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
    throw new Error('This route is not available in production')
  } else {
    // const form = Form.build({ title: 'test', description: 'test' })
    // await form.save();
    const forms = await Form.findAll()
    res.json({ forms })
  }
})

router.get('/:slug', async (req, res) => {
  const form = await Form.findOne({ where: { slug: req.params.slug } })
  res.json({ form })
})

router.post('/', async (req, res) => {
  console.log(req.body)
  const formParams = req.body.form // or somthing like that
  const form = Form.build({
    title: formParams.title,
    description: formParams.description,
    slug: formParams.slug,
    acceptingSubmissions: formParams.acceptingSubmissions
  })
  await form.save();
  res.json({ form })
  // res.json({ok: true})
})

router.patch('/:slug/', async (req, res) => {
  try {
    const form = await Form.findOne({ where: { slug: req.params.slug } })
    if (!form) { return res.status(404).json({ error: 'Not found' }) }
    if (req.body.slug) { form.set({ slug: req.body.slug }) }
    if (req.body.title) { form.set({ slug: req.body.title }) }
    if (req.body.description) { form.set({ slug: req.body.description }) }
    await form.save()
    res.json({ form })
  } catch (error) {
    return res.status(500).json({ error: 'Not found' })
  }
})

export const formsRouter = router