import { Country } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CountryCard({ country }: { country: Country }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{country.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={country.flag} alt={country.name} className="border" />
      </CardContent>
    </Card>
  );
}

export default CountryCard;
