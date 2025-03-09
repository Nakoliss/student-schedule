export const getEventStyle = (type: 'class' | 'study' | 'other') => {
  switch (type) {
    case 'class':
      return 'bg-primary/20 text-primary-foreground/90';
    case 'study':
      return 'bg-accent/20 text-accent-foreground/90';
    default:
      return 'bg-secondary text-secondary-foreground';
  }
};