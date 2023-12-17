import axios from "axios";
import { config } from "../../configuration";
import VideoCallComponent, { getUrlParams } from "../../features/video_calls/VideoCallComponent";
import { useEffect, useState } from "react";
import { randomID } from "../../features/video_calls/randomID";

const getSoonestAppointment = async () => {
  const res = await axios.get(`${config.serverUri}/doctors/soonest-appointment`);
  return res.data;
};
const sendUrlToSoonestAppointedPatient = async (url: string) => {
  await axios.post(`${config.serverUri}/doctors/video-call-url`, { url });
};

const VideoCall = () => {
  const [showVideoCall, setShowVideoCall] = useState(false);

  const roomID = getUrlParams().get("roomID") || randomID(5);
  const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`;

  useEffect(() => {
    getSoonestAppointment().then((appointment) => {
      if (appointment) {
        sendUrlToSoonestAppointedPatient(url).then(() => {
          setShowVideoCall(true);
        });
      }
    });
  }, []);

  // if (showVideoCall) {
  return <VideoCallComponent roomID={roomID} url={url} />;
  // }
  return <h2>Your do not have any appointment now</h2>;
};

export default VideoCall;
