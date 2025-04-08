import { Country } from "@/types";

const Flag = ({ country }: { country: Country | null }) => {
  return (
    <img
      src={country?.flag}
      alt={country?.name}
      width={400}
      className="mb-6 rounded-md"
    />
  );
};

export default Flag;
