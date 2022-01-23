import { Box, Button, TextField } from "@mui/material";
import { CSSProperties, useState } from "react";
import { AuthService } from "api/AuthService";

export const Login: React.FC = () => {
    const [isRegistrationForm, setIsRegistrationForm] = useState(false)
    const [authData, setAuthData] = useState<Partial<AuthService.AuthData>>()
    const [regData, setRegData] = useState<Partial<AuthService.RegistrationData>>();
    const textFieldCss: CSSProperties = {
        width: 315
    }

    const authHandler = () => {
        console.log("auth")
        if ( !authData || !authData.password || !authData.login) return;
        //@ts-ignore
        AuthService.auth(authData);
    }

    const registrationHandler = () => {
        if ( !regData || !regData.password || !regData.login || !regData.userName) return;
        //@ts-ignore
        AuthService.registration(regData);
    }

    const authForm = <>
        <span style={{fontSize: 24, color: "#6e625c"}}>Вход</span>
        <TextField style={textFieldCss}
                   label="e-mail"
                   color="warning"
                   required
                   value={authData?.login}
                   onChange={v => setAuthData({...authData, login: v.target.value})}/>
        <TextField style={textFieldCss}
                   label="password"
                   type="password"
                   color="warning"
                   required
                   value={authData?.password}
                   onChange={v => setAuthData({...authData, password: v.target.value})}
        />
        <div style={{display: "flex", alignItems: "flex-end", gap: "10px"}}>
            <Button variant="text" color="warning" size="medium" onClick={() => setIsRegistrationForm(true)}>Регистрация</Button>
            <Button variant="contained"
                color="warning"
                size="large"
                disabled={!authData?.password || !authData.login}
                onClick={() => authHandler()}
            >Войти</Button>
        </div>
    </>

    const registrationForm =<>
        <span style={{fontSize: 24, color: "#6e625c"}}>Регистрация</span>
        <TextField style={textFieldCss}
                   label="username"
                   color="warning"
                   required
                   value={regData?.userName}
                   onChange={v => setRegData({...regData, userName: v.target.value})}
        />
        <TextField style={textFieldCss}
                   label="e-mail"
                   color="warning"
                   required
                   value={regData?.login}
                   onChange={v => setRegData({...regData, login: v.target.value})}
        />
        <TextField style={textFieldCss}
                   label="password"
                   type="password"
                   color="warning"
                   required
                   value={regData?.password}
                   onChange={v => setRegData({...regData, password: v.target.value})}
        />
        <div style={{display: "flex", alignItems: "flex-end", gap: "10px"}}>
            <Button variant="text" color="warning" size="small" onClick={() => setIsRegistrationForm(false)}>Назад</Button>
            <Button variant="contained"
                    color="warning"
                    size="medium"
                    disabled={!regData?.password || !regData.login || !regData.userName}
                    onClick={() => registrationHandler()}
            >Зарегистрироваться</Button>
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
