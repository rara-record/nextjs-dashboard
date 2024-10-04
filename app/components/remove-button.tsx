'use client';

import { startTransition } from 'react';
import { deletePerson } from '../actions/person';

export default function RemoveButton({ name }: { name: string }) {
  const handleDelete = () => {
    startTransition(async () => {
      const result = await deletePerson(name);
      if (result.status === 500) {
        console.error(result.err);
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700"
    >
      Remove
    </button>
  );
}
