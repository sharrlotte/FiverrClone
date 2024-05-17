import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

function BannerPost() {
  return (
    <Carousel>
      <CarouselContent className="flex justify-center">
        <CarouselItem>
          <img src="/image/camera.png"></img>
        </CarouselItem>
        <CarouselItem>
          <img src="/image/camera.png"></img>
        </CarouselItem>
        <CarouselItem>
          <img src="/image/camera.png"></img>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default BannerPost;
