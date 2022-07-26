// Types
import { SubeventoBody, SubeventoBodyWithId } from '../types/subeventos';

// Axios
import { axiosInstanceWithAuth } from '../utils/axiosInstances';

export function registerSubeventoApi (data:SubeventoBody) {
  return axiosInstanceWithAuth.post<null>('/api-dashboard/subevents.php', data);
}

export function getSubeventosApi (token:string) {
  return axiosInstanceWithAuth.get<SubeventoBodyWithId[]>('/api-dashboard/subevents.php', {
    headers: {
      Authorization:token
    }
  })
}