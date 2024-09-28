'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

// defaultValue vs. value / Controlled vs. Uncontrolled
//상태를 사용하여 입력 값을 관리하는 경우 value 속성을 ​​사용하여 이를 제어되는 구성 요소로 만듭니다.
// 이는 React가 입력 상태를 관리한다는 의미입니다.
//그러나 상태를 사용하지 않으므로 defaultValue 을 사용할 수 있습니다.
// 이는 기본 입력이 자체 상태를 관리한다는 의미입니다.상태 대신 URL에 검색어를 저장하므로 괜찮습니다.

/**
 * replace는 현재 URL을 새로운 검색 쿼리가 포함된 URL로 교체합니다.
 * 이는 사용자가 입력 필드에 타이핑할 때마다 URL이 실시간으로 업데이트되도록 합니다.
 * 이러한 방식으로 replace를 사용하면, 단일 페이지 애플리케이션(SPA)의 동적인 특성을 유지하면서도 URL을 통한 상태 관리의 이점을 얻을 수 있습니다.
 */

export default function Search({
  placeholder,
}: {
  placeholder: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);

    // pathname : /dashboard/invoices
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // 페이지를 새로고침하면 이전 검색어가 유지됩니다.
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
