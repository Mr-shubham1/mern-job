import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    filters: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    filters: ["Front end developer", "Back end developer", "Full Stack developer"],
  },
  {
    filterType: "Salary",
    filters: ["40k", "40k to 1 lakh", "1 lakh to 5 lakh"],
  },
];

const CardFilter = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 max-w-full h-[85vh] overflow-y-auto">
      <h1 className="font-bold text-lg sm:text-xl mb-4 text-gray-800 text-center">
        Filter Jobs
      </h1>
      <hr className="mb-4 border-gray-300" />
      <RadioGroup defaultValue="comfortable">
        {filterData.map((item, index) => (
          <div key={index} className="mb-6">
            <h2 className="font-semibold text-base sm:text-lg text-gray-700 mb-3">
              {item.filterType}
            </h2>
            <div className="flex flex-wrap gap-2">
              {item.filters.map((filter, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={filter}
                    className="w-4 h-4 border-gray-400 focus:ring-[#6A38C2]"
                  />
                  <Label className="text-sm sm:text-base text-gray-600">
                    {filter}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default CardFilter;
