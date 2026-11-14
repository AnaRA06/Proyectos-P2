import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ArtistList from '../../components/ArtistList';

const mockPush = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('../../components/ArtistBox', () => {
  const { Text } = require('react-native');

  return {
    __esModule: true,
    default: ({ artist }: any) => (
      <Text>{artist.name}</Text>
    ),
  };
});

describe('ArtistList (Component)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const artistsMock = [
        {
        id: 1,
        name: 'Taylor Swift',
        image: 'https://example.com/taylor.jpg',
        },
        {
        id: 2,
        name: 'Thomas Rhett',
        image: 'https://example.com/thomas.jpg',
        },
    ];

    test('debe mostrar los artistas', () => {
        const { getByText } = render(
        <ArtistList artists={artistsMock} />
        );

        expect(getByText('Taylor Swift')).toBeTruthy();
        expect(getByText('Thomas Rhett')).toBeTruthy();
    });

    test('debe navegar a Detail al presionar un artista', () => {
        const { getByTestId } = render(
        <ArtistList artists={artistsMock} />
        );

        const artist = getByTestId('artist-box-Taylor Swift');

        fireEvent.press(artist);

        expect(mockPush).toHaveBeenCalledWith({
        pathname: '../detail',
        params: {
            id: 1,
            name: 'Taylor Swift',
            image: 'https://example.com/taylor.jpg',
        },
        });
    });

    test('no debe mostrar artistas cuando la lista está vacía', () => {
        const { queryByTestId } = render(
        <ArtistList artists={[]} />
        );

        expect(
        queryByTestId('artist-box-Taylor Swift')
        ).toBeNull();
    });
});