interface ProductsLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function ProductsLayout({
  children,
  modal,
}: ProductsLayoutProps) {
  const mainStyles = {
    margin: '0 auto',
    padding: '6rem',
  };
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={mainStyles}
    >
      {children}
      {modal}
    </div>
  );
}
