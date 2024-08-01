import React, { useState } from "react";
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
  Typography,
} from "@mui/material";
import { validationSchema } from "../utils/ValidationSchema";
import { useDispatch } from "react-redux";
import { setSettings } from "../features/settings/SettingsSlice";
import {
  useGetSettingsQuery,
  usePutSettingsMutation,
} from "../features/settings/SettingsApi";
import { Settings } from "../schemas/SettingsSchema";
import { initialValues } from "../utils/InitialValuesSettings";

const SettingsForm: React.FC = () => {
  const [clientId, setClientId] = useState<number | undefined>(undefined);
  const { data: settingsData, refetch } = useGetSettingsQuery(clientId as number, {
    skip: clientId === undefined,
  });
  const [putSettings] = usePutSettingsMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (values: Settings) => {
    try {
      await putSettings(values).unwrap();
      dispatch(setSettings(values));
      alert("Settings updated successfully");
    } catch (err) {
      console.error("Failed to save settings:", err);
      alert("Failed to update settings");
    }
  };

  const handleQuery = async () => {
    if (clientId !== undefined) {
      refetch();
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Formik
        initialValues={settingsData || initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
          <Form>
            <Grid container spacing={2} sx={{ backgroundColor: "darkgray" }}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Client ID
                </Typography>
                <TextField
                  fullWidth
                  name="clientId"
                  label="Client ID"
                  value={values.clientId}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFieldValue('clientId', value);
                    setClientId(Number(value) || undefined);
                  }}
                  onBlur={handleBlur}
                  error={touched.clientId && Boolean(errors.clientId)}
                  helperText={touched.clientId && errors.clientId}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleQuery}
                  sx={{ margin: 2 }}
                >
                  Query Client Info
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Delivery Methods
                </Typography>
                <FieldArray name="deliveryMethods">
                  {({ remove, push }) => (
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
                                sx={{ m: 1, backgroundColor : '#ffbcbc' }}
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
                        sx={{ m: 1, backgroundColor : '#bcdeff' }}
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
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Fulfillment Format
                </Typography>
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
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Printer
                </Typography>
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

              {/* Printing Format */}
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Printing Format
                </Typography>
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

              {/* Scanning */}
              <Grid item xs={12}>
              <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Scanning
                </Typography>
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
              <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Payment Methods
                </Typography>
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
              <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Ticket Display
                </Typography>
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
              <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Customer Info
                </Typography>
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
                <Button sx={{ m: 2}} color="primary" variant="contained" type="submit">
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
