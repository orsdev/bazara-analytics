import { render, screen } from '@/lib/test-utils';
import { SplashScreen } from '../ui/splash-screen';

describe('SplashScreen', () => {
  it('renders correctly', () => {
    render(<SplashScreen />);

    expect(screen.getByTestId('splash-screen')).toBeInTheDocument();
  });
});
