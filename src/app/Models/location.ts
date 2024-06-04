import { Department } from "./department";
import { Plant } from "./plant"

export class Location {
    locationId: any;
    locationName: any;
    departments!: Department[];
    plants!: Plant[];

}
