export class EquipmentRequest {
    userEquipmentRequestId!:      number;
    userId!:                      string;
    equipmentId:                 any;
    requestDate!:                 Date;
    comment!:                     string;
    requestStatus!:               boolean;
    isNewhire!:                   boolean;
    numberEquipment!:             number;
    departmangconfirmedAt!:       Date;
    departmangconfirmStatus!:     boolean;
    departmang_Not_confirmCause!: string;
    financeconfirmedAt!:          Date;
    financeconfirmSatuts!:        boolean;
    finance_Not_confirmCause!:    string;
    gl!:                          string;
    cc!:                          string;
    order!:                       string;
    iTconfirmedAt!:               Date;
    iTconfirmSatuts!:             boolean;
    iT_Not_confirmCause!:         string;
    supplierOffer!:               string;
    poNum!:                       string;
    prNum!:                       string;
}




