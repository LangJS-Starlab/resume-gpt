import React from 'react';
import { useResumePdf } from '@/lib/queries';
import { Button } from '@/components/ui/Button';
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
  pdfWindow?.document.close();
  setTimeout(() => {
    pdfWindow?.focus();
    pdfWindow?.print(); 
  }, 100);
}

export const ResumePreview = ({ resumeHtmlData, isLoading }: ResumePreviewProps) => {
  const { refetch, isLoading: isDownloadingPdf } = useResumePdf({
    enabled: false,
    onSuccess(data) {
      downloadPdfFromBase64(data.data)
    },
  })

  const onPrintButtonClick = () => {
    refetch()
  }

  if (!resumeHtmlData) {
    return null
  }

  return (
    <ScrollArea  className="relative h-full w-full">
      <Flex justify="end" className='absolute mb-2 h-10 w-full bg-background shadow-md'>
        {
          isLoading ? (
            <div className='absolute left-0 top-1 mr-2 flex items-center justify-center'>
              <Icons.spinner size={18} className="animate-spin" />
              <p className='ml-2 mt-0'>Saving</p>
            </div>
          ) : <div className='absolute left-0 top-1 mr-2 flex items-center justify-center'>
            <Icons.checkCircle size={18} />
            <p className='ml-2 mt-0'>Saved</p>
          </div>
        }
        <Button
          variant="outline"
          size="sm"
          className='absolute'
          onClick={onPrintButtonClick}
        >
          <Flex>
            {isDownloadingPdf ?<Icons.spinner size={22} className="mr-2 h-4 w-4"/> : (
              <Icons.printer size={22} className="mr-2 h-4 w-4" />
            )}
              Print Resume
          </Flex>
        </Button>
      </Flex>
      <div className='pt-10' dangerouslySetInnerHTML={{__html: resumeHtmlData}}/>
    </ScrollArea>
  );
}