// Types
import { SubeventoBodyToDb, SubEventBodyFromDBWithId, SubeventoBodyToDbWithId } from '../types/subeventos';

// Axios
import { axiosInstanceWithAuth } from '../utils/axiosInstances';

export function getSubeventosApi () {
  return axiosInstanceWithAuth.get<{ subevents:SubEventBodyFromDBWithId[] }>('/api-dashboard/subevents.php');
}

export function registerSubeventoApi (subevent:SubeventoBodyToDb) {
  return axiosInstanceWithAuth.post<{ id:string }>(`/api-dashboard/subevents.php?idEvent=${subevent.eventId}`, subevent);
}

export function editSubeventoApi (subevent:SubeventoBodyToDbWithId) {
  const { id, ...restSubevent } = subevent;
  return axiosInstanceWithAuth.put<null>(`/api-dashboard/subevents.php?id=${id}`, restSubevent);
}

export function removeSubventoApi (id:string) {
  return axiosInstanceWithAuth.delete<null>(`/api-dashboard/subevents.php?id=${id}`);
}