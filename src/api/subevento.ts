// Types
import { SubeventoBody, SubeventoBodyWithId } from '../types/subeventos';

// Axios
import { axiosInstanceWithAuth } from '../utils/axiosInstances';

export function getSubeventosApi () {
  return axiosInstanceWithAuth.get<SubeventoBodyWithId[]>('/api-dashboard/subevents.php');
}

export function registerSubeventoApi (subevent:SubeventoBody) {
  const { eventId, ...restSubevent } = subevent;
  return axiosInstanceWithAuth.post<null>(`/api-dashboard/subevents.php?idEvent=${eventId}`, restSubevent);
}

export function editSubeventoApi (subevent:SubeventoBodyWithId) {
  const { id, ...restSubevent } = subevent;
  return axiosInstanceWithAuth.put<null>(`/api-dashboard/subevents.php?id=${id}`, restSubevent);
}