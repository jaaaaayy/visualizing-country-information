import CountryCard from "@/components/country-card";
import CountryDetails from "@/components/country-details";
import Footer from "@/components/footer";
import Header from "@/components/header";
import RegionDropdownMenuItem from "@/components/region-dropdown-menu-item";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Country } from "@/types";
import { AlertCircle, Filter, Loader2, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const regions = [
  "Asia",
  "Europe",
  "Africa",
  "Americas",
  "Oceania",
  "North America",
  "South America",
  "Fictional",
];

const baseUrl = "https://countries-api-abhishek.vercel.app/";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [country, setCountry] = useState<Country | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const ignoreRef = useRef(false);

  const fetchCountry = async (country: string) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${baseUrl}countries/${country}`);

      const result = await response.json();

      if (!response.ok) {
        setError(result.details);
        return;
      }

      if (!ignoreRef.current) {
        setCountry(result.data);
      }
    } catch (error) {
      console.log("Failed to fetch country!", error);
      setError("Failed to fetch country!");
    } finally {
      setLoading(false);
    }
  };

  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${baseUrl}countries`);

      const result = await response.json();

      if (!response.ok) {
        setError(result.details);
        return;
      }

      if (!ignoreRef.current) {
        const filteredCountries = result.data.filter((country: Country) =>
          selectedRegions.includes(country.region)
        );
        setCountries(filteredCountries);
      }
    } catch (error) {
      console.log("Failed to fetch countries!", error);
      setError("Failed to fetch countries!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ignoreRef.current = false;

    fetchCountry("Afghanistan");

    return () => {
      ignoreRef.current = true;
    };
  }, []);

  useEffect(() => {
    ignoreRef.current = false;

    selectedRegions && fetchCountries();

    return () => {
      ignoreRef.current = true;
    };
  }, [selectedRegions]);

  const handleSearch = () => {
    if (searchTerm) {
      fetchCountry(searchTerm);
      setCountries([]);
      setSelectedRegions([]);
    }
  };

  const handleClose = () => {
    setSearchTerm("");
  };

  const handleRegionChange = (region: string, checked: boolean) => {
    if (checked) {
      setSelectedRegions((prev) => [...prev, region]);
    } else {
      setSelectedRegions((prev) => prev.filter((r) => r !== region));
    }
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
            <div className="relative">
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
        {loading ? (
          <div className="flex flex-col gap-2 items-center justify-center flex-1">
            <span className="animate-spin">
              <Loader2 />
            </span>
            <p>Loading...</p>
          </div>
        ) : country && !countries.length ? (
          <>
            {error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <div className="flex items-center justify-between">
                  <AlertTitle>Error</AlertTitle>
                  <X
                    className="size-4 text-muted-foreground"
                    onClick={() => setError("")}
                  />
                </div>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
            <CountryDetails country={country} fetchCountry={fetchCountry} />
          </>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {countries.map((country: Country, index) => (
              <CountryCard
                key={index}
                country={country}
                fetchCountry={fetchCountry}
                setCountries={setCountries}
                setSelectedRegions={setSelectedRegions}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
