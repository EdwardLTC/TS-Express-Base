/**
 * @author Edward
 * @description date to dd-mm-yyyy or hh:mm or yyyy-mm-ddThh:mm
 * @param date
 * @param type
 * @returns type 1: dd-mm-yyyy type 2: hh:mm default: yyyy-mm-ddThh:mm
 */
export const formatDate = (date: Date, type?: number) => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  if (type === 1) {
    return `${day}-${month}-${year}`;
  }
  if (type === 2) {
    return `${hours}:${minutes}:00`;
  }
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
