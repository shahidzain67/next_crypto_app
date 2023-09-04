import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_FLASK_API_URL;
const accessKey = process.env.NEXT_PUBLIC_API_ACCESS_KEY;

export default function ListCurrencyInfo({ setSelectedRates }) {
  const [currencyDataList, setCurrencyDataList] = useState(null);

  const getListCurrencies = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/list?access_key=${accessKey}`
      );
      setCurrencyDataList(response.data.crypto);
    } catch (error) {
      console.error("There was an error fetching the data", error);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedRates((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  useEffect(() => {
    getListCurrencies();
  }, []);

  return (
    <div className="bg-transparent text-white focus:outline-none text-2xl ">
      <div>
        <p className="text-2xl p-3 border border-white bg-black">
          Select a currency to view live and historical data
        </p>
      </div>
      <div className="overflow-y-auto max-h-[11rem]">
        {currencyDataList && (
          <table className="text-white text-xl mt-5">
            <thead>
              <tr>
                <th className="text-center">Currency</th>
                <th className="text-center">Rate</th>
                <th className="text-center">Selected</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(currencyDataList).map((key, index) => (
                <tr key={index}>
                  <td className="text-center">{key}</td>
                  <td className="text-center">{currencyDataList[key].name}</td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      name={key}
                      onChange={handleCheckboxChange}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
