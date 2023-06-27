import React from 'react';
import { useResumeTemplate } from '@/lib/queries';
import { buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';
import { Flex } from '@/components/ui/Flex';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Icons } from '@/components/Icons';

type ResumePreviewProps = {
  resumeHtmlData?: string
  isLoading: boolean
}

export const ResumePreview = ({ resumeHtmlData, isLoading }: ResumePreviewProps) => {
  if (!resumeHtmlData) {
    return null
  }

  return (
    <ScrollArea  className="relative h-full w-full">
      <Flex justify="end" className='absolute right-2 top-4 mb-2 w-full'>
        {
          isLoading && (
            <div className='absolute left-6 top-1 mr-2 flex items-center'>
              <Icons.spinner size={22} className="animate-spin" />
            </div>
          )
        }
        <Link
          href="/resume/download"
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={buttonVariants({
              variant: "secondary",
              size: "sm",
            })}
          >
            <Icons.download size={22} className="mr-2 h-4 w-4" />
          Download PDF
          </div>
        </Link>
      </Flex>
      <div dangerouslySetInnerHTML={{__html: resumeHtmlData}}/>
    </ScrollArea>
  );
}