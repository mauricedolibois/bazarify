import { useState, useEffect } from 'react';
import FormInput from '../formInput';

function Card({ title, description, info }) {
  return (
    <div className="flex flex-col justify-between rounded-md border border-ourLightGray bg-white p-4 shadow-md">
      <h3>{title}</h3>
      <p>{description}</p>
      {info && <p className="text-sm text-ourGray">{info}</p>}
    </div>
  );
}

export default function () {
  const [revenue, setRevenue] = useState(0);
  const [profit, setProfit] = useState(0);
  const [provision, setProvision] = useState(0);
  const [tips, setTips] = useState('0');
  const [totalSellerCount, setTotalSellerCount] = useState(0);
  const [tipPerCustomer, setTipPerCustomer] = useState('0');

  useEffect(() => {
    fetch('http://localhost:8080/api/analytics', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRevenue(data.Revenue);
        setProvision(data.Provision);
        setTotalSellerCount(data.Sellers);
        setTipPerCustomer((data.Tips / data.Offers).toFixed(2));
      });
  }, []);

  // set tips when input changes
  // set tips when input changes
const handleTipsChange = (e) => {
    const input = e.target.value;
    if (/^[0-9]*([.,][0-9]{0,2})?$/.test(input)) {
      setTips(input);
    }
  };
  

  // update tips in db
  useEffect(() => {
    let timeoutId;

    const updateTips = () => {
      if (tips !== '0') {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tip: tips.replace(',', '.') }),
        };

        fetch('http://localhost:8080/api/tip', requestOptions)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => console.log(error));
      }
    };

    const delayUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateTips, 1000);
    };

    delayUpdate();

    return () => clearTimeout(timeoutId);
  }, [tips]);

  // update tips in frontend
  useEffect(() => {
    if (tips !== '0') {
      setTipPerCustomer((parseFloat(tips.replace(',', '.')) / totalSellerCount).toFixed(2));
    }
  }, [tips, totalSellerCount]);

  return (
    <>
      <div>
        <h1>5. Analytics und Bilanz</h1>
        <p className="mb-4">
          Wow, was ein toller Basar! Hier siehst du noch einmal schwarz auf weiß, wie gut er gelaufen ist - vielleicht kannst
          du aus den Informationen fürs nächste Mal lernen.
        </p>
        <div className="grid grid-cols-3 gap-6">
          <Card title={`${revenue}€`} description="Umsatz" />
          <Card title={`${(revenue * provision) / 100}€`} description={`Profit bei aktueller Provisionsrate (${provision}%)`} />
          <Card title={<FormInput id="tips" value={tips} unit="€" onChange={handleTipsChange} />} description="Trinkgeld" info="Das Trinkgeld musst du manuell eintragen" />
          <div className="col-span-2 row-span-2 rounded-md border border-ourLightGray bg-white p-4 shadow-md"></div>
          <Card title={`${tipPerCustomer}€`} description="Ø Trinkgeld/Verkauf" />
          <Card title={totalSellerCount} description="Verkäufer" />
        </div>
      </div>
    </>
  );
}
