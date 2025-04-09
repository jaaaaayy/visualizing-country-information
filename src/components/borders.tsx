import { Country } from "@/types";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";

const Borders = ({
  country,
  fetchCountry,
}: {
  country: Country | null;
  fetchCountry(country: string): Promise<void>;
}) => {
  return (
    <>
      {country?.borders.length ? (
        <div className="space-y-2">
          <Label>Borders</Label>
          <div className="flex flex-wrap gap-2">
            {country.borders.map((border) => (
              <Badge
                key={border}
                variant={"outline"}
                onClick={() => fetchCountry(border)}
                className="cursor-pointer"
              >
                {border}
              </Badge>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Borders;
