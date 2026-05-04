import Link from "next/link";
import Image from "next/image";
import { Container } from "./container";
import { getServerDict } from "@/lib/locale-server";

export const Footer: React.FC = () => {
  const t = getServerDict();
  return (
    <footer className="border-t bg-white mt-20">
      <Container className="py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Image src="/logo.png" alt="Logo" width={28} height={28} />
            <span className="font-black uppercase">
              Simple<span className="text-orange-500">Food</span>
            </span>
          </div>
          <p className="text-sm text-gray-500">{t["footer.tagline"]}</p>
        </div>

        <div>
          <p className="font-bold mb-3">{t["footer.shop"]}</p>
          <ul className="flex flex-col gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-orange-500">{t["nav.menu"]}</Link></li>
            <li><Link href="/cart" className="hover:text-orange-500">{t["cart.title"]}</Link></li>
            <li><Link href="/profile" className="hover:text-orange-500">{t["nav.profile"]}</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-bold mb-3">{t["footer.info"]}</p>
          <ul className="flex flex-col gap-2 text-sm text-gray-500">
            <li><Link href="/about" className="hover:text-orange-500">{t["nav.about"]}</Link></li>
            <li><Link href="/contacts" className="hover:text-orange-500">{t["nav.contacts"]}</Link></li>
            <li><Link href="/promotions" className="hover:text-orange-500">{t["nav.promotions"]}</Link></li>
            <li><Link href="/delivery" className="hover:text-orange-500">{t["nav.delivery"]}</Link></li>
            <li><Link href="/faq" className="hover:text-orange-500">{t["nav.faq"]}</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-bold mb-3">{t["footer.contacts"]}</p>
          <ul className="flex flex-col gap-2 text-sm text-gray-500">
            <li>+380 (44) 555-55-55</li>
            <li>hello@simplefood.ua</li>
            <li>м. Київ, вул. Хрещатик, 1</li>
          </ul>
        </div>
      </Container>
      <div className="border-t">
        <Container className="py-4 text-xs text-gray-400 flex justify-between">
          <span>© {new Date().getFullYear()} SimpleFood. {t["footer.rights"]}</span>
          <span>Made with ❤ in Ukraine</span>
        </Container>
      </div>
    </footer>
  );
};
