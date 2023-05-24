import { render, screen } from '@testing-library/react';
import {App} from './App';

describe('Pokemon Arena', () => {
  it('should display Pickachu with full HP when battle is not started', () => {
    render(<App />);


    expect(screen.getByTestId('attacker')).toHaveTextContent('PV: 100 / 100');
  })

  it('should display Salamèche with full HP when battle is not started', () => {
    render(<App />);

    expect(screen.getByTestId('defender')).toHaveTextContent('PV: 100 / 100');
  })
})

