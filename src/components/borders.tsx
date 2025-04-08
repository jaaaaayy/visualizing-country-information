import { Country } from "@/types";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";

const Borders = ({ country }: { country: Country | null }) => {
  return (
    <div className="space-y-2">
      <Label>Borders</Label>
      <div className="flex flex-wrap gap-2">
        {country?.borders?.map((border) => (
          <Badge key={border} variant={"outline"}>
            {border}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default Borders;
