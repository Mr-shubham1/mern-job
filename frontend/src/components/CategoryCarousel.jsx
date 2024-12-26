import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuerry } from "@/redux/jobslice";
import { useNavigate } from "react-router-dom";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "FullStack Developer",
  "Graphic designer",
  "Software Developer"
];
const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const querryHandler = (querry)=>{
      console.log(querry);
      dispatch(setSearchedQuerry(querry));
      navigate(`/browse`);
  }
  return (
    <div>
      <Carousel className="w-full max-w-sm mx-auto gap-4">
        <CarouselContent className="-ml-1">
          {category.map((cat, index) => {
            return (
              <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3 mx-7">
                <Button onClick={()=>{querryHandler(cat)}} variant="outline"  className="text-center rounded-full">{cat}</Button>
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
