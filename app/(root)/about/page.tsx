import { Container } from "@/components/ui/shared";

export const metadata = {
  title: "Про нас — SimpleFood",
};

export default function AboutPage() {
  return (
    <Container className="my-10 max-w-[820px]">
      <h1 className="text-4xl font-extrabold mb-6">Про SimpleFood</h1>
      <p className="text-lg text-gray-600 mb-4">
        SimpleFood — це сімейний сервіс доставки бургерів, який працює в Києві з
        2020 року. Ми готуємо страви зі свіжих локальних продуктів і доставляємо
        їх гарячими за 15 хвилин.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
        {[
          { title: "15 хвилин", text: "Середній час доставки по місту" },
          { title: "100% свіжо", text: "Готуємо тільки після замовлення" },
          { title: "20+ страв", text: "Авторські рецепти від шефа" },
        ].map((it) => (
          <div
            key={it.title}
            className="bg-white border rounded-xl p-6 text-center"
          >
            <p className="text-3xl font-extrabold text-orange-500">
              {it.title}
            </p>
            <p className="text-gray-500 mt-2">{it.text}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-3">Наша філософія</h2>
      <p className="text-gray-600">
        Ми віримо, що швидка їжа може бути водночас смачною та якісною. Тому
        обираємо лише перевірених постачальників, готуємо все з нуля і не
        додаємо в страви консерванти.
      </p>
    </Container>
  );
}
