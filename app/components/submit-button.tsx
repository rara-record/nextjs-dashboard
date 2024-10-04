'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus(); // form에 상태에 따라 true, false를 반환하는 hook

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Add Person / {pending.toString()}
    </button>
  );
}
