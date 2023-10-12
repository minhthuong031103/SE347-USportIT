interface ProductsLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function ProductsLayout({
  children,
  modal,
}: ProductsLayoutProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {children}
      {modal}
    </div>
  );
}
