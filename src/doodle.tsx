import React from "react";
import "css-doodle";

declare namespace JSX {
  interface IntrinsicElements {
    "css-doodle": {};
  }
}
export default ([rule = ""]) =>
  () =>
    <css-doodle>{rule}</css-doodle>;
