
import { useEffect, useState } from "react";

const meals = [
  { time: "08:00", name: "Café da manhã" },
  { time: "10:30", name: "Lanche da manhã" },
  { time: "12:30", name: "Pré-almoço leve" },
  { time: "13:00", name: "Almoço" },
  { time: "16:00", name: "Lanche da tarde" },
  { time: "18:30", name: "Pré-treino leve" },
  { time: "21:30", name: "Pós-treino + Jantar" },
  { time: "23:00", name: "Ceia" }
];

const checklistItems = [
  "Peito de frango", "Carne magra", "Ovos", "Peito de peru", "Queijo branco",
  "Whey hipercalórico", "Arroz", "Batata-doce", "Aveia", "Bananas",
  "Frutas variadas", "Pão integral", "Pão francês", "Tapioca", "Barra de cereal",
  "Pasta de amendoim", "Castanhas", "Azeite de oliva", "Legumes", "Verduras",
  "Leite integral", "Iogurte", "Mel e temperos"
];

export default function Home() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [mealChecksByDate, setMealChecksByDate] = useState({});
  const [itemPurchases, setItemPurchases] = useState({});

  useEffect(() => {
    if (!mealChecksByDate[selectedDate]) {
      setMealChecksByDate(prev => ({ ...prev, [selectedDate]: Array(meals.length).fill(false) }));
    }
  }, [selectedDate]);

  const toggleMeal = (index) => {
    setMealChecksByDate(prev => {
      const updated = [...(prev[selectedDate] || Array(meals.length).fill(false))];
      updated[index] = !updated[index];
      return { ...prev, [selectedDate]: updated };
    });
  };

  const togglePurchase = (item) => {
    setItemPurchases(prev => {
      const current = prev[item];
      return { ...prev, [item]: current ? null : today };
    });
  };

  const pendingItems = checklistItems.filter(item => !itemPurchases[item]);

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>📅 Data de referência</h2>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={{ marginBottom: 20 }}
      />

      <h2>✅ Refeições ({selectedDate})</h2>
      {meals.map((meal, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={mealChecksByDate[selectedDate]?.[index] || false}
            onChange={() => toggleMeal(index)}
          />
          {meal.time} - {meal.name}
        </div>
      ))}

      <h2 style={{ marginTop: 30 }}>🛒 Lista de Compras</h2>
      {checklistItems.map((item, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={!!itemPurchases[item]}
            onChange={() => togglePurchase(item)}
          />
          {item} {itemPurchases[item] ? `(comprado em ${itemPurchases[item]})` : "(não comprado)"}
        </div>
      ))}

      <h2 style={{ marginTop: 30 }}>📌 Lembretes de compras</h2>
      {pendingItems.length === 0 ? (
        <p>Você comprou todos os itens 🎉</p>
      ) : (
        <ul>
          {pendingItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
