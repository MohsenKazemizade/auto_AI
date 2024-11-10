export const filterTanks = (data: any[], searchTerm: string) => {
  if (!searchTerm) return data;
  const lowerCaseTerm = searchTerm.toLowerCase();

  return data.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(lowerCaseTerm)
    )
  );
};

export const sortTanks = (
  data: any[],
  sortKey: string | null,
  sortOrder: 'asc' | 'desc'
) => {
  if (!sortKey) return data;

  return [...data].sort((a, b) => {
    const aValue = a[sortKey] || '';
    const bValue = b[sortKey] || '';
    const order = sortOrder === 'asc' ? 1 : -1;

    return aValue > bValue ? order : aValue < bValue ? -order : 0;
  });
};

export const paginateTanks = (
  data: any[],
  currentPage: number,
  itemsPerPage: number
) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return data.slice(startIndex, startIndex + itemsPerPage);
};
