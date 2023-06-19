import {Configuration, CreateChatCompletionRequest, CreateChatCompletionResponse, OpenAIApi} from 'openai';
import { env } from '@/env.mjs';
import { Profile } from 'next-auth';
import { cleanJsonString, parseOpenAIJsonResponse } from './utils';

const config = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

function prepareChatPrompt<T, ExtraArgs = unknown>(
  prompt: string,
  parseResponse: (response: CreateChatCompletionResponse, extraArgs?: ExtraArgs) => Promise<T | null>
) {
  return {
    text: prompt.trim(),
    parseResponse
  }
}

export const createResume = async (profile: Profile) => {
  let resumeData

  const prompt = prepareChatPrompt(
    `
  Convert this resume to the JSON Resume standard as defined at https://jsonresume.org/schema/
  
  Resume: """
  {{resumeText}}
  """
  `,
    async response => {
      const results = parseOpenAIJsonResponse(response)
  
      if (!results.data) {
        return null
      }
  
      return results.data
    }
  )

  const resumeText = cleanJsonString(JSON.stringify(profile))

  const request: CreateChatCompletionRequest = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt.text.replaceAll('{{resumeText}}', resumeText) }],
    temperature: 0,
    user: profile.name,
  }
  try {
    const completion = await openai.createChatCompletion(request);
    resumeData = await prompt.parseResponse(completion.data)
  } catch (error) {
    return {}
  }
    
  return resumeData
}
