import React, {createContext, useContext} from "react";
import type {FC} from "react";

export type ToggleContextType = {
    toggle: ()=>void,
    fontNameToggle : ()=>void,
    isFontToggle: boolean,
    fontFamily:string
};
const defaultContext = {
    toggle: ()=>{},
    fontNameToggle: () => {},
    isFontToggle: false,
    fontFamily: "NanumGothic",
};
const ToggleContext = createContext<ToggleContextType>(defaultContext);
type ToggleContextProperties = {
    toggle: ()=>void,
    fontNameToggle: ()=>void,
    isFontToggle: boolean,
    fontFamily: string,

};
export const ToggleThemeProvider: FC<ToggleContextProperties> =
({children, toggle, fontNameToggle, isFontToggle, fontFamily}) => {
    fontFamily = isFontToggle? "NanumMyeongjo":"NanumGothic";

    const value = {toggle,fontNameToggle,isFontToggle, fontFamily};
    return <ToggleContext.Provider value = {value}>{children}</ToggleContext.Provider>;
}
export const useToggleThemeContext = () => {
    return useContext(ToggleContext);
}