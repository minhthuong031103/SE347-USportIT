import { getSession } from '@/lib/auth';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  console.log('session in home pageeeeeeeeeeeeeeeeeeee');
  console.log(session);
  return (
    <div className="w-full h-full">
      {/* <Header session={session} /> */}
      {children}
      {/* <Footer /> */}
    </div>
  );
}
