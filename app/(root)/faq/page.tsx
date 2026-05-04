import { Container } from "@/components/ui/shared";

export const metadata = { title: "FAQ — SimpleFood" };

const FAQ = [
  {
    q: "Скільки часу займає доставка?",
    a: "У середньому 15 хвилин по центру Києва, до 45 хвилин — на околицях. Точний час бачите при оформленні замовлення.",
  },
  {
    q: "Чи можна замовити без реєстрації?",
    a: "Так, оформлення замовлення доступне без створення акаунта. Але з акаунтом ви бачите історію замовлень і отримуєте бонуси.",
  },
  {
    q: "Як скасувати замовлення?",
    a: "Зателефонуйте нам у перші 5 хвилин після оформлення — ще не почали готувати, тому скасуємо безкоштовно.",
  },
  {
    q: "Чи є вегетаріанські варіанти?",
    a: "Так, у нас є бургери на основі грибної котлети, а також салати та десерти без мʼяса.",
  },
  {
    q: "Чи можна додати свої інгредієнти?",
    a: "Звісно! При виборі бургера ви можете додати будь-які з 12+ інгредієнтів — від моцарели до свіжих овочів.",
  },
  {
    q: "Скільки годин ви працюєте?",
    a: "Щодня з 10:00 до 22:00. Останнє замовлення приймаємо о 21:30.",
  },
];

export default function FaqPage() {
  return (
    <Container className="my-10 max-w-[820px]">
      <h1 className="text-4xl font-extrabold mb-3">Часті питання</h1>
      <p className="text-gray-500 mb-8">
        Відповіді на найпоширеніші запитання наших клієнтів.
      </p>

      <div className="flex flex-col gap-3">
        {FAQ.map(({ q, a }) => (
          <details
            key={q}
            className="bg-white border rounded-xl px-5 py-4 group cursor-pointer"
          >
            <summary className="font-bold flex justify-between items-center list-none">
              {q}
              <span className="text-orange-500 text-xl group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="text-gray-500 mt-3 text-sm leading-relaxed">{a}</p>
          </details>
        ))}
      </div>

      <p className="text-center text-gray-400 text-sm mt-10">
        Не знайшли відповідь?{" "}
        <a href="/contacts" className="text-orange-500 font-medium">
          Звʼяжіться з нами
        </a>
      </p>
    </Container>
  );
}
