function Card({ title, description, info }) {
    return (
        <div class="flex flex-col justify-between rounded-md border border-ourLightGray bg-white p-4 shadow-md">
            <h3>{title}</h3>
            <p>{description}</p>
            {info && <p class="text-sm text-ourGray">{info}</p>}
        </div>)
}

export default function () {
    return (
        <>
            <div>

                <h1>5. Analytics und Bilanz</h1>
                <p>Wow, was ein toller Basar! Hier siehst du noch einmal schwarz auf weiß, wie gut er gelaufen ist - vielleicht kannst du aus den Informationen fürs nächste Mal lernen.</p>
                <div class="grid grid-cols-3 gap-6">
                    <Card title={"23.600€"} description="Umsatz"></Card>
                    <Card title={"1180€"} description="Profit bei aktueller Provisionsrate (5%)"></Card>
                    <Card title={"___€"} description="Trinkgeld" info=" Das Trinkgeld musst du manuell eintragen"></Card>
                    <div class="col-span-2 row-span-2 rounded-md border border-ourLightGray bg-white p-4 shadow-md">
                        <img />
                    </div>
                    <Card title={"23.600€"} description="Ø Trinkgeld/Verkauf">
                    </Card>
                    <Card title={"690"} description="Verkäufer"></Card>
                </div>
            </div >
        </>
    )
}