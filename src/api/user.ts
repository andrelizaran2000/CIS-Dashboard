// Types
import { LoginBody, LoginData } from '../types/user';

// Axios
import { axiosInstance } from '../utils/axiosInstances';

export function loginApi (data:LoginBody) {
  return axiosInstance.post<LoginData>('api-dashboard/login.php', data);
} 

export function validateTokenApi (token:string) {
  return axiosInstance.get<LoginData>('api-dashboard/validate-token.php', {
    headers: {
      Authorization:token
    }
  });
}