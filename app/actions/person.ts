'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function addPerson(formData: FormData) {
  try {
    const name = (formData.get('personName') as string) || '';

    if (name === '') {
      throw new Error('name is empty');
    }

    await sql`INSERT INTO person (name) VALUES (${name})`;
    revalidatePath('/');
  } catch (err) {
    return {
      err,
      status: 500,
    };
  }
}

// export async function deletePerson(name: string) {
//   try {
//     await sql`DELETE FROM person (name) WHERE personName = ${name}`;
//     revalidatePath('/');
//   } catch (err) {
//     return {
//       err,
//       status: 500,
//     };
//   }
// }

export async function deletePerson(name: string) {
  try {
    await sql`DELETE FROM person WHERE name = ${name}`;
    revalidatePath('/');
    return { success: true };
  } catch (err) {
    console.error(err);
    return {
      err,
      status: 500,
    };
    // return { success: false, error: 'Failed to delete person' };
  }
}
