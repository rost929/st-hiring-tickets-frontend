export const initialValues = {
  clientId: 1,
  deliveryMethods: [
    {
      name: "",
      enum: "",
      order: 1,
      isDefault: false,
      selected: false,
    },
  ],
  fulfillmentFormat: {
    rfid: false,
    print: false,
  },
  printer: {
    id: null,
  },
  printingFormat: {
    formatA: false,
    formatB: false,
  },
  scanning: {
    scanManually: false,
    scanWhenComplete: false,
  },
  paymentMethods: {
    cash: false,
    creditCard: false,
    comp: false,
  },
  ticketDisplay: {
    leftInAllotment: false,
    soldOut: false,
  },
  customerInfo: {
    active: false,
    basicInfo: false,
    addressInfo: false,
  },
};
