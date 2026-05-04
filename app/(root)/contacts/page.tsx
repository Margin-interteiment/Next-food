import { Container } from "@/components/ui/shared";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Контакти — SimpleFood",
};

export default function ContactsPage() {
  return (
    <Container className="my-10 max-w-[820px]">
      <h1 className="text-4xl font-extrabold mb-6">Контакти</h1>
      <p className="text-gray-600 mb-8">
        Звертайтесь до нас будь-яким зручним способом. Ми завжди раді допомогти!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            Icon: Phone,
            title: "Телефон",
            value: "+380 (44) 555-55-55",
            href: "tel:+380445555555",
          },
          {
            Icon: Mail,
            title: "Email",
            value: "hello@simplefood.ua",
            href: "mailto:hello@simplefood.ua",
          },
          {
            Icon: MapPin,
            title: "Адреса",
            value: "м. Київ, вул. Хрещатик, 1",
          },
          {
            Icon: Clock,
            title: "Графік роботи",
            value: "Щодня з 10:00 до 22:00",
          },
        ].map(({ Icon, title, value, href }) => (
          <div
            key={title}
            className="bg-white border rounded-xl p-5 flex gap-4 items-start"
          >
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{title}</p>
              {href ? (
                <a href={href} className="font-bold hover:text-orange-500">
                  {value}
                </a>
              ) : (
                <p className="font-bold">{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
