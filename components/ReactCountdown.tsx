import React from "react";
interface ReactCountdownProps {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}
export default function ReactCountdown({
  days,
  hours,
  minutes,
  seconds,
}: ReactCountdownProps) {
  function padZeros(number: string) {
    return number.toString().padStart(2, "0");
  }
  return (
    <div className="flex flex-row container ">
      <div className="flex flex-col center w-full mx-auto mt-24">
        <div className="text-center text-4xl font-sans text-white p-20">
          {/*HEADER IMAGE */}
        </div>
        <div className="flex flex-row mx-auto text-gray-600  lg:p-16 p-6 text-center">
          <div className="flex flex-col">
            <p className="lg:text-6xl  text-3xl text-white font-roboto ">
              {padZeros(days)} :
            </p>
            <p className="-ml-4 text-gray-100">days</p>
          </div>
          <div className="flex flex-col">
            <p className="lg:text-6xl text-3xl text-white font-roboto">
              &nbsp; {padZeros(hours)} &nbsp;
            </p>
            <p className="lg:pl-4 text-gray-100">hours</p>
          </div>
          <div className="flex flex-col">
            <p className="lg:text-6xl text-3xl text-white font-roboto">
              : {padZeros(minutes)} &nbsp;
            </p>
            <p className="lg:pl-2 text-gray-100">min.</p>
          </div>
          <div className="flex flex-col">
            <p className="lg:text-6xl text-3xl text-white font-roboto">
              : {padZeros(seconds)}
            </p>
            <p className="lg:pl-6 text-gray-100"> sec.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
