import { useRouter } from 'expo-router';
import { useState } from "react";
import { View, StyleSheet, Button, TextInput, Image, Alert } from "react-native";

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = () => {
    router.push({
      pathname: "/register",
    });
  }

  const onChangeEmail = (value: string) => {
    setEmail(value);
  }

  const onChangePassword = (value: string) => {
    setPassword(value);
  }

  const onPressButton = () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (!email.trim() && !password.trim()) {
      Alert.alert("Campos vacíos", "Por favor ingrese un correo y una contraseña");
      return;
    }
      
    if (!email.trim()) {
      Alert.alert("Campo vacío", "Por favor ingrese un correo");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Campo vacío", "Por favor ingrese una contraseña");
      return;
    }

    if (!regexPassword.test(password)) {
      Alert.alert("La contraseña debe contener:\n-Al menos 8 caracteres\n-Letras mayúsculas y minúsculas\n-Un caracter especial");
      return;
    }

    if (!regexEmail.test(email)) {
      Alert.alert("Correo inválido", "Por favor ingrese un correo válido");
     return;
    }

    setEmail("");
    setPassword("");
    router.replace("/home");
  }

  return (
    <View style={styles.container}>
        <Image
            testID="welcome-image"
            source={require('./welcome.avif')}
            style={styles.image}
        />
        <Button 
            title="Registro"
            onPress={onRegister}
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
        <Button
            onPress={onPressButton}
            title="Iniciar sesión"
            color="green"
        />
    </View>
  );
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
  },
  image: {
    marginBottom: 30,
    width: 200, 
    height: 150
  }
});

/* Practica 1
import { useState } from "react";
import { Button, StyleSheet, Switch, Text, View, TextInput, Alert } from "react-native";

export default function Index() {

  const [text, setText] = useState("");

  const [switchValue, setSwitchValue] = useState(false);

  const onPressLearnMore = () => {
    Alert.alert(text, "Es lo que escribí");
  }

  const onChangeText = (value: string) => {
    setText(value); 
  }

  const onChangeSwitch = (value: boolean) => {
    console.warn("Switch value changed to:", value);
    setSwitchValue(value);
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Escribe aqui"
        value={text}
        onChangeText={onChangeText}
      />
      <Switch
        value={switchValue}
        onValueChange={onChangeSwitch}
      />
      <Button
        onPress={onPressLearnMore}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
});
*/