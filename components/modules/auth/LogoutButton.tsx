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
    <Button variant="ghost" onClick={onSignOut} className="w-full justify-start">
      <Icons.logout className="mr-2 h-5 w-5" />
      <span>Log out</span>
    </Button>
  )
}