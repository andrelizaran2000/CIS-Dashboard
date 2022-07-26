// Axios
import { axiosInstanceWithAuth } from '../utils/axiosInstances';

// Types
import { EventoBodyWithId } from '../types/eventos';

export function getEventosApi (token:string) {
  return axiosInstanceWithAuth.get<EventoBodyWithId[]>('/api-dashboard/events.php', {
    headers: {
      Authorization:token
    }
  });
}