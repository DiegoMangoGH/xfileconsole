export const filterBySearchTerm = <T extends Record<string, any>>(
  items: T[],
  searchTerm: string
): T[] => {
  if (!searchTerm.trim()) return items;
  
  return items.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
};

export const filterTransmissionsByType = (transmissions: any[], method: string) => {
  switch (method) {
    case "Method Get":
      return transmissions.filter(t => t.fileSent.includes("0019574") && !t.zipped && t.status === 'Success');
    case "Method Put":
      return transmissions.filter(t => t.zipped && t.status === 'Success');
    case "Method Get Extern":
      return transmissions.filter(t => t.fileSent.includes("0019574") && t.status === 'Success');
    case "Method Put Extern":
      return transmissions.filter(t => t.fileSent.includes("0019574") && t.status === 'Error');
    default:
      return [];
  }
};