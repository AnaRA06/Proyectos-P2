import * as React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import Home from '../home';
import { getMusicData } from '../api-client';

jest.mock('../api-client', () => ({
  getMusicData: jest.fn(),
}));

describe('Home (Home Screen)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe ejecutar getMusicData al cargar la pantalla', async () => {
    (getMusicData as jest.Mock).mockResolvedValue([]);

    render(<Home />);

    await waitFor(() => {
      expect(getMusicData).toHaveBeenCalledTimes(1);
    });
  });

  test('debe obtener los artistas correctamente', async () => {
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

    (getMusicData as jest.Mock).mockResolvedValue(artistsMock);

    render(<Home />);

    await waitFor(() => {
      expect(getMusicData).toHaveBeenCalled();
    });
  });

  test('debe manejar una respuesta vacía', async () => {
    (getMusicData as jest.Mock).mockResolvedValue([]);

    render(<Home />);

    await waitFor(() => {
      expect(getMusicData).toHaveBeenCalledTimes(1);
    });
  });
});