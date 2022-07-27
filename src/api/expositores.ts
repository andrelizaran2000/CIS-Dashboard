// Types
import { ExpositorBody, ExpositorBodyWithId } from '../types/expositor';

// Axios
import { axiosInstanceWithAuth } from '../utils/axiosInstances';

export function getExpositoresApi () {
  return axiosInstanceWithAuth.get<ExpositorBodyWithId[]>('/api-dashboard/speakers.php');
}

export function registerExpositor (data:ExpositorBody) {
  return axiosInstanceWithAuth.post<null>('/api-dashboard/speakers.php', data);
}

export function editExpositor (expositor:ExpositorBodyWithId) {
  const { id, ...restExpositor } = expositor;
  return axiosInstanceWithAuth.put<null>(`/api-dashboard/speakers.php?id=:${id}`, restExpositor);
}