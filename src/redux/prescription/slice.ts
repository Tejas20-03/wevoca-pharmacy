import { createSlice } from '@reduxjs/toolkit';

export const mapInitialState: PrescriptionSliceType = {
  prescriptionObj: { lastModified: 0, lastModifiedDate: '', name: '', size: 0, type: '', webkitRelativePath: '' },
};

const PrescriptionSlice = createSlice({
  name: 'map',
  initialState: mapInitialState,
  reducers: {
    updatePrescriptionOject: (state, action) => {
      state.prescriptionObj = action.payload
    },
    clearPrescription: (state) => {
      state.prescriptionObj = { lastModified: 0, lastModifiedDate: '', name: '', size: 0, type: '', webkitRelativePath: '' }
    },
}
});

export default PrescriptionSlice;
export const { updatePrescriptionOject, clearPrescription } = PrescriptionSlice.actions;
export type PrescriptionSliceType = {
  prescriptionObj: {
    lastModified: number;
    lastModifiedDate: string;
    name: string;
    size: number;
    type: string;
    webkitRelativePath: string;
  };
};
