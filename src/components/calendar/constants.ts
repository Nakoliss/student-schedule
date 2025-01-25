export const timeSlots = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, '0')}:${minutes}`;
});

export const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
export const weekendDays = ['Samedi', 'Dimanche'];

export const DEFAULT_SCROLL_TIME = "08:00";