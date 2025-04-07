export type ErrorResponse = {
  message: string;
  details: string;
};

export type Country = {
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
