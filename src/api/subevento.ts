// Types
import { CleanSubEventBody, SubeventoBody, SubeventoBodyWithId } from '../types/subeventos';

// Axios
import { axiosInstanceWithAuth } from '../utils/axiosInstances';

export function getSubeventosApi () {
  return axiosInstanceWithAuth.get<{ subevents:SubeventoBodyWithId[] }>('/api-dashboard/subevents.php');
}

export function registerSubeventoApi (subevent:SubeventoBody) {
  const { eventId, ...restSubevent } = subevent;
  restSubevent.initDate = `${subevent.initDate} ${subevent.initHour}`;
  restSubevent.endDate = `${subevent.initDate} ${subevent.endHour}`;
  restSubevent.speakers = subevent.expositoresIds.map(({ value }) => (value));
  const { expositoresIds, initHour, endHour, expositorId, ...restCleanSubeventBody } = restSubevent; 
  const cleanSubEventBody:CleanSubEventBody = restCleanSubeventBody;
  return axiosInstanceWithAuth.post<null>(`/api-dashboard/subevents.php?idEvent=${eventId}`, cleanSubEventBody);
}

export function editSubeventoApi (subevent:SubeventoBodyWithId) {
  const { id, ...restSubevent } = subevent;
  return axiosInstanceWithAuth.put<null>(`/api-dashboard/subevents.php?id=${id}`, restSubevent);
}