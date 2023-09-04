import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_FLASK_API_URL;
const accessKey = process.env.NEXT_PUBLIC_API_ACCESS_KEY;

export default function LiveCurrencyInfo({ selectedRates }) {
  const [currencyData, setCurrencyData] = useState(null);

  const getLiveCurrencies = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/live?access_key=${accessKey}`
      );
      setCurrencyData(response.data.rates);
    } catch (error) {
      console.error("There was an error fetching the data", error);
    }
  };

  useEffect(() => {
    if (Object.values(selectedRates).some(Boolean)) {
      getLiveCurrencies();
    }
  }, [selectedRates]);

  const anyCheckboxChecked = Object.values(selectedRates).some(Boolean);

  return (
    <div>
      <p className="mt-5 text-center text-2xl p-3 border border-white bg-black">
        Live Currency Data
      </p>

      <div className="overflow-y-auto max-h-[10rem]">
        {currencyData && (
          <table className="text-white text-xl mt-5">
            <thead>
              {anyCheckboxChecked && (
                <tr>
                  <th className="text-center">Currency</th>
                  <th className="text-center">Rate</th>
                </tr>
              )}
            </thead>
            <tbody>
              {Object.keys(selectedRates)
                .filter((key) => selectedRates[key])
                .map((key) => (
                  <tr key={key}>
                    <td className="text-center">{key}</td>
                    <td className="text-center">
                      {currencyData[key] || "N/A"}
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
