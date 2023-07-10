import React from 'react';
import { Icons } from '@/components/Icons';
import { Flex } from '@/components/ui/Flex';

export default function Loading() {
  return (
    <div className="fixed left-1/2 top-1/2">
      <Flex direction="column" justify="center" align="center">
        <Icons.spinner size={40} />
        <p className='m-2'>Loading data...</p>
      </Flex>
    </div>
  );
}
    