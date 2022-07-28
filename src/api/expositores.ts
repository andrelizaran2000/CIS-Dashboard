// Types
import { ExpositorBody, ExpositorBodyWithId } from '../types/expositor';

// Axios
import { axiosInstanceWithAuth } from '../utils/axiosInstances';

export function getExpositoresApi () {
  return axiosInstanceWithAuth.get<{speakers:ExpositorBodyWithId[]}>('/api-dashboard/speakers.php');
}

export function registerExpositorApi (data:ExpositorBody) {
  return axiosInstanceWithAuth.post<{ id:number }>('/api-dashboard/speakers.php', data);
}

export function editExpositorApi (expositor:ExpositorBodyWithId) {
  const { id, ...restExpositor } = expositor;
  return axiosInstanceWithAuth.put<null>(`/api-dashboard/speakers.php?id=${id}`, restExpositor);
}

export function removeExpositorApi (id:number) {
  return axiosInstanceWithAuth.delete<null>(`/api-dashboard/speakers.php?id=${id}`);
}