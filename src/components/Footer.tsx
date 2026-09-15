export const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-gray-800 py-4 text-white">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} GrubExpress. All rights reserved.</p>
      </div>
    </footer>
  );
};