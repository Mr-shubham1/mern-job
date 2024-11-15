import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];
const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className="w-full max-w-sm mx-auto gap-4">
        <CarouselContent className="-ml-1">
          {category.map((cat, index) => {
            return (
              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3 mx-7">
                <Button variant="outline" className="rounded-full " >{cat}</Button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
