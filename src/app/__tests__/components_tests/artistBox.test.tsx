import * as React from 'react';
import { render } from '@testing-library/react-native';
import ArtistBox from '../../components/ArtistBox';

describe('ArtistBox (Component)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const artistMock = {
        id: 1,
        name: 'Taylor Swift',
        image: 'https://example.com/taylor.jpg',
    };

    test('debe mostrar el nombre del artista', () => {
        const { getByText } = render(
        <ArtistBox artist={artistMock} />
        );

        expect(getByText('Taylor Swift')).toBeTruthy();
    });

    test('debe mostrar la imagen del artista', () => {
        const { getByTestId } = render(
        <ArtistBox artist={artistMock} />
        );

        expect(getByTestId('artist-image')).toBeTruthy();
    });

    test('debe mostrar la imagen con la URL correspondiente', () => {
        const { getByTestId } = render(
        <ArtistBox artist={artistMock} />
        );

        const image = getByTestId('artist-image');

        expect(image.props.source).toEqual({
        uri: 'https://example.com/taylor.jpg',
        });
    });
});