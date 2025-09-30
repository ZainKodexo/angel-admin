'use client';
import { Button, PageContainer } from '@/shared/components';
import { useModalStore } from '@/shared/store';

export default function Home() {
  const { openModal } = useModalStore();

  return (
    <PageContainer>
      <Button onClick={() => openModal({ type: 'ExampleOne' })}>Open</Button>
    </PageContainer>
  );
}
