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

export const createResume = async (profile: any) => {
  console.log("🚀 ~ file: open-ai.ts:23 ~ createResume ~ profile:", profile)
  let resumeData

  const prompt = prepareChatPrompt(
    `
    Github Profile: """
    {{profileString}}
    """

    Based on the Github Profile above, generate a json following JSON Resume standard as defined at https://github.com/jsonresume/resume-schema/blob/master/schema.json
    
    The json response should contains all the keys, you should fill in as much information as possible.
    You should grab the data from the linkedin profile: https://www.linkedin.com/in/${profile.login}/ if any to fill in the missing information.
  `,
    async response => {
      const results = parseOpenAIJsonResponse(response)
  
      if (!results.data) {
        return null
      }
  
      return results.data
    }
  )

  const profileString = cleanJsonString(JSON.stringify(profile))

  const request: CreateChatCompletionRequest = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt.text.replaceAll('{{profileString}}', profileString) }],
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
