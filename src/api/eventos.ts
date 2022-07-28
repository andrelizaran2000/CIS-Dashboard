// Axios
import { axiosInstanceWithAuth } from '../utils/axiosInstances';

// Types
import { EventoBody, EventoBodyWithId } from '../types/eventos';

export function getEventosApi () {
  return axiosInstanceWithAuth.get<{ events:EventoBodyWithId[] }>('/api-dashboard/events.php');
}

export function registerEventoApi (event:EventoBody) {
  return axiosInstanceWithAuth.post<{ id:number }>('/api-dashboard/events.php', event);
} 

export function editEventoApi (event:EventoBodyWithId) {
  const { id, ...restEvent } = event;
  return axiosInstanceWithAuth.put(`/api-dashboard/events.php?id=:${id}`, restEvent);
}

