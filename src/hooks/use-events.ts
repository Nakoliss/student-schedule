import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Event } from '@/components/calendar/types';
import { eventApi } from '@/api/events';

export const useEvents = () => {
  const queryClient = useQueryClient();
  const queryKey = ['events'];

  const { data: events = [], isLoading, error } = useQuery({
    queryKey,
    queryFn: eventApi.getEvents,
  });

  const clearEventsMutation = useMutation({
    mutationFn: eventApi.clearAllEvents,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      console.log('Events cleared successfully');
    },
  });

  const createEventMutation = useMutation({
    mutationFn: eventApi.createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: eventApi.updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: eventApi.deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    events,
    isLoading,
    error,
    clearAllEvents: clearEventsMutation.mutate,
    createEvent: createEventMutation.mutate,
    updateEvent: updateEventMutation.mutate,
    deleteEvent: deleteEventMutation.mutate,
    isCreating: createEventMutation.isPending,
    isUpdating: updateEventMutation.isPending,
    isDeleting: deleteEventMutation.isPending,
    isClearing: clearEventsMutation.isPending,
  };
};