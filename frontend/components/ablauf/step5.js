import { useState, useEffect } from 'react';
import FormInput from '../formInput';
import { Cell, PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

function Card({ title, description, info }) {
  return (
    <div className="flex flex-col justify-between rounded-md border border-ourLightGray bg-white p-4 shadow-md">
      <h3>{title}</h3>
      <p>{description}</p>
      {info && <p className="text-sm text-ourGray">{info}</p>}
    </div>
  );
}

function Graph({ soldOffers, unsoldOffers, reclinedOffers }) {
  const chartData = [
    { name: 'Verkaufte Produkte', value: soldOffers.length },
    { name: 'Offene Produkte', value: unsoldOffers.length },
    { name: 'Liegengebliebene Produkte', value: reclinedOffers.length },
  ];

  const COLORS = ['#DEAE31', '#5E5E5E', '#A6A6A6'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default function Analytics() {
  const [revenue, setRevenue] = useState(0);
  const [profit, setProfit] = useState(0);
  const [provision, setProvision] = useState(0);
  const [tips, setTips] = useState('0');
  const [totalSellerCount, setTotalSellerCount] = useState(0);
  const [tipsAverage, setTipsAverage] = useState(0);
  const [soldOffers, setSoldOffers] = useState([]);
  const [unsoldOffers, setUnsoldOffers] = useState([]);
  const [reclinedOffers, setReclinedOffers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/analytics', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRevenue(data.Revenue);
        setProvision(data.Provision);
        setTotalSellerCount(data.Sellers);

        if (data.Tips) setTips(data.Tips.toString());
        if (
          data.Revenue > 0 &&
          data.Tips !== 0 &&
          data.Tips !== null &&
          tips !== 0 &&
          tips !== null
        ) {
          setTipsAverage((data.Revenue / data.Tips / 100).toFixed(2));
        } else {
          setTipsAverage(0);
        }
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/allOffers', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const soldOffers = [];
        const unsoldOffers = [];
        const reclinedOffers = [];
        data.forEach(offer => {
          if (offer.state === 'sold') {
            soldOffers.push(offer);
          } else if (offer.state === 'open') {
            unsoldOffers.push(offer);
          } else {
            reclinedOffers.push(offer);
          }
        });
        setSoldOffers(soldOffers);
        setUnsoldOffers(unsoldOffers);
        setReclinedOffers(reclinedOffers);
      })
      .catch(error => console.log(error));
  }, []);

  const handleTipsChange = (e) => {
    const input = e.target.value;
    const regex = /^([0-9]{0,7}([.,][0-9]{0,2})?)?$/;
    if (regex.test(input)) {
      setTips(input);
    }
  };

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

  useEffect(() => {
    if (tips !== 0) {
      setTipsAverage((parseFloat(tips.replace(',', '.')) / revenue * 100).toFixed(2));
    }
  }, [tips, revenue]);

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
          <Card title={totalSellerCount} description="Verkäufer" />

          <div className="col-span-2 row-span-2 rounded-md border border-ourLightGray bg-white p-4 shadow-md">
            <Graph soldOffers={soldOffers} unsoldOffers={unsoldOffers} reclinedOffers={reclinedOffers} />
          </div>
          <Card title={<FormInput id="tips" value={tips} unit="€" onChange={handleTipsChange} />} description="Trinkgeld" info="Das Trinkgeld musst du manuell eintragen" />
          <Card title={`${tipsAverage} %`} description="Ø Trinkgeld" />
        </div>
      </div>
    </>
  );
}
