import React, { useState } from "react";
import ListCurrencyInfo from "./ListCurrencyInfo";
import LiveCurrencyInfo from "./LiveCurrencyInfo";
import HistoricalData from "./HistoricalData";

export default function CurrencyApp() {
  const [selectedRates, setSelectedRates] = useState({});

  return (
    <div>
      <ListCurrencyInfo setSelectedRates={setSelectedRates} />
      <LiveCurrencyInfo selectedRates={selectedRates} />
      <HistoricalData selectedRates={selectedRates} />
    </div>
  );
}
