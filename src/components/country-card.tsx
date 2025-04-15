import { Country } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Dispatch, SetStateAction } from "react";

const CountryCard = ({
  country,
  fetchCountry,
  setCountries,
  setSelectedRegions,
}: {
  country: Country;
  fetchCountry: (country: string) => Promise<void>;
  setCountries: Dispatch<SetStateAction<Country[]>>;
  setSelectedRegions: Dispatch<SetStateAction<string[]>>;
}) => {
  return (
    <Card
      onClick={() => {
        fetchCountry(country.name);
        setCountries([]);
        setSelectedRegions([]);
      }}
      className="hover:bg-muted transition-colors cursor-pointer"
    >
      <CardHeader>
        <CardTitle className="text-lg">{country.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={country.flag} alt={country.name} className="border" />
      </CardContent>
    </Card>
  );
};

export default CountryCard;
