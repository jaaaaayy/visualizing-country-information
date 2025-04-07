import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";

function CountryDetails({ country }: { country: Country | null }) {
  return (
    <Card>
      <CardContent className="grid lg:grid-cols-2 gap-6">
        <div>
          <img
            src={country?.flag}
            alt={country?.name}
            width={400}
            className="mb-6 rounded-md"
          />
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Name</Label>
              <p className="text-muted-foreground">{country?.name}</p>
            </div>
            <div className="space-y-2">
              <Label>Capital</Label>
              <p className="text-muted-foreground">{country?.capital}</p>
            </div>
            <div className="space-y-2">
              <Label>Region</Label>
              <p className="text-muted-foreground">{country?.region}</p>
            </div>
            <div className="space-y-2">
              <Label>Subregion</Label>
              <p className="text-muted-foreground">{country?.subregion}</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-2">
            <div className="space-y-2">
              <Label>Population</Label>
              <p className="text-muted-foreground">{country?.population}</p>
            </div>
            <div className="space-y-2">
              <Label>Area</Label>
              <p className="text-muted-foreground">{country?.area}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Coordinates</Label>
            <p className="text-muted-foreground">
              Latitude: {country?.coordinates.latitude} / Longitude:{" "}
              {country?.coordinates.longitude}
            </p>
          </div>
          <div className="space-y-2">
            <Label>Borders</Label>
            <div className="flex flex-wrap gap-2">
              {country?.borders.map((border) => (
                <Badge variant={"outline"}>{border}</Badge>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="space-y-2">
              <Label>Timezones</Label>
              <p className="text-muted-foreground">{country?.timezones}</p>
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <p className="text-muted-foreground">{country?.currency}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Languages</Label>
            <div className="flex flex-wrap gap-2">
              {country?.borders.map((border) => (
                <Badge variant={"secondary"}>{border}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CountryDetails;
