import { Department } from "./department";
import { Plant } from "./plant"

export class Location {
    locationId: any;
    LocationName: any;
    BuildingNumber: any;
    departments!: Department[];
    plants!: Plant[];

}
