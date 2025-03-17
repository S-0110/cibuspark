import React from 'react';
import { Link } from 'react-router-dom';
import ProcessFlow from '../components/ProcessFlow';
import Stats from '../components/Stats';

export default function Home() {
  return (
    <div className=" bg-green-100">
      {/* Hero Section */}
      <div
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=1920")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Food Waste into Clean Energy
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              CibusPark connects hotels with food processing units to convert food waste
              into renewable energy, creating a sustainable future.
            </p>
            <div className="space-x-4">
              <Link
                to="/signup"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md text-lg font-medium inline-flex items-center"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-3 rounded-md text-lg font-medium inline-flex items-center"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 bg-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-green-600">
          <h2 className="text-3xl font-bold text-center mb-12">About Cibuspark</h2>
          {/* <About/> */}
          <p className='text-center text-xl'>At CibusPark, we are on a mission to bridge the gap between surplus food and sustainability. <br /> Our platform acts as a mediator between hotels that generate excess food and food processing units (FPUs) that can convert it into renewable energy.</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Stats />
        </div>
      </div>

      {/* Process Flow Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <ProcessFlow />
        </div>
      </div>

      <div className='border-spacing-8 h-0.5 w-full bg-black mb-4'></div>

      <div className='flex center justify-center mb-3'>
      <table className="w-1/2 border-collapse border border-gray-300 bg-purple-100 shadow-lg rounded-lg">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="px-4 py-3 border border-gray-300">SECTOR</th>
                        <th className="px-4 py-3 border border-gray-300">GLOBAL AVERAGE (KG/CAPITA/YEAR)</th>
                        <th className="px-4 py-3 border border-gray-300">2022 TOTAL (MILLION TONNES)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-center hover:bg-gray-100 ">
                        <td className="px-4 py-3 border border-gray-300 font-bold">Household</td>
                        <td className="px-4 py-3 border border-gray-300">79</td>
                        <td className="px-4 py-3 border border-gray-300">631</td>
                
                    </tr>
                    <tr className="text-center hover:bg-gray-100">
                        <td className="px-4 py-3 border border-gray-300 font-bold">Food Service</td>
                        <td className="px-4 py-3 border border-gray-300">36</td>
                        <td className="px-4 py-3 border border-gray-300">290</td>
        
                    </tr>
                    <tr className="text-center hover:bg-gray-100">
                        <td className="px-4 py-3 border border-gray-300 font-bold">Retail</td>
                        <td className="px-4 py-3 border border-gray-300">17</td>
                        <td className="px-4 py-3 border border-gray-300">131</td>
                   
                    </tr>
                    <tr className="text-center hover:bg-gray-100">
                        <td className="px-4 py-3 border border-gray-300 font-bold">Total</td>
                        <td className="px-4 py-3 border border-gray-300">132</td>
                        <td className="px-4 py-3 border border-gray-300">1052</td>
                   
                    </tr>
                </tbody>
            </table>

           


      </div>
      <div className='flex items-center justify-center mb-4 mt-4'>
      <a href="https://wedocs.unep.org/handle/20.500.11822/45230" target="_blank" rel="noopener noreferrer" ><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
   Report
</button></a>
      </div>


      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className='text-3xl font-bold text-center mb-12'>Why CibusPark?</h2>
          <p className='text-center text-xl'>Reduces food waste by efficiently redistributing surplus food.</p>
          <p className='text-center text-xl'>Supports sustainability by converting waste into energy.</p>
          <p className='text-center text-xl'>Creates a seamless process for hotels to donate and FPUs to receive food.</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-600 mb-8">
            Join CibusPark today and be part of the sustainable energy revolution.
          </p>
          <Link
            to="/signup"
            className="bg-white text-green-600 hover:bg-green-300 px-8 py-3 rounded-md text-lg font-medium inline-flex items-center"
          >
            Join Now
          </Link>
        </div>

        <div className='flex center justify-center text-center items-center'>
        <a href="mailto:cibuspark.india@gmail.com" className='flex items-center'>
          <button className='bg-blue-100 p-2 m-3 rounded-md text-green-600'>
            Send Email
          </button>
          <h1 className='text-xl text-blue-300'>cibuspark.india@gmail.com</h1>
        </a>
        </div>

        <div className='flex center justify-center text-center items-center'>
        <p>© 2025 CibusPark. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}