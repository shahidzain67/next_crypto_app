import { useState } from "react";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_FLASK_API_URL;
const accessKey = process.env.NEXT_PUBLIC_API_ACCESS_KEY;

export default function HistoricalData({ selectedRates }) {
  const [date, setDate] = useState("");
  const [data, setData] = useState(null);

  const fetchHistoricalData = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/${date}?access_key=${accessKey}`
      );
      setData(response.data.rates);
    } catch (error) {
      console.error("There was an error fetching the data", error);
    }
  };

  return (
    <div>
      <p className="mt-5 text-center text-2xl p-3 border border-white bg-black">
        Fetch Historical Data
      </p>
      <input
        className="text-2xl p-2 border border-white bg-white text-black"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button
        className="ml-1 text-xl p-2 border border-white bg-neutral-600 text-white"
        onClick={fetchHistoricalData}
      >
        Search
      </button>
      {data && (
        <div>
          <table className="text-white text-xl mt-5">
            <thead>
              <tr>
                <th className="text-center">Currency</th>
                <th className="text-center">Rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(selectedRates)
                .filter((key) => selectedRates[key])
                .map((key) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{data[key]}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
