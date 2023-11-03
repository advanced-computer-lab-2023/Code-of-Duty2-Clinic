import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export default  function checkIfFileExists(filePath: string): any{
    const storage = getStorage();
    const storageRef = ref(storage, filePath);
  
    getDownloadURL(storageRef)
      .then(url => {
        return Promise.resolve(true);
      })
      .catch(error => {
        if (error.code === 'storage/object-not-found') {
          return Promise.resolve(false);
        } else {
          return Promise.reject(error);
        }
      });
  }