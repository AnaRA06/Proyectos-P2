import { render } from '@testing-library/react-native';
import Detail from '../detail';

const mockUseLocalSearchParams = jest.fn();

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => mockUseLocalSearchParams(),
}));

describe('Detail (Detail Screen)', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseLocalSearchParams.mockReturnValue({
      id: '1',
      name: 'Taylor Swift',
      image: 'https://example.com/taylor.jpg',
    });
  });

  test('debe mostrar el nombre del artista', () => {
    const { getByText } = render(<Detail />);

    expect(getByText('Taylor Swift')).toBeTruthy();
  });

  test('debe mostrar la imagen del artista', () => {
    const { getByTestId } = render(<Detail />);

    const image = getByTestId('artist-image');

    expect(image.props.source).toEqual({
        uri: 'https://example.com/taylor.jpg',
    });
  });
});