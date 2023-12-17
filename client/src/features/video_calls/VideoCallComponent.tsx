import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { config } from "../../configuration";
import { useEffect } from "react";
import axios from "axios";
import { randomID } from "./randomID";

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

type Props = {
  roomID: string;
  url: string;
};
export default function VideoCallComponent({ roomID, url }: Props) {
  let myMeeting = async (element: any) => {
    // generate Kit Token
    const appID = config.videoAppId;
    const serverSecret = config.videoServerSecret;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );

    useEffect(() => {
      axios.post(`${config.serverUri}/doctors/video-link`, {
        url
      });
    }, []);

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url
        }
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
      showTextChat: true,
      showScreenSharingButton: true,
      showPreJoinView: true
    });
  };

  return <div ref={myMeeting} style={{ width: "100vw", height: "100vh" }}></div>;
}
