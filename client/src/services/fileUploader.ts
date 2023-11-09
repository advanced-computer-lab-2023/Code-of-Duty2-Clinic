import {v4 as generateID } from 'uuid'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '../utils/firebase.config';

export const uploadImage =async (file:File,folder:string, comment:string):Promise<any> => {
  
    const imageID = generateID();
    return new Promise((resolve, reject) => {
      console.log("ME")
      const storageRef = ref(storage, `${folder}/${imageID}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file,{customMetadata:{comment:''}});
      uploadTask.on("state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error)
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {resolve(downloadURL);});
        }
      )
    })
  }



  