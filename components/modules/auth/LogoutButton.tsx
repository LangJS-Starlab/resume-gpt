'use client';

import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/Button';
import { signOut } from 'next-auth/react';
import React from 'react';

export default function LogoutButton() {
  const onSignOut = () => {
    signOut()
  }
      
  return (
    <Button variant="link" onClick={onSignOut}>
      <Icons.logout className="h-5 w-5" />
    </Button>
  )
}