import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import appConfig from '@/configs/app.config';
import i18n from 'i18next';
import { dateLocales } from '@/locales';
import dayjs from 'dayjs';

export interface LocaleState {
    currentLang: string;
}

const initialState: LocaleState = {
    currentLang: appConfig.locale,
};

export const setLangAsync = createAsyncThunk(
    'locale/setLang',
    async (lang: string) => {
        const formattedLang = lang.replace(/-([a-z])/g, (_, g) => g.toUpperCase());
        await i18n.changeLanguage(formattedLang);
        await dateLocales[formattedLang]();
        dayjs.locale(formattedLang);
        return lang;
    },
);

const localeSlice = createSlice({
    name: 'locale',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setLangAsync.fulfilled, (state, action) => {
            state.currentLang = action.payload;
        });
    },
});

export default localeSlice.reducer;