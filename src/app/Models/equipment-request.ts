import { SubRequest } from "./sub-request";

export class EquipmentRequest {

    equipmentRequestId?: number;
    requestDate?: Date;
    comment?: string;
    totalPrice?: number;
    requestStatus?: boolean;
    forWho?: string;
    newHireName?: string;
    supplierOffer?: string;
    userId?: string;
    nmaeOfUser?: string;
    equipmentSubRequests: SubRequest[] = [];
    sapNumOfUser?: string;
    currency:any;                         


}




