import React from 'react';
import { Building2, Truck, Factory, Leaf } from 'lucide-react';

const ProcessFlow = () => {
  return (
    <div className="grid md:grid-cols-4 gap-8">
      {[
        {
          icon: Building2,
          title: "Hotels",
          description: "Hotels collect and segregate their food waste"
        },
        {
          icon: Truck,
          title: "Collection",
          description: "We collect and transport the waste to processing units"
        },
        {
          icon: Factory,
          title: "Processing",
          description: "FPUs convert waste into biogas through anaerobic digestion"
        },
        {
          icon: Leaf,
          title: "Energy",
          description: "Clean energy is generated and distributed"
        }
      ].map((step, index) => (
        <div key={index} className="relative group">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
              <step.icon size={40} className="text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 text-center">{step.description}</p>
          </div>
          {index < 3 && (
            <div className="hidden md:block absolute top-10 -right-4 w-8 h-0.5 bg-green-200">
              <div className="animate-pulse absolute right-0 w-2 h-2 bg-green-400 rounded-full -top-0.5"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProcessFlow;