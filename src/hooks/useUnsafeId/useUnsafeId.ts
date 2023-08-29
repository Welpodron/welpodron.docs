export const useUnsafeId = (prefix?: string) => {
  const id = Math.random().toString(36).substring(2, 15);
  return prefix ? `${prefix}_${id}` : id;
};
