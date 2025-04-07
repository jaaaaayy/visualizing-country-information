import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import CountryDetails from "../components/country-details";
import Footer from "../components/footer";
import Header from "../components/header";
import { Checkbox } from "@/components/ui/checkbox";

type Error = {
  message: string;
  details: string;
};

function Home() {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [country, setCountry] = useState(null);
  const [error, setError] = useState<Error | null>(null);

  async function fetchCountry() {
    const response = await fetch(
      "https://countries-api-abhishek.vercel.app/countries/Afghanistan"
    );

    const { data } = await response.json();

    if (!response.ok) {
      setError(data);
    }

    setCountry(data);
  }

  useEffect(() => {
    fetchCountry();
  }, []);

  useEffect(() => {
    console.log(selectedRegions);
  }, [selectedRegions]);

  const handleRegionChange = (region: string, checked: boolean) => {
    if (checked) {
      setSelectedRegions((prev) => [...prev, region]);
    } else {
      setSelectedRegions((prev) => prev.filter((r) => r !== region));
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      <Header />
      <main className="p-4 lg:p-6 space-y-6 container mx-auto">
        <div className="flex justify-end gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>
                <Filter /> Region
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                <Checkbox
                  id="africa"
                  checked={selectedRegions.includes("Africa")}
                  onCheckedChange={(checked: boolean) =>
                    handleRegionChange("Africa", checked)
                  }
                />
                <label htmlFor="africa">Africa</label>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                <Checkbox
                  id="asia"
                  checked={selectedRegions.includes("Asia")}
                  onCheckedChange={(checked: boolean) =>
                    handleRegionChange("Asia", checked)
                  }
                />
                <label htmlFor="asia">Asia</label>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                <Checkbox
                  id="europe"
                  checked={selectedRegions.includes("Europe")}
                  onCheckedChange={(checked: boolean) =>
                    handleRegionChange("Europe", checked)
                  }
                />
                <label htmlFor="europe">Europe</label>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                <Checkbox
                  id="northAmerica"
                  checked={selectedRegions.includes("North America")}
                  onCheckedChange={(checked: boolean) =>
                    handleRegionChange("North America", checked)
                  }
                />
                <label htmlFor="northAmerica">North America</label>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                <Checkbox
                  id="southAmerica"
                  checked={selectedRegions.includes("South America")}
                  onCheckedChange={(checked: boolean) =>
                    handleRegionChange("South America", checked)
                  }
                />
                <label htmlFor="southAmerica">South America</label>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                <Checkbox
                  id="oceana"
                  checked={selectedRegions.includes("Oceana")}
                  onCheckedChange={(checked: boolean) =>
                    handleRegionChange("Oceana", checked)
                  }
                />
                <label htmlFor="oceana">Oceana</label>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                <Checkbox
                  id="antartica"
                  checked={selectedRegions.includes("Antartica")}
                  onCheckedChange={(checked: boolean) =>
                    handleRegionChange("Antartica", checked)
                  }
                />
                <label htmlFor="antartica">Antartica</label>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex gap-2">
            <Input placeholder="Search country" className="w-xs" />
            <Button>Search</Button>
          </div>
        </div>
        {error ? (
          <div>
            <p>{error.message}</p>
            <p>{error.details}</p>
          </div>
        ) : (
          <CountryDetails country={country} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Home;
