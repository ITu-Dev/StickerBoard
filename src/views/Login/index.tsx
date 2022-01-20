import styles from "./Login.module.css";
import { Box, Button, TextField } from "@mui/material";
export const Login: React.FC = () => {
    const authForm = <Box component="form">
        <TextField label="e-mail"/>
        <TextField label="password" />
        <Button>Войти</Button>
    </Box>

    return <>{authForm}</>
}
