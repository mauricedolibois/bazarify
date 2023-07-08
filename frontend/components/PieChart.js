import { Cell, PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

export default function Graph({soldOffers, unsoldOffers, reclinedOffers}) {

    const chartData = [
      { name: 'Verkaufte Produkte', value: soldOffers },
      { name: 'Offene Produkte', value: unsoldOffers },
      { name: 'Liegengebliebene Produkte', value: reclinedOffers },
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