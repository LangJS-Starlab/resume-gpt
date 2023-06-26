import { Icons } from '@/components/Icons';
import { Flex } from '@/components/ui/Flex';
import React from 'react';

export default function Loading() {
  return (
    <Flex className='flex h-full w-full flex-1' justify="center" align="center">
      <Icons.spinner className="absolute left-0 top-4 mr-2 h-4 w-4 animate-spin" />
    </Flex>
  );
}
    