import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Home() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="pt-10 px-5 w-full">
        <h2 className="capitalize text-lg text-text-color font-neue font-medium py-4">
          Trending quizes
        </h2>
        <div className="w-full grid gap-3">
          <Card />
          <Card />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
