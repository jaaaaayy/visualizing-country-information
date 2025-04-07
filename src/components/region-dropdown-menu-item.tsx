import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Checkbox } from "./ui/checkbox";

function RegionDropdownMenuItem({
  checked,
  onCheckedChange,
  label,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <label>{label}</label>
    </DropdownMenuItem>
  );
}

export default RegionDropdownMenuItem;
