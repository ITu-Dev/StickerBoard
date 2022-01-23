import styles from "./Login.module.css";
import { Box, Button, TextField } from "@mui/material";
import { CSSProperties, useState } from "react";
export const Login: React.FC = () => {
    const [isRegistrationForm, setIsRegistrationForm] = useState(false)
    
    const textFieldCss: CSSProperties = {
        width: 315
    }
    const authForm = <>
        <span style={{fontSize: 24, color: "#6e625c"}}>Вход</span>
        <TextField style={textFieldCss} label="e-mail" color="warning" required/>
        <TextField style={textFieldCss} label="password" type="password" color="warning" required />
        <div style={{display: "flex", alignItems: "flex-end", gap: "10px"}}>
            <Button type="submit" variant="text" color="warning" size="medium" onClick={() => setIsRegistrationForm(true)}>Регистрация</Button>
            <Button type="submit" variant="contained" color="warning" size="large">Войти</Button>
        </div>
    </>

    const registrationForm =<>
        <span style={{fontSize: 24, color: "#6e625c"}}>Регистрация</span>
        <TextField style={textFieldCss} label="username" color="warning" required/>
        <TextField style={textFieldCss} label="e-mail" color="warning" required/>
        <TextField style={textFieldCss} label="password" type="password" color="warning" required />
        <div style={{display: "flex", alignItems: "flex-end", gap: "10px"}}>
            <Button type="submit" variant="text" color="warning" size="small" onClick={() => setIsRegistrationForm(false)}>Назад</Button>
            <Button type="submit" variant="contained" color="warning" size="medium">Зарегистрироваться</Button>
        </div>
    </>

    return <Box component="form"
                onSubmit={console.log}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 400,
                    height: 500,
                    background: "#FFFFFF",
                    borderRadius: 5,
                    opacity: 0.9,
                    alignSelf: "center",
                    justifySelf: "center",
                    gap: "30px",
                    gridColumn: "2/3",
                    boxShadow: "0px 0px 6px 0px rgba(0 0 0, 0.2)"
                }}>
        {
            isRegistrationForm
                ? registrationForm
                : authForm
        }
    </Box>
}
