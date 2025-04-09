import { Country } from "@/types";
import Borders from "./borders";
import Flag from "./flag";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";

const CountryDetails = ({
  country,
  fetchCountry,
}: {
  country: Country | null;
  fetchCountry(country: string): Promise<void>;
}) => {
  return (
    <Card>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div>
          <Flag country={country} />
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
          <div className="grid grid-cols-2 gap-6">
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
              Latitude: {country?.coordinates?.latitude} / Longitude:{" "}
              {country?.coordinates?.longitude}
            </p>
          </div>
          <Borders country={country} fetchCountry={fetchCountry} />
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
              {country?.languages?.map((language) => (
                <Badge key={language} variant={"secondary"}>
                  {language}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountryDetails;
