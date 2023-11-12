declare module "*.jpeg";
declare module "*.jpg";
declare module "*.png";
declare module "*.svg";
declare module "*.gif";
declare module "*.webp";
declare module "*.pdf";
declare module "*.md";
declare module "*.txt";

import "react";
declare module "react" {
  interface CSSProperties {
    WebkitTextSecurity?: string;
  }
}
