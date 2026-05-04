import { Container } from "@/components/ui/shared";
import { Tag, Gift, Percent, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";

export const metadata = { title: "Акції — SimpleFood" };

const PROMOS = [
  {
    Icon: Percent,
    title: "−20% на перше замовлення",
    text: "Зареєструйтеся та отримайте знижку 20% на ваше перше замовлення від 300 ₴.",
    badge: "NEW",
    color: "bg-orange-500",
  },
  {
    Icon: Gift,
    title: "Безкоштовний десерт",
    text: "До замовлення від 500 ₴ ми додамо комплімент від шефа.",
    badge: "HOT",
    color: "bg-red-500",
  },
  {
    Icon: Clock,
    title: "Щасливі години",
    text: "Щодня з 14:00 до 17:00 — друга кава у подарунок.",
    badge: "14–17",
    color: "bg-blue-500",
  },
  {
    Icon: Tag,
    title: "Сімейний комбо",
    text: "4 бургери + 4 напої з вигодою до 25%. Замовляйте сімейний набір.",
    badge: "−25%",
    color: "bg-green-500",
  },
];

export default function PromotionsPage() {
  return (
    <Container className="my-10">
      <h1 className="text-4xl font-extrabold mb-3">Акції</h1>
      <p className="text-gray-500 mb-8">
        Економте на улюблених стравах. Усі акції активні до кінця місяця.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROMOS.map(({ Icon, title, text, badge, color }) => (
          <div
            key={title}
            className="relative bg-white border rounded-2xl p-6 flex gap-4 hover:shadow-md transition"
          >
            <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
              <Icon className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">{title}</h3>
                <span
                  className={`text-white text-xs font-bold px-2 py-1 rounded-full ${color}`}
                >
                  {badge}
                </span>
              </div>
              <p className="text-gray-500 text-sm">{text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-2xl p-8 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold mb-1">Готові замовити?</h2>
          <p className="opacity-90">Усі акції автоматично застосуються в кошику.</p>
        </div>
        <Link href="/">
          <Button variant="outline" className="bg-white text-orange-500 border-white">
            Перейти в меню
          </Button>
        </Link>
      </div>
    </Container>
  );
}
