import CountryDetails from "@/components/country-details";
import RegionDropdownMenuItem from "@/components/region-dropdown-menu-item";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Country } from "@/types";
import { Filter, Loader2, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";

const regions = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Oceana",
  "Antartica",
];

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [country, setCountry] = useState<Country | null>(null);
  const [error, setError] = useState("");

  async function fetchCountry(country: string) {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://countries-api-abhishek.vercel.app/countries/${country}`
      );

      const result = await response.json();

      if (!response.ok) {
        setError(result.details);
      }
      if (
        selectedRegions.length &&
        !selectedRegions.includes(result.data.region)
      ) {
        setCountry(null);
        setError(`Country ${searchTerm} not found.`);

        return;
      }

      setCountry(result.data);
    } catch (error) {
      console.log("Something went wrong!", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCountry(searchTerm ? searchTerm : "Afghanistan");
  }, [selectedRegions]);

  const handleRegionChange = (region: string, checked: boolean) => {
    if (checked) {
      setSelectedRegions((prev) => [...prev, region]);
    } else {
      setSelectedRegions((prev) => prev.filter((r) => r !== region));
    }
  };

  const handleSearch = () => {
    fetchCountry(searchTerm ? searchTerm : "Afghanistan");
  };

  const handleClose = () => {
    setSearchTerm("");
  };

  return (
    <div className="max-w-[1440px] mx-auto h-screen flex flex-col">
      <Header />
      <main className="p-4 lg:p-6 space-y-6 flex-1 flex flex-col">
        <div className="flex justify-end gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>
                <Filter className="text-muted-foreground" />{" "}
                <span className="hidden sm:inline-block">Region</span>
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
          <div className="flex gap-2">
            <div className="relative border">
              <Input
                placeholder="Search country..."
                className="md:w-xs pr-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm ? (
                <X
                  onClick={handleClose}
                  className="size-4 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2"
                />
              ) : null}
            </div>
            <Button onClick={handleSearch}>
              <span className="hidden sm:inline-block">Search</span>
              <Search className="sm:hidden" />
            </Button>
          </div>
        </div>
        {error ? (
          <div className="flex flex-col items-center justify-center flex-1">
            <p className="text-destructive">{error}</p>
          </div>
        ) : loading ? (
          <div className="flex flex-col gap-2 items-center justify-center flex-1">
            <span className="animate-spin">
              <Loader2 />
            </span>
            <p>Loading country...</p>
          </div>
        ) : country ? (
          <CountryDetails country={country} />
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
