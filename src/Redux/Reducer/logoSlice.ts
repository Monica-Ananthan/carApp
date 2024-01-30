import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Logo {
    id: number;
    model: string;
    location: string;
    color: string;
    owner: string;
    manufactureYear: string;
    transmission: string;
    insuranceValidity: string;
    externalFitments: string;
    kms: string;
    photo: string;
}

interface LogoState {
    formData: Logo[];
    filteredData: Logo[];
}

const initialState: LogoState = {
    formData: [],
    filteredData: [],
};

export const logoSlice = createSlice({
    name: 'logo',
    initialState,
    reducers: {
        addLogo: (state, action: PayloadAction<Logo>) => {
            state.formData.push(action.payload);
        },
        setFilteredData: (state, action: PayloadAction<Logo[]>) => {
            state.filteredData = action.payload;
        },
        filterData: (state, action: PayloadAction<string>) => {
            const filterCondition = action.payload.toLowerCase();
            state.filteredData = state.formData.filter((logo) => {
                return logo.model.toLowerCase().includes(filterCondition);
            });
        },
    },
});

export const { addLogo, setFilteredData, filterData } = logoSlice.actions;

export const selectFormData = (state: RootState) => state.logo.formData;
export const selectFilteredData = (state: RootState) => state.logo.filteredData;

export default logoSlice.reducer;
