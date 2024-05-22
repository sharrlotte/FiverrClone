import Image from 'next/image';
import React from 'react';

export default function LoadingOverlay() {
  return (
    <div className="fixed h-full w-full top-0 left-0 justify-center flex items-center brightness-50 bg-black/50 z-[9999] overflow-hidden">
      <Image alt="Loading icon" src="/image/loading.svg" fill />
    </div>
  );
}
