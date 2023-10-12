import { Header } from '@/components/header';
import { getSession } from '@/lib/auth';
interface ProductsLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default async function ProductsLayout({
  children,
  modal,
}: ProductsLayoutProps) {
  const session = await getSession();
  return (
    <div className="w-full h-full items-center justify-center">
      <Header session={session} />
      {children}
      {modal}
    </div>
  );
}
