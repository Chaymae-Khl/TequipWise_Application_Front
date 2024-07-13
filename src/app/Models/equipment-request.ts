import { SubRequest } from "./sub-request";

export class EquipmentRequest {
 
    equipmentRequestId?:  number;
    requestDate?:         Date;
    comment?:             string;
    totalPrice?:          number;
    requestStatus?:       boolean;
    isNewhire?:           boolean;
    newHireName?:         string;
    gl?:                  string;
    cc?:                  string;
    order?:               string;
    supplierOffer?:       string;
    poNum?:               string;
    prNum?:               string;
    pR_Status?:           boolean;
    pR_Not_ConfirmCause?: string;
    userId?:              string;
    nmaeOfUser?:          string;
    equipmentSubRequests: SubRequest[]= [];



}




