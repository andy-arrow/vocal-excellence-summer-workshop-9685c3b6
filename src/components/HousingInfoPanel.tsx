
import React from "react";
import { Bed, Hotel, Utensils } from "lucide-react";
import GuaranteeBadge from "./ui/GuaranteeBadge";

const HousingInfoPanel: React.FC = () => (
  <aside
    className="bg-blue-50 border border-blue-100 rounded-2xl p-8 max-w-xs md:ml-10 mb-8 shadow-sm"
    aria-label="Housing and Meals Information"
  >
    <div className="flex justify-between items-start mb-8">
      <h3 className="text-lg font-bold text-blue-700 flex items-center gap-2">
        <Bed className="w-5 h-5" /> Housing Options
      </h3>
      <GuaranteeBadge size="sm" />
    </div>
    
    <ul className="space-y-4 mb-8 text-gray-700 max-w-prose">
      <li className="flex items-center gap-2">
        <Hotel className="w-4 h-4" />
        €45/night hostel (budget, 8-min walk)
      </li>
      <li className="flex items-center gap-2">
        <Hotel className="w-4 h-4" />
        €85/night hotel partner (single room)
      </li>
    </ul>
    <h4 className="text-base font-semibold flex items-center gap-2 text-gray-800 mb-2">
      <Utensils className="w-4 h-4" /> Meals
    </h4>
    <p className="text-gray-700 text-sm mb-2">Lunches provided daily.</p>
    <p className="text-gray-700 text-sm mb-0">Dinners: explore local cuisine at your own pace.</p>
    <p className="text-xs text-gray-600 mt-4">Book accommodation during application; inquire for help!</p>
  </aside>
);

export default HousingInfoPanel;
