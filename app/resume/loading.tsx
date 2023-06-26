import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/AlertDialog';
import React from 'react';

export default function Loading() {
  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-center'>Your resume is being generated</AlertDialogTitle>
          <AlertDialogDescription className='text-center'>
            We are anylizing your profile data and generating your resume. This may take a few seconds.
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}