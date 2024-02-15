import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import React from "react";

const StarRatingFilter = ({
  selectedStars,
  onChange,
}: {
  selectedStars: string[];
  onChange: (val: boolean | string, star: number) => void;
}) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      {Array(5)
        .fill(1)
        .map((_, star) => {
          return (
            <div key={star}>
              <Label className="flex flex-row items-center space-x-3 space-y-0">
                <Checkbox
                  checked={selectedStars?.includes(String(star + 1))}
                  onCheckedChange={(e) => onChange(e, star + 1)}
                />
                <p>{star + 1} Stars</p>
              </Label>
            </div>
          );
        })}
      {/* </h4> */}
    </div>
  );
};

export default StarRatingFilter;
