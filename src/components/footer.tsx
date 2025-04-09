const Footer = () => {
  return (
    <footer className="h-14 lg:h-16 flex flex-col items-center justify-center border-t border-gray-200 p-4 lg:px-6">
      <p>&copy; {new Date().getFullYear()} Visualizing Country Information</p>
      <p>
        Powered by{" "}
        <a
          href="https://nationnode.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline underline-offset-4"
        >
          NationNode
        </a>
      </p>
    </footer>
  );
};

export default Footer;
