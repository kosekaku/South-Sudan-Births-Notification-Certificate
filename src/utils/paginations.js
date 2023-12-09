import { PAGE_SIZE } from "./constants/styles";

/**
 * Calculate paginated data based on the provided parameters.
 *
 * @template T
 * @param {T[]} data - The array of data to paginate.
 * @param {number} itemsPerPage - The number of items per page.
 * @param {number} itemsCurrentPage - The current page number.
 * @returns {{
 *   currentPageItems: T[] | undefined,
 *   totalItemsPages: number,
 *   totalItems: number,
 *   totalPageItems: () => void
 * }} - Object containing paginated data, total pages, and total items.
 */
export const paginationCalculation = (data, itemsPerPage, itemsCurrentPage) => {
  const totalItems = data.length;
  const totalItemsPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = itemsCurrentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPageItems = data?.slice(indexOfFirstItem, indexOfLastItem);
  const currentPageItemsTotals = currentPageItems?.length;

  // Cal page total currently page items of the general total items
  const totalPageItems = (currentPage) => {
    const firstPage = 1;
    if (currentPageItemsTotals === PAGE_SIZE && currentPage === firstPage) {
      return currentPageItemsTotals;
    } else {
      if (currentPageItemsTotals === PAGE_SIZE)
        return currentPageItemsTotals * currentPage;
      return (
        currentPageItemsTotals +
        (PAGE_SIZE * currentPage - PAGE_SIZE * currentPageItemsTotals)
      );
    }
  };

  return {
    currentPageItems,
    totalItemsPages,
    totalItems,
    totalPageItems,
  };
};
