export interface IShoppingSummaryInfoModel {
    taxes: string;
    priceWithoutTaxes: string;
    priceWithTaxes: string;
    shippingInfo: {
        label: string;
        value: string;
    };
    paymentInfo: {
        label: string;
        value: string;
    };
}
