import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    filters: ["Delhi NCR", "Bangalore", "hydarabad", "pune", "mumbai"],
  },
  {
    filterType: "Industry",
    filters: ["Front end developer" , "Back end developer" , "Full Stack developer"],
  },
  {
    filterType: "Salary",
    filters: ["40k", "40k to 1 lakh", "1 lakh to 5lakh"],
  },
];

const CardFilter = () => {
  return (
    <div className="bg-white">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <div>
        <RadioGroup defaultValue="comfortable">
          {filterData.map((item, index) => {
            return (
              <div>
                <h1 className="font-semibold text-lg">{item.filterType}</h1>
                {item.filters.map((item, index) => {
                  return (
                    <div>
                      <div className="flex items-center space-x-2 mt-2">
                        <RadioGroupItem value={item} />
                        <Label>{item}</Label>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};

export default CardFilter;
