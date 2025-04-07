import { Country } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import CountryDetails from "./country-details";
import { ScrollArea } from "./ui/scroll-area";

function Countries({ country }: { country: Country }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card>
          <CardHeader>
            <CardTitle>{country.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={country.flag} alt={country.name} className="border" />
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="md:max-w-xl lg:max-w-2xl max-h-[calc(100vh-2rem)]">
        <DialogHeader>
          <DialogTitle>Country Details</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ScrollArea className="md:max-w-xl lg:max-w-2xl max-h-[calc(100vh-2rem)]">
          <CountryDetails country={country} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default Countries;
