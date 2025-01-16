import { Filter } from "./filter";

export interface Subfilter {
    id: number;
    description: string;
    filter: Filter;
    checked: boolean;
}
