interface TimeCellProps {
  time: string;
}

export const TimeCell = ({ time }: TimeCellProps) => {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    return `${hour}:${minutes}`;
  };

  return (
    <div className="calendar-cell time-cell">
      {formatTime(time)}
    </div>
  );
};