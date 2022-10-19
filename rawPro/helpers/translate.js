import i18n from "i18n-js";
import FR from '../translate/FR';
import AR from '../translate/AR';
import EN from '../translate/EN';

export const initTranslate = () => {
    i18n.translations = {
        fr: FR,
        en: EN,
        ar: AR
    };
    i18n.fallbacks = true
    i18n.locale = "fr"
}