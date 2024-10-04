import { sql } from '@vercel/postgres';
import FormEditor from './components/form-editor';
import RemoveButton from './components/remove-button';

// server action
// - form tag에 action 속성을 사용하여 서버로 데이터를 전송할 수 있습니다.

export default async function Home() {
  const { rows } = await sql`SELECT name FROM person`;

  return (
    <div className="bg-zinc-900 min-h-screen flex items-center justify-center p-6">
      <div className="flex flex-col gap-4 w-[400px]">
        {/* Form Container */}
        <div className="w-full max-w-md bg-gray-700 rounded-xl shadow-md">
          <FormEditor />
        </div>

        {/* List Container */}
        <div className="w-full max-w-md rounded-md shadow-md flex flex-col gap-4">
          {rows &&
            rows.map((row, idx) => (
              <div
                key={`${row.name}-${idx}`}
                className="text-white space-y-4 p-4 bg-gray-700 flex justify-between"
              >
                {row.name}
                <RemoveButton name={row.name} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
