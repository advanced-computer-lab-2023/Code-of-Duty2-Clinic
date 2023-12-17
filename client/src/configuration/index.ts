export const config = {
  serverUri: import.meta.env.VITE_SERVER_URI,
  socketServerUri: import.meta.env.VITE_SOCKET_SERVER_URI,
  refreshTokenEndpoint: import.meta.env.VITE_REFRESH_TOKEN_ENDPOINT,
  talkJsAppId: import.meta.env.VITE_TALKJS_APP_ID,

  videoAppId: import.meta.env.VITE_VIDEO_APP_ID,
  videoServerSecret: import.meta.env.VITE_VIDEO_SERVER_SECRET
};
