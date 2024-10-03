import { createContext , useContext } from "react";

export const ThemeContext = createContext({
    DarkTheme : true ,
    changeTheme : () => {}
})

export const ThemeProvider = ThemeContext.Provider;

export default function ThemeFunction (){
    return  useContext(ThemeContext);
}