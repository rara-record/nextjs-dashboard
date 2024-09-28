import { Revenue } from './definitions';

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US'
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

/**
 *
 * @param revenue 각 월의 매출 정보
 * @returns
 */
export const generateYAxis = (revenue: Revenue[]) => {
  // 그래프의 Y축을 동적으로 생성
  // 매출 데이터를 기반으로 차트의 Y축 레이블을 생성합니다.
  // 가장 높은 매출액을 기준으로 적절한 눈금을 만듭니다.

  const yAxisLabels = [];

  // 가장 높은 매출액 찾기
  const highestRecord = Math.max(
    ...revenue.map((month) => month.revenue)
  );

  // 가장 높은 매출을 1000 단위로 올림
  const topLabel = Math.ceil(highestRecord / 1000) * 1000; // 5000

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  } // [ '$5K', '$4K', '$3K', '$2K', '$1K', '$0K' ] yAxisLabels

  return { yAxisLabels, topLabel };
};

export const generatePagination = (
  currentPage: number,
  totalPages: number
) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
