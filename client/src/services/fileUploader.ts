import {v4 as generateID } from 'uuid'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '../utils/firebase.config';

export const uploadImage =async (file:File,comment:string):Promise<any> => {
  
    const imageID = generateID();
    if (!file) Promise.resolve("no file");
    // const storageRef = ref(storage, `files/${imageID}`);
    // const uploadTask = uploadBytesResumable(storageRef, file,{customMetadata:{comment:''}});
    // uploadTask.on("state_changed",
    //   (snapshot)=>{},
    //   (error) => {console.log(error);alert(error);},
    //   () => { getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {resolve(fileUrl)});}
    // );
 
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `files/${imageID}`);
      const uploadTask = uploadBytesResumable(storageRef, file,{customMetadata:{comment:''}});
      uploadTask.on("state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error)
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {resolve(downloadURL)});
        }
      )
    })
  }



  