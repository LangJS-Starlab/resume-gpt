// import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/AlertDialog';
import { Flex } from '@/components/ui/Flex';
import React from 'react';

export default function Loading() {
  return (
    <Flex className='flex-1' justify="center" align="center">
      <p>We are anylizing your profile data and generating your resume. This may take a few seconds.</p>
    </Flex>
  )
}