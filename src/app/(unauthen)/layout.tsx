import { alreadyLoggedIn } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await alreadyLoggedIn();
  return (
    <div className="">
      <div className="max-w-5xl m-auto w-full px-4">{children}</div>
    </div>
  );
}
