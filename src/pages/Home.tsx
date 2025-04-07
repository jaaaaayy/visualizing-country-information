import RegionDropdownMenuItem from "@/components/region-dropdown-menu-item";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Filter, Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { Country, ErrorResponse } from "@/types";
import CountryCard from "@/components/country-card";

const regions = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Oceana",
  "Antartica",
];

function Home() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState<ErrorResponse | null>(null);

  async function fetchCountry() {
    try {
      const response = await fetch(
        "https://countries-api-abhishek.vercel.app/countries"
      );

      const { data } = await response.json();

      if (!response.ok) {
        setError(data);
      }

      setCountries(data);
    } catch (error) {
      console.log("Something went wrong!", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCountry();
  }, []);

  const handleRegionChange = (region: string, checked: boolean) => {
    if (checked) {
      setSelectedRegions((prev) => [...prev, region]);
    } else {
      setSelectedRegions((prev) => prev.filter((r) => r !== region));
    }
  };

  const filteredCountries = countries.filter((country) => {
    if (selectedRegions.length && !selectedRegions.includes(country.region)) {
      return false;
    }

    return country.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
  });

  return (
    <div className="max-w-[1440px] mx-auto h-screen flex flex-col">
      <Header />
      <main className="p-4 lg:p-6 space-y-6 container mx-auto flex-1 flex flex-col">
        <div className="flex justify-end gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>
                <Filter className="text-muted-foreground" /> Region
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {regions.map((region) => (
                <RegionDropdownMenuItem
                  key={region}
                  checked={selectedRegions.includes(region)}
                  onCheckedChange={(checked: boolean) =>
                    handleRegionChange(region, checked)
                  }
                  label={region}
                />
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative">
            <Search className="size-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search country..."
              className="md:w-xs pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {error ? (
          <div className="flex items-center justify-center flex-1">
            <p>{error.message}</p>
            <p>{error.details}</p>
          </div>
        ) : loading ? (
          <div className="flex flex-col gap-2 items-center justify-center flex-1">
            <span className="animate-spin">
              <Loader2 />
            </span>
            <p>Loading countries...</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCountries.map((country, index) => (
              <CountryCard key={index} country={country} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Home;
