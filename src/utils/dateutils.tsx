export function getMonthGrid(dateIso: Date): Date[] {
  const date = new Date(dateIso);
  const year = date.getFullYear();
  const month = date.getMonth();

  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());

  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }

  return days;
}