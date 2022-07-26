// Modules
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase
import app from '../utils/firebase';

export default function useUploadimage () {
  async function uploadImage (file:any, fileName:string) {
    const storage = getStorage(app);
    const avatarRef = ref(storage, fileName);
    try {
      await uploadBytes(avatarRef, file);
      const url = await getDownloadURL(ref(storage, fileName));
      return url;
    } catch (error:any) {
      return null;
    }
  }
  return {
    uploadImage
  }
}
