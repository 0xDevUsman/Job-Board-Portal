import React from "react";
import { IconType } from "react-icons";

interface CategoriesCardProps {
  icon: IconType;
  name: string;
  number: number;
}

const CategoriesCard = ({ icon: Icon, name, number }: CategoriesCardProps) => {
  return (
    <div className="border border-gray-200 text-slate-700 bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm w-full max-w-[16rem] transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default group mx-auto">
      <div className="flex justify-center mb-3">
        <Icon className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-slate-700 transition-colors duration-300 group-hover:text-blue-500" />
      </div>

      <div className="text-center">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-blue-500">
          {name}
        </h3>
        <p className="text-red-500 font-medium transition-colors duration-300 group-hover:text-blue-500">
          ({number})
        </p>
      </div>
    </div>
  );
};

export default CategoriesCard;
