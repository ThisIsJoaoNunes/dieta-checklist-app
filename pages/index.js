import { useState } from 'react';

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
  const [mealChecks, setMealChecks] = useState(Array(meals.length).fill(false));
  const [itemChecks, setItemChecks] = useState(Array(checklistItems.length).fill(false));

  const toggleMeal = (index) => {
    const newChecks = [...mealChecks];
    newChecks[index] = !newChecks[index];
    setMealChecks(newChecks);
  };

  const toggleItem = (index) => {
    const newChecks = [...itemChecks];
    newChecks[index] = !newChecks[index];
    setItemChecks(newChecks);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Checklist de Refeições</h1>
      {meals.map((meal, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={mealChecks[index]}
            onChange={() => toggleMeal(index)}
          />
          {meal.time} - {meal.name}
        </div>
      ))}

      <h1 style={{ marginTop: 30 }}>Lista de Compras</h1>
      {checklistItems.map((item, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={itemChecks[index]}
            onChange={() => toggleItem(index)}
          />
          {item}
        </div>
      ))}
    </div>
  );
}
