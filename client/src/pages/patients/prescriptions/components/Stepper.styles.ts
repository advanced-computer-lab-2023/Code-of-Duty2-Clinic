// import { keyframes } from "@emotion/react";
import { CSSProperties } from "react";
// const mymove = keyframes`
//   0%   { backgorund-color:red; }
//   25%  { backgorund-color:red; }
//   50%  { backgorund-color:red; }
//   75%  { backgorund-color:green; }
//   100% { backgorund-color:blue; }
// `;

// // Define the package image style
// export const packageImage: CSSProperties = {
//   position: 'absolute',
//   top:'-3%',
//   right:"-3%",
//   width: 170,
//   height: 170,
//   transition: 'ease-in',
//   opacity: 0.6,
//   animation: `${mymove} 5s infinite`, // Use the defined keyframes
// };
export const packageNameCont: CSSProperties = {
   display: "inline-block",
   backgroundColor: "lightgray",
   borderRadius: 10,
   width: 70,
   textAlign: "center",
   opacity: 0.6,
};
export const gradientTextStyle: CSSProperties = {
   background: "linear-gradient(90deg, rgba(100,100,100,1) 0%, rgba(7,75,23,1) 100%)",
   WebkitBackgroundClip: "text",
   WebkitTextFillColor: "transparent",
   fontWeight: 700,
   fontSize: "18px",
   filter: "brightness(100%)",
};
