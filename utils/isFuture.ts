export const isFuture = (
  show_time: string | null,
  showdate: string | null,
): boolean => {
  if (!show_time || !showdate) return false;
  
  try {
    // Extract date part from ISO format (2026-04-10T00:00:00+00:00 → 2026-04-10)
    const datePart = showdate.split('T')[0];
    
    // Create datetime by combining date and time
    const showDateTime = new Date(`${datePart}T${show_time}`);
    const now = new Date();
    
    return showDateTime > now;
  } catch {
    return false;
  }
};
