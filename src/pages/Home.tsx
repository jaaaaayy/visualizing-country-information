import Footer from "../components/footer";
import Header from "../components/header";

function Home() {
  return (
    <div className="max-w-[1440px] mx-auto">
      <Header />
      <main className="p-2 lg:p-4">
        <div className="grid grid-cols-4 gap-6"></div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
