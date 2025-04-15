import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Checkbox } from "./ui/checkbox";

const RegionDropdownMenuItem = ({
  checked,
  onCheckedChange,
  label,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}) => {
  return (
    <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <label>{label}</label>
    </DropdownMenuItem>
  );
};

export default RegionDropdownMenuItem;
