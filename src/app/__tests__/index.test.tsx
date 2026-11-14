import { fireEvent, render } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Index from '../index';

// Mock Alert
jest.spyOn(Alert, 'alert');

const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
}));

describe('Index (Login Screen)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe mostrar los elementos de la pantalla', () => {
        const { getByPlaceholderText, getByText, getByTestId } = render(<Index />);

        expect(getByTestId('welcome-image')).toBeTruthy();
        expect(getByText('Registro')).toBeTruthy();
        expect(getByPlaceholderText('Correo')).toBeTruthy();
        expect(getByPlaceholderText('Contraseña')).toBeTruthy();
        expect(getByText('Iniciar sesión')).toBeTruthy();
    });

    test('debe navegar a Registro al presionar el botón Registro', () => {
        const { getByText } = render(<Index />);

        fireEvent.press(getByText('Registro'));

        expect(mockPush).toHaveBeenCalledWith({
        pathname: '/register',
        });
    });

    test('debe mostrar alerta cuando ambos campos están vacíos', () => {
        const { getByText } = render(<Index />);

        fireEvent.press(getByText('Iniciar sesión'));

        expect(Alert.alert).toHaveBeenCalledWith(
        'Campos vacíos',
        'Por favor ingrese un correo y una contraseña'
        );
    });

    test('debe mostrar alerta cuando falta el correo', () => {
        const { getByPlaceholderText, getByText } = render(<Index />);

        fireEvent.changeText(
        getByPlaceholderText('Contraseña'),
        'Ana1234#'
        );

        fireEvent.press(getByText('Iniciar sesión'));

        expect(Alert.alert).toHaveBeenCalledWith(
        'Campo vacío',
        'Por favor ingrese un correo'
        );
    });

    test('debe mostrar alerta cuando falta la contraseña', () => {
        const { getByPlaceholderText, getByText } = render(<Index />);

        fireEvent.changeText(
        getByPlaceholderText('Correo'),
        'ana@gmail.com'
        );

        fireEvent.press(getByText('Iniciar sesión'));

        expect(Alert.alert).toHaveBeenCalledWith(
        'Campo vacío',
        'Por favor ingrese una contraseña'
        );
    });

    test('debe mostrar alerta cuando la contraseña no cumple los requisitos', () => {
        const { getByPlaceholderText, getByText } = render(<Index />);

        fireEvent.changeText(
        getByPlaceholderText('Correo'),
        'ana@gmail.com'
        );

        fireEvent.changeText(
        getByPlaceholderText('Contraseña'),
        'a1234567'
        );

        fireEvent.press(getByText('Iniciar sesión'));

        expect(Alert.alert).toHaveBeenCalledWith(
        'La contraseña debe contener:\n-Al menos 8 caracteres\n-Letras mayúsculas y minúsculas\n-Un caracter especial'
        );
    });

    test('debe mostrar alerta cuando el correo es inválido', () => {
        const { getByPlaceholderText, getByText } = render(<Index />);

        fireEvent.changeText(
        getByPlaceholderText('Correo'),
        'ana@gmail'
        );

        fireEvent.changeText(
        getByPlaceholderText('Contraseña'),
        'Ana1234#'
        );

        fireEvent.press(getByText('Iniciar sesión'));

        expect(Alert.alert).toHaveBeenCalledWith(
        'Correo inválido',
        'Por favor ingrese un correo válido'
        );
    });

    test('debe navegar a Home cuando los datos son correctos', () => {
        const { getByPlaceholderText, getByText } = render(<Index />);

        fireEvent.changeText(
        getByPlaceholderText('Correo'),
        'ana@gmail.com'
        );

        fireEvent.changeText(
        getByPlaceholderText('Contraseña'),
        'Ana1234#'
        );

        fireEvent.press(getByText('Iniciar sesión'));

        expect(mockReplace).toHaveBeenCalledWith('/home');
    });

    test('debe limpiar los campos después de iniciar sesión correctamente', () => {
        const { getByPlaceholderText, getByText } = render(<Index />);

        const emailInput = getByPlaceholderText('Correo');
        const passwordInput = getByPlaceholderText('Contraseña');

        fireEvent.changeText(
        emailInput,
        'ana@gmail.com'
        );

        fireEvent.changeText(
        passwordInput,
        'Ana1234#'
        );

        fireEvent.press(getByText('Iniciar sesión'));

        expect(emailInput.props.value).toBe('');
        expect(passwordInput.props.value).toBe('');
    });
});

