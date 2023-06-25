import { clsx, type ClassValue } from "clsx"
import { CreateChatCompletionResponse } from "openai";
import { twMerge } from "tailwind-merge"
import isPlainObject from 'lodash/isPlainObject'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseOpenAIJsonResponse<T extends Record<string, unknown>>(
  response: CreateChatCompletionResponse
): { data: T | null; isComplete: boolean } {
  const text = response.choices[0]?.message?.content?.trim() ?? null
  
  if (!text) {
    return { data: null, isComplete: false }
  }
  
  const stoppedAtMaxTokens = response.choices[0].finish_reason === 'max_tokens'
  let data: T | null = null
  let isComplete: boolean | null = null
  
  try {
    const json = repairJSON<T>(text)
    data = json.data
    isComplete = json.isComplete
  } catch (e) {
    return { data: null, isComplete: false }
  }
  
  if (!data || !isPlainObject(data)) {
    return { data: null, isComplete: false }
  }
  
  return { data, isComplete: isComplete && !stoppedAtMaxTokens }
}

export function repairJSON<T>(json: string): { data: T; isComplete: boolean } {
  try {
    return { data: JSON.parse(json), isComplete: true }
  } catch (error) {
    // ai outputs json line by line, so we can remove the incomplete last line and hanging comma to get to a more predictable state
    const adjusted = json.trim().split('\n').slice(0, -1).join('\n').replace(/,$/, '')
  
    const closingTags = [
      '}',
      ']}',
      '}]}',
      ']}]}',
      '}]}]}',
      ']}]}]}',
      '}]}]}]}',
      ']}]}]}]}',
      '}]}]}]}]}',
      ']}]}]}]}]}',
      '}]}]}]}]}]}',
      ']}]}]}]}]}]}',
      '}]}]}]}]}]}]}',
      ']}]}]}]}]}]}]}'
    ]
  
    for (const tags of closingTags) {
      try {
        return { data: JSON.parse(`${adjusted}${tags}`), isComplete: false }
      } catch (error) {
        // ignore
      }
    }
  
    // if repairing the JSON data fails, throw an error
    throw error
  }
}