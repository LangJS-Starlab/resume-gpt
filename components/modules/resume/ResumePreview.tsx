import React from 'react';
import { useResumePdf } from '@/lib/queries';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Flex } from '@/components/ui/Flex';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Icons } from '@/components/Icons';

type ResumePreviewProps = {
  resumeHtmlData?: string
  isLoading: boolean
}

function downloadPdfFromBase64(base64Data: string) {
  const pdfWindow = window.open("")
  pdfWindow?.document.write("<iframe frameBorder='0' width='100%' height='100%' src='"+encodeURI(base64Data)+"'></iframe>")
}

export const ResumePreview = ({ resumeHtmlData, isLoading }: ResumePreviewProps) => {
  const { refetch, isLoading: isDownloadingPdf } = useResumePdf({
    enabled: false,
    onSuccess(data) {
      downloadPdfFromBase64(data.data)
    },
  })

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
        <Button
          variant="secondary"
          size="sm"
          onClick={() => refetch()}
        >
          {isDownloadingPdf ?<Icons.spinner size={22}/> : (
            <Flex>
              <Icons.download size={22} className="mr-2 h-4 w-4" />
              Download PDF
            </Flex>
          )}
        </Button>
      </Flex>
      <div dangerouslySetInnerHTML={{__html: resumeHtmlData}}/>
    </ScrollArea>
  );
}