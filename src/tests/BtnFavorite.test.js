import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

it('Testa botão de favorite', async () => {
  const { history } = renderWithRouterAndRedux(<App />);

  history.push('/meals/52977');
  await waitFor(() => {
    const corba = screen.getByRole(
      'heading',
      { level: 1, name: /Corba/ },
    );
    expect(corba).toBeInTheDocument();

    const favoriteBtn = screen.getByTestId(/favorite-btn/);
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);

    const favoriteRecipes1 = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes1).toHaveLength(1);
    expect(favoriteRecipes1[0].name).toBe('Corba');

    userEvent.click(favoriteBtn);

    const favoriteRecipes2 = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes2).toHaveLength(0);
  }, { timeout: 10000 });
});
