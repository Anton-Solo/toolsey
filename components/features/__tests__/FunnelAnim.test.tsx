import { render, screen } from '@testing-library/react';
import FunnelAnim from '../FunnelAnim';

jest.mock('lottie-react', () => {
  return function Lottie({ className }: { className?: string }) {
    return <div data-testid="lottie-animation" className={className}>Lottie Animation</div>;
  };
});

jest.mock('@/public/animations/Funnel.json', () => ({
  default: { v: '5.7.0', fr: 60, ip: 0, op: 570, w: 960, h: 612, nm: 'Comp 1' },
}));

describe('FunnelAnim', () => {
  it('renders the Lottie animation', () => {
    render(<FunnelAnim />);
    const animation = screen.getByTestId('lottie-animation');
    expect(animation).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<FunnelAnim className="relative z-10" />);
    const container = screen.getByTestId('lottie-animation').parentElement;
    expect(container).toHaveClass('relative z-10');
  });

  it('renders with default props', () => {
    const { container } = render(<FunnelAnim />);
    expect(container.firstChild).toHaveClass('relative');
  });
});

