import React from "react";

export default function LoadingFilter() {
  return (
    <div className="fixed h-full w-full top-0 left-0 justify-center flex items-center brightness-50 bg-black/50 z-[9999] overflow-hidden">
      <img src="/image/loading.svg" />
    </div>
  );
}
