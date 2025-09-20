import OpenAI from 'openai'
import fs from 'fs'

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
})

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content:
          "Generate a list of 5 diverse and creative system instructions for an AI agent named 'Sentinel' that guards a prize pool. Each instruction should define a unique role and instructions for guarding against common attackers such as impersonation, prompt injection, social etc. The roles should span various diverse themes. Output as a JSON list of strings.",
      },
    ],
    model: 'deepseek-chat',
  })

  const content = completion.choices[0].message.content
  console.log(content)
  //   fs.writeFileSync('defender_instructions.json', content!)
}

main()
