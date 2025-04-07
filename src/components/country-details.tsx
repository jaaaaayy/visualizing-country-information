import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";

type Country = {
  name: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  area: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  borders: string[];
  timezones: string[];
  currency: string;
  languages: string[];
  flag: string;
};

function CountryDetails({ country }: { country: Country | null }) {
  return <div></div>;
}

export default CountryDetails;
