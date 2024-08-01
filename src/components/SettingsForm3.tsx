import { Formik, Form, FieldArray } from "formik";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Grid,
  FormControl,
  FormGroup,
} from "@mui/material";
import { validationSchema } from "../utils/ValidationSchema";
import { useDispatch } from "react-redux";
import { setSettings } from "../features/settings/SettingsSlice";
//import { useGetSettingsQuery } from "../features/settings/SettingsApi";
import { initialValues } from "../utils/InitialValuesSettings";

const SettingsForm = () => {
  const dispatch = useDispatch();
  //const [postSettings] = usePostSettingsMutation();

  const handleSubmit = async (values: any) => {
    try {
      //await postSettings(values).unwrap();
      dispatch(setSettings(values));
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="clientId"
                  label="Client ID"
                  value={values.clientId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.clientId && Boolean(errors.clientId)}
                  helperText={touched.clientId && errors.clientId}
                />
              </Grid>

              {/* Delivery Methods */}
              <Grid item xs={12}>
                <FieldArray name="deliveryMethods">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.deliveryMethods.length > 0 &&
                        values.deliveryMethods.map((_, index) => (
                          <Grid container spacing={2} key={index}>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                fullWidth
                                name={`deliveryMethods.${index}.name`}
                                label="Name"
                                value={values.deliveryMethods[index].name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                  touched.deliveryMethods &&
                                  touched.deliveryMethods[index] &&
                                  Boolean(
                                    errors.deliveryMethods &&
                                      errors.deliveryMethods[index]
                                  )
                                }
                                helperText={
                                  touched.deliveryMethods &&
                                  touched.deliveryMethods[index] &&
                                  errors.deliveryMethods &&
                                  errors.deliveryMethods[index]?.name
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                fullWidth
                                name={`deliveryMethods.${index}.enum`}
                                label="Enum"
                                value={values.deliveryMethods[index].enum}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                  touched.deliveryMethods &&
                                  touched.deliveryMethods[index] &&
                                  Boolean(
                                    errors.deliveryMethods &&
                                      errors.deliveryMethods[index]
                                  )
                                }
                                helperText={
                                  touched.deliveryMethods &&
                                  touched.deliveryMethods[index] &&
                                  errors.deliveryMethods &&
                                  errors.deliveryMethods[index]?.enum
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <TextField
                                fullWidth
                                name={`deliveryMethods.${index}.order`}
                                label="Order"
                                type="number"
                                value={values.deliveryMethods[index].order}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                  touched.deliveryMethods &&
                                  touched.deliveryMethods[index] &&
                                  Boolean(
                                    errors.deliveryMethods &&
                                      errors.deliveryMethods[index]
                                  )
                                }
                                helperText={
                                  touched.deliveryMethods &&
                                  touched.deliveryMethods[index] &&
                                  errors.deliveryMethods &&
                                  errors.deliveryMethods[index]?.order
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      values.deliveryMethods[index].isDefault
                                    }
                                    onChange={handleChange}
                                    name={`deliveryMethods.${index}.isDefault`}
                                  />
                                }
                                label="Default"
                              />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      values.deliveryMethods[index].selected
                                    }
                                    onChange={handleChange}
                                    name={`deliveryMethods.${index}.selected`}
                                  />
                                }
                                label="Selected"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                type="button"
                                color="error"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </Button>
                            </Grid>
                          </Grid>
                        ))}
                      <Button
                        type="button"
                        onClick={() =>
                          push({
                            name: "",
                            enum: "",
                            order: 1,
                            isDefault: false,
                            selected: false,
                          })
                        }
                      >
                        Add Delivery Method
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </Grid>

              {/* Fulfillment Format */}
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.fulfillmentFormat.rfid}
                          onChange={handleChange}
                          name="fulfillmentFormat.rfid"
                        />
                      }
                      label="RFID"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.fulfillmentFormat.print}
                          onChange={handleChange}
                          name="fulfillmentFormat.print"
                        />
                      }
                      label="Print"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>

              {/* Printer */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="printer.id"
                  label="Printer ID"
                  type="number"
                  value={values.printer.id || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.printer && Boolean(errors.printer?.id)}
                  helperText={touched.printer && errors.printer?.id}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.printingFormat.formatA}
                          onChange={handleChange}
                          name="printingFormat.formatA"
                        />
                      }
                      label="Format A"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.printingFormat.formatB}
                          onChange={handleChange}
                          name="printingFormat.formatB"
                        />
                      }
                      label="Format B"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.scanning.scanManually}
                          onChange={handleChange}
                          name="scanning.scanManually"
                        />
                      }
                      label="Scan Manually"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.scanning.scanWhenComplete}
                          onChange={handleChange}
                          name="scanning.scanWhenComplete"
                        />
                      }
                      label="Scan When Complete"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>

              {/* Payment Methods */}
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.paymentMethods.cash}
                          onChange={handleChange}
                          name="paymentMethods.cash"
                        />
                      }
                      label="Cash"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.paymentMethods.creditCard}
                          onChange={handleChange}
                          name="paymentMethods.creditCard"
                        />
                      }
                      label="Credit Card"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.paymentMethods.comp}
                          onChange={handleChange}
                          name="paymentMethods.comp"
                        />
                      }
                      label="Comp"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>

              {/* Ticket Display */}
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.ticketDisplay.leftInAllotment}
                          onChange={handleChange}
                          name="ticketDisplay.leftInAllotment"
                        />
                      }
                      label="Left in Allotment"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.ticketDisplay.soldOut}
                          onChange={handleChange}
                          name="ticketDisplay.soldOut"
                        />
                      }
                      label="Sold Out"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>

              {/* Customer Info */}
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.customerInfo.active}
                          onChange={handleChange}
                          name="customerInfo.active"
                        />
                      }
                      label="Active"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.customerInfo.basicInfo}
                          onChange={handleChange}
                          name="customerInfo.basicInfo"
                        />
                      }
                      label="Basic Info"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.customerInfo.addressInfo}
                          onChange={handleChange}
                          name="customerInfo.addressInfo"
                        />
                      }
                      label="Address Info"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button color="primary" variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SettingsForm;
