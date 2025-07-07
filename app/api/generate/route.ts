import { NextResponse } from 'next/server';
import Replicate from 'replicate';

export const runtime = 'edge';

export async function POST(req: Request) {
  const formData = await req.formData();
  const selfie = formData.get("selfie") as File;
  const answers = JSON.parse(formData.get("answers") as string);

  const buffer = await selfie.arrayBuffer();
  const selfieBase64 = Buffer.from(buffer).toString("base64");

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
  });

  const prompt = `A fantasy portrait with the following details: 
    Location: ${answers[0]}, Outfit: ${answers[1]}, Mood: ${answers[2]}, 
    Companion: ${answers[3]}, Time: ${answers[4]}, Supernatural: ${answers[5]}, 
    Item: ${answers[6]}.`;

  const output = await replicate.run(
    "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
    {
      input: {
        prompt,
        image: `data:image/jpeg;base64,${selfieBase64}`,
        width: 768,
        height: 768,
        guidance_scale: 7.5,
        num_inference_steps: 25
      }
    }
  );

  return NextResponse.json({ imageUrl: output[0] });
}
