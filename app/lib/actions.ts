'use server';

import { z } from 'zod';
import { format } from 'date-fns';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(), //  amount 필드는 유형을 검증하는 동시에 문자열을 숫자로 강제(변경)하도록 특별히 설정됩니다.
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  // const { customerId, amount, status } = Object.fromEntries(
  //   formData.entries()
  // );

  // CreateInvoice에 전달하여 유형을 확인할 수 있습니다.
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // 일반적으로 JavaScript 부동 소수점 오류를 제거하고 정확성을 높이기 위해
  // 데이터베이스에 금전적 가치를 센트 단위로 저장하는 것이 좋습니다
  // 금액을 센트로 변환하려면 금액을 100으로 곱하면 됩니다.
  const amountInCents = amount * 100;

  const serverDate = new Date(); // 서버의 현재 시간
  const date = format(serverDate, 'yyyy-MM-dd'); // 송장 생성 날짜

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  // Next.js에는 한동안 사용자 브라우저에 경로 세그먼트를 저장하는 클라이언트 측 라우터 캐시가 있습니다.
  // 프리페칭과 함께 이 캐시를 사용하면 사용자가 서버에 대한 요청 수를 줄이면서 경로 간을 빠르게 탐색할 수 있지만,
  // 청구서 경로에 표시된 데이터를 업데이트하고 있으므로 이 캐시를 지우고 서버에 대한 새 요청을 트리거해야 합니다.
  revalidatePath('/dashboard/invoices');

  // 데이터베이스가 업데이트되면 /dashboard/invoices 경로의 유효성이 다시 검사되고 서버에서 새로운 데이터를 가져옵니다.
  // 이 시점에서 사용자를 다시 /dashboard/invoices 페이지로 리디렉션하려고 합니다.
  redirect('/dashboard/invoices');
}
