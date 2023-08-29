// OPEN AI TEST
import OpenAI from 'openai'
import {OpenAIStream, StreamingTextResponse} from 'ai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = 'edge'

export async function POST(req: Request) {
  const {messages} = await req.json()
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  })
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}

// HUGGING FACE TEST
// import {HfInference} from '@huggingface/inference'
// import {HuggingFaceStream, StreamingTextResponse} from 'ai'
// import {experimental_buildOpenAssistantPrompt} from 'ai/prompts'

// const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

// export const runtime = 'edge'

// export async function POST(req: Request) {
//   const {messages} = await req.json()

//   const response = await Hf.textGenerationStream({
//     model: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
//     inputs: experimental_buildOpenAssistantPrompt(messages),
//     parameters: {
//       max_new_tokens: 200,
//       // @ts-ignore (this is a valid parameter specifically in OpenAssistant models)
//       typical_p: 0.2,
//       repetition_penalty: 1,
//       truncate: 1000,
//       return_full_text: false,
//     },
//   })

//   if (!response) {
//     return new Response('No response from Hugging Face')
//   }

//   const stream = HuggingFaceStream(response)

//   return new StreamingTextResponse(stream)
// }
