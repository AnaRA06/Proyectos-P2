import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View, Alert } from "react-native";

export default function Register() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onChangeEmail = (value: string) => {
        setEmail(value);
    }
    const onChangeName = (value: string) => {
        setName(value);
    }
    const onChangePassword = (value: string) => {
        setPassword(value);
    }
    const onChangeConfirmPassword = (value: string) => {
        setConfirmPassword(value);
    }

    const onPressRegister = () => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexUsername = /^(?=.{3,50}$)[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)+$/;
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

        if (!email.trim() && !name.trim() && !password.trim() && !confirmPassword.trim()) {
            Alert.alert("Campos vacíos", "Por favor complete todos los campos");
            return;
        }

        if (!email.trim()) {
            Alert.alert("Campo vacío", "Por favor ingrese un correo");
            return;
        }

        if (!regexEmail.test(email.trim())) {
            Alert.alert("Correo inválido", "Por favor ingrese un correo válido");
            return;
        }

        if (!name.trim()) {
            Alert.alert("Campo vacío", "Por favor ingrese un nombre de usuario");
            return;
        }

        if (!regexUsername.test(name.trim())) {
            Alert.alert("Nombre inválido", "Ingrese nombre y apellido usando letras y espacios, con una longitud de 3 a 50 caracteres");
            return;
        }

        if (!password.trim()) {
            Alert.alert("Campo vacío", "Por favor ingrese una contraseña");
            return;
        }

        if (!regexPassword.test(password)) {
            Alert.alert("Contraseña inválida", "La contraseña debe contener:\n-Al menos 8 caracteres\n-Letras mayúsculas y minúsculas\n-Un caracter especial");
            return;
        }

        if (!confirmPassword.trim()) {
            Alert.alert("Campo vacío", "Por favor confirme su contraseña");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Contraseñas incorrectas", "Por favor asegúrese de que las contraseñas coincidan");
            return;
        }

        setEmail("");
        setName("");
        setPassword("");
        setConfirmPassword("");

        router.replace("/");
    }

    const onPressBack = () => {
        router.push({
            pathname: "/",
        });
    }

    return [
        <View style={styles.container}>
            <Button
                title="Atrás"
                onPress={onPressBack}
            />
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={onChangeName}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo"
                value={email}
                onChangeText={onChangeEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={onChangePassword}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChangeText={onChangeConfirmPassword}
                secureTextEntry={true}
            />
            <Button
                title="Registrarse"
                onPress={onPressRegister}
                color="green"
            />

        </View>
    ];
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10
    }
});