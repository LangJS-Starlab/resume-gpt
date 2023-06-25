import {Configuration, CreateChatCompletionRequest, CreateChatCompletionResponse, OpenAIApi} from 'openai';
import { env } from '@/env.mjs';
import { parseOpenAIJsonResponse } from './utils';
import { GithubProfile } from 'next-auth/providers/github';

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

export const createResume = async (profile: GithubProfile) => {
  console.log("🚀 ~ file: open-ai.ts:23 ~ createResume ~ profile:", profile)
  let resumeData
  
  const prompt = prepareChatPrompt(
    `
    Based on the Github Profile data below, generate a json following JSON Resume standard as defined at https://raw.githubusercontent.com/jsonresume/resume-schema/master/schema.json
    The json response should contains all the keys, you should fill in as much information as possible.
    The basic summary should be filled based on: ${profile.bio}, it should sound more professional and in 6,7 sentences
    The basic title should be filled in based on: ${profile.bio}, but only in 2, 3 words
    The work experiences should be filled in based on: ${profile.company} and ${profile.bio}

    Github Profile: """
    {{profileString}}
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

  const profileString = JSON.stringify(profile)

  const request: CreateChatCompletionRequest = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt.text.replaceAll('{{profileString}}', profileString) }],
    temperature: 0,
  }
  try {
    const completion = await openai.createChatCompletion(request);
    resumeData = await prompt.parseResponse(completion.data)
  } catch (error) {
    return {}
  }
    
  return resumeData
}
