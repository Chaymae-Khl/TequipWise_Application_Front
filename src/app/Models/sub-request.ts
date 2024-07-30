export class SubRequest {
    subEquipmentRequestId?:       number;
    subRequestDate?:              Date;
    comment?:                     string;
    pu?:                          number;
    totale?:                      number;
    deptManagId?:                 string;
    itId?:                        string;
    controllerid?:                string;
    gl?: string;
    cc?: string;
    order?: string;
    subRequestStatus?:            boolean;
    qtEquipment?:                 number;
    departmangconfirmedAt?:       Date;
    departmangconfirmStatus?:     boolean;
    departmang_Not_confirmCause?: string;
    financeconfirmedAt?:          Date;
    financeconfirmSatuts?:        boolean;
    finance_Not_confirmCause?:    string;
    iTconfirmedAt?:               Date;
    iTconfirmSatuts?:             boolean;
    iT_Not_confirmCause?:         string;
    requestId?:                   number;
    equipmentId?:                 number;
    poNum?: string;
    prNum?: string;
    pR_Status?: boolean;
    pR_Not_ConfirmCause?: string;
}


