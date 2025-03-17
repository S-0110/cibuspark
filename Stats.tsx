import React from 'react';

const Stats = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
      {[
        {
          value: "Hotels",
          label1: "1. Sign up and enter the amount of surplus food available.",
          label2: "2. Schedule a pickup.",
          label3: "3. Track the food collection process",
          color: "bg-yellow-100 text-yellow-600"
        },
        {
          value: "FPU's",
          label1: "1. Sign up and enter food requirements.",
          label2: "2. Get real-time updates on food collection. ",
          label3: "3. Process the food into renewable energy.",
          
          color: "bg-blue-100 text-blue-600"
        },
        // {
        //   value: "200+",
        //   label: "Partner Hotels",
        //   color: "bg-purple-100 text-purple-600"
        // },
        // {
        //   value: "25+",
        //   label: "Processing Units",
        //   color: "bg-orange-100 text-orange-600"
        // }
      ].map((stat, index) => (
        <div
          key={index}
          className={`${stat.color} rounded-lg p-6 text-center transform hover:scale-105 transition-transform`}
        >
          <div className="text-4xl font-bold mb-2">{stat.value}</div>
          <div className="text-sm">{stat.label1}</div>
          <div className="text-sm">{stat.label2}</div>
          <div className="text-sm">{stat.label3}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;