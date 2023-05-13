function Card({ title, description }) {
    <div class="flex flex-col justify-between rounded-md border border-gray-300 bg-red-400 p-4 shadow-md">
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
}

export default function () {
    return (
        <>
            <div>
                <Card title={"23.600€"} description="Umsatz">TEST</Card>

                <h1>5. Analytics und Bilanz</h1>
                <p>Wow, was ein toller Basar! Hier siehst du noch einmal schwarz auf weiß, wie gut er gelaufen ist - vielleicht kannst du aus den Informationen fürs nächste Mal lernen.</p>
                <div class="grid grid-cols-3 gap-6">
                    <div class="flex flex-col justify-between rounded-md border border-gray-300 bg-white p-4 shadow-md">
                        <h3>23.600€</h3>
                        <p>Umsatz</p>
                    </div>
                    <div class="flex flex-col justify-between rounded-md border border-gray-300 bg-white p-4 shadow-md">
                        <h3>1180€</h3>
                        <p>Profit bei aktueller Provisionsrate (5%)</p>
                    </div>
                    <div class="flex flex-col justify-between rounded-md border border-gray-300 bg-white p-4 shadow-md">
                        <h3>___€</h3>
                        <p>Trinkgeld</p>
                        <p>Das Trinkgeld musst du manuell eintragen</p>
                    </div>
                    <div class="col-span-2 row-span-2 rounded-md border border-gray-300 bg-white p-4 shadow-md">
                        <img />
                    </div>
                    <div class="flex flex-col justify-between rounded-md border border-gray-300 bg-white p-4 shadow-md">
                        <h3>___€</h3>
                        <p>Ø Trinkgeld/Verkauf</p>
                        <p>Wird berechnet, sobald du oben das erhaltene Tringeld angibst</p>
                    </div>
                    <div class="flex flex-col justify-between rounded-md border border-gray-300 bg-white p-4 shadow-md">
                        <h3>690</h3>
                        <p>Verkäufer</p>
                    </div>
                </div>
            </div>
        </>
    )
}