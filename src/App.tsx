import { Component, createEffect, createSignal } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import "tailwindcss/tailwind.css";

import SearchIcon from "./components/icons/SearchIcon";
import cities from "cities.json";
import { WetherData } from "./types";

const App: Component = () => {
  const wether = {
    apiKey: "55dfb503d35aedf6df0550d53f685947",
  };
  const [wetherData, setWetherData] = createSignal<WetherData | null>(null);

  const getWetherData = async () => {
    const WETHER_API_KEY = "55dfb503d35aedf6df0550d53f685947";
    const { lat, lon } = { lat: 8.9806, lon: 38.7578 };

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${WETHER_API_KEY}`;

    const res = await fetch(url, {
      method: "GET",
    });
    const data = (await res.json()) as WetherData;
    console.log("RESULT: ", data);
    setWetherData(data);
    // .catch((error) => console.log("error", error));
  };

  createEffect(() => {
    getWetherData();
  });

  const kelToCelsius = (v: number) => (v - 273.15).toFixed(1);

  return (
    <div className="flex justify-center items-center text-white h-screen max-w-screen overflow-hidden bg-cover bg-center bg-[#111] bg-[url('https://images.unsplash.com/photo-1642548666500-7990b88e691f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=978&q=80')]">
      {wetherData !== null ? (
        <div className="">
          <div className="flex-grow flex place-items-end h-full">
            <div className="p-10">
              <h1 className="text-4xl mt-5 font-normal">
                {wetherData()?.timezone.split("/")[0]},{" "}
                {wetherData()?.timezone.split("/")[1].replaceAll("_", " ")}
              </h1>
              <h1 className="text-9xl font-bold mr-5">
                {kelToCelsius(wetherData()?.current?.temp ?? 0)}&deg;C
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap max-w-10px]">
            {wetherData()?.daily.map((wether: any) => (
              <div className="p-3 m-1 transition-all ease-out hover:bg-[rgba(0,0,0,0.6)] hover:scale-150 rounded-md cursor-pointer">
                <h1 className="font-normal">Mon</h1>
                <h1 className="text-3xl font-bold mr-5">
                  {kelToCelsius(wether.temp.day?? 0)}&deg;C
                </h1>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
      <div className="w-96 p-10">
        <div className="flex items-center relative">
          <input
            className="w-full border-none rounded-full pl-12 bg-[rgba(0,0,0,0.5)] font-semibold p-3 text-[14px] font-[500] outline-none transition-all ease-out hover:scale-110 focus:scale-110"
            type="text"
          />
          <SearchIcon className="absolute left-2 text-2xl" />
        </div>
        <button className="mt-3 w-full border-none outline-none p-2 font-semibold rounded-full transition-all duration-100 ease-out bg-[#6c5bc8] hover:bg-[#372a82] hover:scale-110">
          Search
        </button>
      </div>
    </div>
  );
};

export default App;
