interface TimeCellProps {
  time: string;
}

export const TimeCell = ({ time }: TimeCellProps) => {
  // No formatting needed - keep 24-hour time
  return (
    <div className="calendar-cell time-cell">
      {time}
    </div>
  );
};