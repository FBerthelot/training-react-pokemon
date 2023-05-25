import { render } from '@testing-library/react';
import {App} from './App';

describe('App', () => {
  // The test of the app is in childs components
  it('should not throw any error', () => {
    render(<App />)
  })
})

