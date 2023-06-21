import { useState, useEffect } from 'react';

function Card({ title, description, info }) {
    return (
        <div class="flex flex-col justify-between rounded-md border border-ourLightGray bg-white p-4 shadow-md">
            <h3>{title}</h3>
            <p>{description}</p>
            {info && <p class="text-sm text-ourGray">{info}</p>}
        </div>)
}

export default function () {
    const [umsatz, setUmsatz] = useState(0);
    const [profit, setProfit] = useState(0);
    const [profitProvisionsrate, setProfitProvisionsrate] = useState(0);
    const [trinkgeld, setTrinkgeld] = useState(0);
    const [verkaufer, setVerkaufer] = useState(0);
    const [trinkgeldProVerkauf, setTrinkgeldProVerkauf] = useState(0);

    useEffect(() => {
        // Hier den Code einfügen, um die Daten aus dem Backend zu laden und die Zustandsvariablen zu aktualisieren
    }, []);

    return (
        <>
            <div>
                <h1>5. Analytics und Bilanz</h1>
                <p className='mb-4'>Wow, was ein toller Basar! Hier siehst du noch einmal schwarz auf weiß, wie gut er gelaufen ist - vielleicht kannst du aus den Informationen fürs nächste Mal lernen.</p>
                <div class="grid grid-cols-3 gap-6">

                    <Card title={`${umsatz}€`} description="Umsatz"></Card>
                    <Card title={`${profit}€`} description="Profit bei aktueller Provisionsrate (5%)"></Card>
                    <Card title={<><span className='text-ourPrimaryColor'>{trinkgeld}€</span></>} description="Trinkgeld" info=" Das Trinkgeld musst du manuell eintragen"></Card>

                    <div class="col-span-2 row-span-2 rounded-md border border-ourLightGray bg-white p-4 shadow-md">
                    </div>
                    <Card title={`${trinkgeldProVerkauf}€`} description="Ø Trinkgeld/Verkauf">
                    </Card>
                    <Card title={verkaufer} description="Verkäufer"></Card>
                </div>
            </div >
        </>
    )
}