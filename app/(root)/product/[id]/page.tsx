import { Container } from "@/components/ui/shared";
import { GroupVariants } from "@/components/ui/shared/group-variants";
import { ProductImage } from "@/components/ui/shared/product-image";
import { prisma } from "@/prisma/prisma-client";
import { Dialog, Title } from "@radix-ui/react-dialog";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage imageUrl={product.imageUrl} size={30} />

        <div className="w-[490px] bg-[#f7f6f5] p-7">
          <Dialog>
            <Title className="font-extrabold mb-1 md">{product.name}</Title>
          </Dialog>

          <p className="text-gray-400">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>

          <GroupVariants
            selectedValue="2"
            items={[
              {
                name: "Маленький",
                value: "1",
              },
              {
                name: "Середній",
                value: "2",
              },
              {
                name: "Великий",
                value: "3",
              },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
