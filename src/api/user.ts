// Types
import { LoginBody, LoginData } from '../types/user';

// Axios
import { axiosInstance, axiosInstanceWithAuth } from '../utils/axiosInstances';

export function loginApi (data:LoginBody) {
  return axiosInstance.post<LoginData>('api-dashboard/login.php', data);
} 

export function validateTokenApi () {
  return axiosInstanceWithAuth.get<LoginData>('api-dashboard/validate-token.php');
}