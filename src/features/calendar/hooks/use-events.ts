import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Event } from '@/features/calendar/types';
import { eventApi } from '@/features/calendar/api/events';

export const useEvents = () => {
  const queryClient = useQueryClient();

  const { data: events = [] } = useQuery({
    queryKey: ["events"],
    queryFn: eventApi.getEvents,
  }) as { data: Event[] };

  const { mutate: createEvent } = useMutation({
    mutationFn: (event: Event) => eventApi.createEvent(event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const { mutate: clearAllEvents } = useMutation({
    mutationFn: eventApi.clearAllEvents,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: (event: Event) => eventApi.updateEvent(event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: (id: string) => eventApi.deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  return {
    events,
    isLoading: false,
    error: null,
    createEvent,
    clearAllEvents,
    updateEvent: updateEventMutation.mutate,
    deleteEvent: deleteEventMutation.mutate,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    isClearing: false,
  };
};