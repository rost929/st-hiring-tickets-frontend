import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Settings } from "../../schemas/SettingsSchema";
import { initialValues } from "../../utils/InitialValuesSettings";
interface SettingsState {
  settings: Settings;
}

const initialState: SettingsState = {
  settings: initialValues,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<any>) => {
      state.settings = action.payload;
    },
  },
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
