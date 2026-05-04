import { Container } from "@/components/ui/shared";
import { Truck, Clock, MapPin, Wallet, ShieldCheck } from "lucide-react";

export const metadata = { title: "Доставка та оплата — SimpleFood" };

export default function DeliveryPage() {
  return (
    <Container className="my-10 max-w-[920px]">
      <h1 className="text-4xl font-extrabold mb-3">Доставка та оплата</h1>
      <p className="text-gray-500 mb-8">
        Швидко, прозоро і зручно — як ви любите.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {[
          { Icon: Clock, title: "15 хвилин", text: "Середній час доставки по Києву" },
          { Icon: Truck, title: "Безкоштовно", text: "При замовленні від 300 ₴" },
          { Icon: MapPin, title: "Уся столиця", text: "Доставляємо в межах міста" },
        ].map(({ Icon, title, text }) => (
          <div key={title} className="bg-white border rounded-xl p-5 text-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mx-auto mb-3">
              <Icon className="w-6 h-6" />
            </div>
            <p className="font-bold">{title}</p>
            <p className="text-sm text-gray-500">{text}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-3">Зони і вартість доставки</h2>
      <div className="bg-white border rounded-xl overflow-hidden mb-10">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">Зона</th>
              <th className="text-left p-3">Час</th>
              <th className="text-left p-3">Вартість</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Центр", "10–20 хв", "Безкоштовно від 300 ₴"],
              ["Лівий берег", "20–30 хв", "Безкоштовно від 500 ₴"],
              ["Передмістя", "30–45 хв", "60 ₴ + замовлення від 700 ₴"],
            ].map(([zone, time, price]) => (
              <tr key={zone} className="border-t">
                <td className="p-3 font-medium">{zone}</td>
                <td className="p-3 text-gray-500">{time}</td>
                <td className="p-3">{price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mb-3">Способи оплати</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            Icon: Wallet,
            title: "Готівкою кур'єру",
            text: "Сплачуйте при отриманні замовлення.",
          },
          {
            Icon: ShieldCheck,
            title: "Карткою онлайн",
            text: "Захищена оплата Visa / Mastercard / Apple Pay / Google Pay.",
          },
        ].map(({ Icon, title, text }) => (
          <div
            key={title}
            className="bg-white border rounded-xl p-5 flex gap-4 items-start"
          >
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold">{title}</p>
              <p className="text-sm text-gray-500">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
