import React, { useState } from 'react';
import { ResetErrorBoundary } from '.';
import { Button } from '../Button';
import { Text } from '../Text';

export default {
  title: 'Utils/ResetErrorBoundary',
  component: ResetErrorBoundary,
};

export const Preview = () => {
  const [count, setCount] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
    if (shouldThrow) {
      setCount(count + 1);
      throw new Error('💣');
    } else {
      return <Text as="p">Количество ошибок: {count}</Text>;
    }
  }

  return (
    <ResetErrorBoundary reset={() => setError(null)}>
      <>
        <Bomb shouldThrow={Boolean(error)} />
        <div>
          <Button onClick={() => setError(new Error('💣'))}>Вызвать ошибку</Button>
        </div>
      </>
    </ResetErrorBoundary>
  );
};
