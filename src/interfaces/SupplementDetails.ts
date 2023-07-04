export interface SupplementDetailsMap {
    [nutrient: string]: SupplementDetails;
}

export interface SupplementDetails {
    Nutrient:        string;
    AltName:         string;
    Category:        string;
    PrimaryUse:      string;
    SecondaryUse:    string;
    Description:     string;
    UOM:             string;
    RDA:             string;
    "Food 1":        string;
    "Food 1 Amount": string;
    "Food 2":        string;
    "Food 2 Amount": string;
    "Food 3":        string;
    "Food 3 Amount": string;
    "Food 4":        string;
    "Food 4 Amount": string;
    "Food 5":        string;
    "Food 5 Amount": string;
    url:             string;
}
