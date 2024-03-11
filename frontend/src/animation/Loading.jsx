import React from "react";
import Lottie from "react-lottie";
import animationData from "./CircleLoading";

export default function Loading(props) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={Number(props.height)}
        width={Number(props.width)}
      />
    </div>
  );
}
