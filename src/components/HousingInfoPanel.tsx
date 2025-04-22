
import React from "react";
import { Bed, Hotel, Utensils } from "lucide-react";
import GuaranteeBadge from "./ui/GuaranteeBadge";

const HousingInfoPanel: React.FC = () => (
  <aside
    className="bg-apple-blue/10 border border-apple-blue/20 rounded-2xl p-6 max-w-xs md:ml-10 mb-8 shadow-sm"
    aria-label="Housing and Meals Information"
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-lg font-bold text-apple-blue flex items-center gap-2">
        <Bed className="w-5 h-5" /> Housing Options
      </h3>
      <GuaranteeBadge size="sm" />
    </div>
    
    <ul className="space-y-2 mb-4 text-apple-text">
      <li className="flex items-center gap-2">
        <Hotel className="w-4 h-4" />
        €45/night hostel (budget, 8-min walk)
      </li>
      <li className="flex items-center gap-2">
        <Hotel className="w-4 h-4" />
        €85/night hotel partner (single room)
      </li>
    </ul>
    <h4 className="text-base font-semibold flex items-center gap-2 text-apple-grey mb-1">
      <Utensils className="w-4 h-4" /> Meals
    </h4>
    <p className="text-apple-text text-sm mb-1">Lunches provided daily.</p>
    <p className="text-apple-text text-sm mb-0">Dinners: explore local cuisine at your own pace.</p>
    <p className="text-xs text-apple-grey mt-3">Book accommodation during application; inquire for help!</p>
  </aside>
);

export default HousingInfoPanel;
