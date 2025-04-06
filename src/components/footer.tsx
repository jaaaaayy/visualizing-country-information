function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Visualizing Country Information</p>
      <p>
        Data powered by{" "}
        <a
          href="https://nationnode.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          NationNode API
        </a>
      </p>
    </footer>
  );
}

export default Footer;
