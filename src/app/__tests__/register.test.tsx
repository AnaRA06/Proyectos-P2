import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Register from '../register';

jest.spyOn(Alert, 'alert');

const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
}));

describe('Register (Register Screen)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe mostrar los elementos de la pantalla', () => {
        const { getByText, getByPlaceholderText } = render(<Register />);

        expect(getByText('Atrás')).toBeTruthy();
        expect(getByPlaceholderText('Nombre')).toBeTruthy();
        expect(getByPlaceholderText('Correo')).toBeTruthy();
        expect(getByPlaceholderText('Contraseña')).toBeTruthy();
        expect(getByPlaceholderText('Confirmar Contraseña')).toBeTruthy();
        expect(getByText('Registrarse')).toBeTruthy();
    });

    test('debe regresar al Index al presionar Atrás', () => {
        const { getByText } = render(<Register />);

        fireEvent.press(getByText('Atrás'));

        expect(mockPush).toHaveBeenCalledWith({
        pathname: '/',
        });
    });

    test('debe mostrar alerta cuando todos los campos están vacíos', () => {
        const { getByText } = render(<Register />);

        fireEvent.press(getByText('Registrarse'));

        expect(Alert.alert).toHaveBeenCalledWith(
        'Campos vacíos',
        'Por favor complete todos los campos'
        );
    });

    test('debe mostrar alerta cuando falta el correo', () => {
        const { getByPlaceholderText, getByText } = render(<Register />);

        fireEvent.changeText(
        getByPlaceholderText('Nombre'), 
        'Ana Ramos'
        );

        fireEvent.press(getByText('Registrarse'));

        expect(Alert.alert).toHaveBeenCalledWith(
        'Campo vacío',
        'Por favor ingrese un correo'
        );
    });

    test('debe mostrar alerta cuando el correo es inválido', () => {
        const { getByPlaceholderText, getByText } = render(<Register />);

        fireEvent.changeText(
        getByPlaceholderText('Correo'),
        'ana@gmail'
        );

        fireEvent.changeText(
        getByPlaceholderText('Nombre'),
        'Ana Ramos'
        );

        fireEvent.press(getByText('Registrarse'));

        expect(Alert.alert).toHaveBeenCalledWith(
        'Correo inválido',
        'Por favor ingrese un correo válido'
        );
    });

    test('debe mostrar alerta cuando falta el nombre', () => {
        const { getByPlaceholderText, getByText } = render(<Register />);

        fireEvent.changeText(
        getByPlaceholderText('Correo'),
        'ana@gmail.com'
        );

        fireEvent.press(getByText('Registrarse'));

        expect(Alert.alert).toHaveBeenCalledWith(
        'Campo vacío',
        'Por favor ingrese un nombre de usuario'
        );
    });

    test('debe mostrar alerta cuando el nombre es inválido', () => {
        const { getByPlaceholderText, getByText } = render(<Register />);

        fireEvent.changeText(
        getByPlaceholderText('Correo'),
        'ana@gmail.com'
        );

        fireEvent.changeText(
        getByPlaceholderText('Nombre'),
        'Ana123'
        );

        fireEvent.press(getByText('Registrarse'));

        expect(Alert.alert).toHaveBeenCalledWith(
        'Nombre inválido',
        'Ingrese nombre y apellido usando letras y espacios, con una longitud de 3 a 50 caracteres'
        );
    });

    test('debe mostrar alerta cuando falta la contraseña', () => {
        const { getByPlaceholderText, getByText } = render(<Register />);

        fireEvent.changeText(
        getByPlaceholderText('Correo'),
        'ana@gmail.com'
        );

        fireEvent.changeText(
        getByPlaceholderText('Nombre'),
        'Ana Ramos'
        );

        fireEvent.press(getByText('Registrarse'));

        expect(Alert.alert).toHaveBeenCalledWith(
        'Campo vacío',
        'Por favor ingrese una contraseña'
        );
    });

    test('debe mostrar alerta cuando la contraseña es inválida', () => {
        const { getByPlaceholderText, getByText } = render(<Register />);

        fireEvent.changeText(
        getByPlaceholderText('Correo'),
        'ana@gmail.com'
        );

        fireEvent.changeText(
        getByPlaceholderText('Nombre'),
        'Ana Ramos'
        );

        fireEvent.changeText(
        getByPlaceholderText('Contraseña'),
        'ana12345'
        );

        fireEvent.press(getByText('Registrarse'));

        expect(Alert.alert).toHaveBeenCalledWith(
        'Contraseña inválida',
        'La contraseña debe contener:\n-Al menos 8 caracteres\n-Letras mayúsculas y minúsculas\n-Un caracter especial'
        );
    });

    test('debe mostrar alerta cuando no se confirma la contraseña', () => {
        const { getByPlaceholderText, getByText } = render(<Register />);

        fireEvent.changeText(
        getByPlaceholderText('Correo'),
        'ana@gmail.com'
        );

        fireEvent.changeText(
        getByPlaceholderText('Nombre'),
        'Ana Ramos'
        );

        fireEvent.changeText(
        getByPlaceholderText('Contraseña'),
        'Ana1234#'
        );

        fireEvent.press(getByText('Registrarse'));

        expect(Alert.alert).toHaveBeenCalledWith(
        'Campo vacío',
        'Por favor confirme su contraseña'
        );
    });

    test('debe mostrar alerta cuando las contraseñas no coinciden', () => {
        const { getByPlaceholderText, getByText } = render(<Register />);

        fireEvent.changeText(
        getByPlaceholderText('Correo'),
        'ana@gmail.com'
        );

        fireEvent.changeText(
        getByPlaceholderText('Nombre'),
        'Ana Ramos'
        );

        fireEvent.changeText(
        getByPlaceholderText('Contraseña'),
        'Ana1234#'
        );

        fireEvent.changeText(
        getByPlaceholderText('Confirmar Contraseña'),
        'Ana12345#'
        );

        fireEvent.press(getByText('Registrarse'));

        expect(Alert.alert).toHaveBeenCalledWith(
        'Contraseñas incorrectas',
        'Por favor asegúrese de que las contraseñas coincidan'
        );
    });

    test('debe regresar al Index cuando el registro es exitoso', () => {
        const { getByPlaceholderText, getByText } = render(<Register />);

        fireEvent.changeText(
        getByPlaceholderText('Correo'),
        'ana@gmail.com'
        );

        fireEvent.changeText(
        getByPlaceholderText('Nombre'),
        'Ana Ramos'
        );

        fireEvent.changeText(
        getByPlaceholderText('Contraseña'),
        'Ana1234#'
        );

        fireEvent.changeText(
        getByPlaceholderText('Confirmar Contraseña'),
        'Ana1234#'
        );

        fireEvent.press(getByText('Registrarse'));

        expect(mockReplace).toHaveBeenCalledWith('/');
    });

    test('debe limpiar los campos después de que el registro es exitoso', () => {
        const { getByPlaceholderText, getByText } = render(<Register />);

        const nameInput = getByPlaceholderText('Nombre');
        const emailInput = getByPlaceholderText('Correo');
        const passwordInput = getByPlaceholderText('Contraseña');
        const confirmPasswordInput =
        getByPlaceholderText('Confirmar Contraseña');

        fireEvent.changeText(nameInput, 'Ana Ramos');
        fireEvent.changeText(emailInput, 'ana@gmail.com');
        fireEvent.changeText(passwordInput, 'Ana1234#');
        fireEvent.changeText(confirmPasswordInput, 'Ana1234#');

        fireEvent.press(getByText('Registrarse'));

        expect(nameInput.props.value).toBe('');
        expect(emailInput.props.value).toBe('');
        expect(passwordInput.props.value).toBe('');
        expect(confirmPasswordInput.props.value).toBe('');
    });
});