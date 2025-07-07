import { NextResponse } from 'next/server'
import Replicate from 'replicate'

export const runtime = 'edge'

export async function POST(req: Request) {
  const formData = await req.formData()
  const prompt = [
    formData.get('q0'),
    formData.get('q1'),
    formData.get('q2'),
    formData.get('q3'),
    formData.get('q4'),
    formData.get('q5'),
    formData.get('q6')
  ].join(', ')

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN || ''
  })

  const output = await replicate.run(
    "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
    {
      input: {
        prompt,
        width: 768,
        height: 768,
        num_outputs: 1
      }
    }
  )

  return NextResponse.json({ image: output[0] })
}
