
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

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

export default function DietaChecklistApp() {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
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
      const today = format(new Date(), 'yyyy-MM-dd');
      return { ...prev, [item]: current ? null : today };
    });
  };

  const pendingItems = checklistItems.filter(item => !itemPurchases[item]);

  return (
    <div className="p-4 grid gap-6">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">Data de referência</h2>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mb-4"
          />

          <h2 className="text-xl font-bold mb-2">Checklist de Refeições ({selectedDate})</h2>
          {meals.map((meal, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Checkbox checked={mealChecksByDate[selectedDate]?.[index] || false} onCheckedChange={() => toggleMeal(index)} />
              <span>{meal.time} - {meal.name}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">Lista de Compras</h2>
          {checklistItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mb-1">
              <Checkbox checked={!!itemPurchases[item]} onCheckedChange={() => togglePurchase(item)} />
              <span>{item} {itemPurchases[item] ? `(comprado em ${itemPurchases[item]})` : "(não comprado)"}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">Lembretes de compras</h2>
          {pendingItems.length === 0 ? (
            <p>Você comprou todos os itens 🎉</p>
          ) : (
            <ul className="list-disc ml-6">
              {pendingItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
