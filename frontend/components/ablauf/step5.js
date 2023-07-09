import { useState, useEffect } from 'react';
import FormInput from '../formInput';
import useCountUp from '../../hooks/useCountUp.js'
import Card from '../Card.js'
import Graph from '../PieChart.js';

export default function Analytics() {
  const [revenue, setRevenue] = useState(0);
  const [provision, setProvision] = useState(0);
  const [profit, setProfit] = useState(0);
  const [tips, setTips] = useState('0');
  const [totalSellerCount, setTotalSellerCount] = useState(0);
  const [tipsAverage, setTipsAverage] = useState(0);
  const [soldOffers, setSoldOffers] = useState([]);
  const [unsoldOffers, setUnsoldOffers] = useState([]);
  const [reclinedOffers, setReclinedOffers] = useState([]);
  const [shouldUpdateTips, setShouldUpdateTips] = useState([false])

  const animatedRevenue = useCountUp(revenue, 1000);
  const animatedProfit = useCountUp(profit, 1000); 
  const animatedSellerCount = useCountUp(totalSellerCount, 1000); 
  const animatedTipsAverage = useCountUp(tipsAverage, 1000); 


  useEffect(() => {
    fetch('http://localhost:8080/api/analytics', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setRevenue(data.Revenue);
        setProvision(data.Provision);
        setProfit((data.Revenue * data.Provision) / 100)
        setTotalSellerCount(data.Sellers);
        if (data.Tips !== null){
          setTips(data.Tips.toString())
          if (data.Revenue !== 0) {
            setTipsAverage((data.Tips / data.Revenue * 100).toFixed(2));
          }
          } else {
            setTips('0')
            setTipsAverage(0.00)
          }
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/allOffers', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
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
    let input = e.target.value;
    const regex = /^([0-9]{0,7}([.,][0-9]{0,2})?)?$/;
    if(input === '') {
      input = '0'
      setShouldUpdateTips(true)
    }
    if (regex.test(input)) {
      setShouldUpdateTips(true)
      setTips(input);
    }
  };

  useEffect(() => {
    let timeoutId;

    const updateTips = () => {
      if (shouldUpdateTips) {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tip: tips.replace(',', '.') }),
        };

        fetch('http://localhost:8080/api/tip', requestOptions)
          .then((res) => res.json())
          .then((data) => {
            console.log("Tips updated: ", tips);
            setShouldUpdateTips(false)
          })
          .catch((error) => console.log(error));
      }
    };

    const delayUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateTips, 500);
    };

    delayUpdate();

    return () => clearTimeout(timeoutId);
  }, [tips]);

  useEffect(() => {
    console.log("tipsAverage: ", (parseFloat(tips.replace(',', '.')) / revenue * 100).toFixed(2))
    if (shouldUpdateTips) {
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
          <Card title={`${animatedRevenue}€`} description="Umsatz" />
          <Card title={`${animatedProfit}€`} description={`Profit bei aktueller Provisionsrate (${provision}%)`} />
          <Card title={animatedSellerCount} description="Verkäufer" />

          <div className="col-span-2 row-span-2 rounded-md border border-ourLightGray bg-white p-4 shadow-md">
            <Graph soldOffers={soldOffers.length} unsoldOffers={unsoldOffers.length} reclinedOffers={reclinedOffers.length} />
          </div>
          <Card title={<FormInput id="tips" value={tips} unit="€" onChange={handleTipsChange} />} description="Trinkgeld" info="Das Trinkgeld musst du manuell eintragen" />
          <Card title={`${tipsAverage} %`} description="Ø Trinkgeld" />
        </div>
      </div>
    </>
  );
}
