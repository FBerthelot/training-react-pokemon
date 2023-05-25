import { act, fireEvent, render, screen } from '@testing-library/react';
import {App} from './App';

describe('Pokemon Arena', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('when battle is not started', () => {
    it('should display Pickachu with full HP', () => {
      render(<App />);
  
  
      expect(screen.getByTestId('attacker')).toHaveTextContent('PV: 100 / 100');
    })
  
    it('should display Salamèche with full HP', () => {
      render(<App />);
  
      expect(screen.getByTestId('defender')).toHaveTextContent('PV: 100 / 100');
    })
  })

  describe('when 1s of the fight ellapsed', () => {
    it('should make salamèche lose 10 pv', () => {
      render(<App />);

      fireEvent.click(screen.getByRole('button'))
      act(() => {
        jest.advanceTimersByTime(1000);
      })
  
      expect(screen.getByTestId('defender')).toHaveTextContent('PV: 90 / 100');
    })

    it('should make pikachu still get 100 pv', () => {
      render(<App />);
  
      fireEvent.click(screen.getByRole('button'))
      act(() => {
        jest.advanceTimersByTime(1000);
      })
  
      expect(screen.getByTestId('attacker')).toHaveTextContent('PV: 100 / 100');
    })

    it('should display salamèche loosed some HP', () => {
      render(<App />);
  
      fireEvent.click(screen.getByRole('button'))
      act(() => {
        jest.advanceTimersByTime(1000);
      })
  
      expect(screen.getByTestId('logs')).toHaveTextContent('pikachu attack and salamèche loosed 10HP');
    })
  })

  describe('when 10s of the fight ellapsed', () => {
    it('should make salamèche lose half of the pv', () => {
      render(<App />);
  
      fireEvent.click(screen.getByRole('button'))
      act(() => {
        jest.advanceTimersByTime(10000);
      })
  
      expect(screen.getByTestId('defender')).toHaveTextContent('PV: 50 / 100');
    })

    it('should make pikachu also have half of his PV', () => {
      render(<App />);
  
      fireEvent.click(screen.getByRole('button'))
      act(() => {
        jest.advanceTimersByTime(10000);
      })
  
      expect(screen.getByTestId('attacker')).toHaveTextContent('PV: 50 / 100');
    })
  })

  describe('when 20s of the fight ellapsed', () => {
    it('should make salamèche no lose all pv', () => {
      render(<App />);
  
      fireEvent.click(screen.getByRole('button'))
      act(() => {
        jest.advanceTimersByTime(20000);
      })
  
      expect(screen.getByTestId('defender')).toHaveTextContent('PV: 0 / 100');
    })

    it('should make pikachu still get 10 pv', () => {
      render(<App />);
  
      fireEvent.click(screen.getByRole('button'))
      act(() => {
        jest.advanceTimersByTime(20000);
      })
  
      expect(screen.getByTestId('attacker')).toHaveTextContent('PV: 10 / 100');
    })

    it('should display pickachu won when the battle is over', () => {
      render(<App />);
  
      fireEvent.click(screen.getByRole('button'))
      act(() => {
        jest.advanceTimersByTime(20000);
      })
  
      expect(screen.getByTestId('logs')).toHaveTextContent('pikachu won');
    })
  })


  describe('play/pause', () => {
    it('should be paused by default', () => {
      render(<App />);
  
      expect(screen.getByRole('button')).toHaveTextContent('play');
    })

    it('should play the fight when clik on play button', () => {
      render(<App />);

      fireEvent.click(screen.getByRole('button'))
  
      expect(screen.getByRole('button')).toHaveTextContent('pause');
    })

    it('should pause the fight when clik on pause button', () => {
      render(<App />);

      fireEvent.click(screen.getByRole('button'))
      fireEvent.click(screen.getByRole('button'))
  
      expect(screen.getByRole('button')).toHaveTextContent('play');
    })

    it('should make nobody lose HP when battle is paused', () => {
      render(<App />);
  
      act(() => {
        jest.advanceTimersByTime(20000);
      })
  
      expect(screen.getByTestId('defender')).toHaveTextContent('PV: 100 / 100');
      expect(screen.getByTestId('attacker')).toHaveTextContent('PV: 100 / 100');
    })
  })
})

