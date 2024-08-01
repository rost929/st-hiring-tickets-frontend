import * as Yup from 'yup';

export const validationSchema = Yup.object({
  clientId: Yup.number().required('Client ID is required'),
  deliveryMethods: Yup.array().of(
    Yup.object({
      name: Yup.string().required('Name is required'),
      enum: Yup.string().required('Enum is required'),
      order: Yup.number().required('Order is required'),
      isDefault: Yup.boolean().required('Default status is required'),
      selected: Yup.boolean().required('Selected status is required'),
    })
  ),
  fulfillmentFormat: Yup.object({
    rfid: Yup.boolean().required('RFID is required'),
    print: Yup.boolean().required('Print is required'),
  }),
  printer: Yup.object({
    id: Yup.number().nullable(),
  }),
  printingFormat: Yup.object({
    formatA: Yup.boolean().required('Format A is required'),
    formatB: Yup.boolean().required('Format B is required'),
  }),
  scanning: Yup.object({
    scanManually: Yup.boolean().required('Scan manually is required'),
    scanWhenComplete: Yup.boolean().required('Scan when complete is required'),
  }),
  paymentMethods: Yup.object({
    cash: Yup.boolean().required('Cash is required'),
    creditCard: Yup.boolean().required('Credit card is required'),
    comp: Yup.boolean().required('Comp is required'),
  }),
  ticketDisplay: Yup.object({
    leftInAllotment: Yup.boolean().required('Left in allotment is required'),
    soldOut: Yup.boolean().required('Sold out is required'),
  }),
  customerInfo: Yup.object({
    active: Yup.boolean().required('Active is required'),
    basicInfo: Yup.boolean().required('Basic info is required'),
    addressInfo: Yup.boolean().required('Address info is required'),
  }),
});
