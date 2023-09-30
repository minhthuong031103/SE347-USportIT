export default function ProductssPageLayout({ children }) {
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
    </div>
  );
}
