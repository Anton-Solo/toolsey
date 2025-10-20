import { render, screen } from '@testing-library/react';
import AllLeadsAnim from '../AllLeadsAnim';

// Mock Lottie component
jest.mock('lottie-react', () => ({
  __esModule: true,
  default: function Lottie({ 
    className, 
    loop, 
    autoplay 
  }: { 
    className?: string; 
    loop?: boolean; 
    autoplay?: boolean;
  }) {
    return (
      <div 
        data-testid="lottie-animation" 
        className={className}
        data-loop={loop?.toString()}
        data-autoplay={autoplay?.toString()}
      >
        Lottie Animation
      </div>
    );
  },
}));

// Mock animation data
jest.mock('@/public/animations/all-leads.json', () => ({
  __esModule: true,
  default: { v: '5.7.0', fr: 60, ip: 0, op: 570, w: 960, h: 612, nm: 'All Leads Animation' },
}));

describe('AllLeadsAnim', () => {
  it('renders the component with default props', () => {
    const { container } = render(<AllLeadsAnim />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the Lottie animation', () => {
    render(<AllLeadsAnim />);
    const animation = screen.getByTestId('lottie-animation');
    expect(animation).toBeInTheDocument();
    expect(animation).toHaveTextContent('Lottie Animation');
  });

  it('applies custom className to main container', () => {
    const { container } = render(<AllLeadsAnim className="custom-class" />);
    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass('relative');
    expect(mainContainer).toHaveClass('custom-class');
  });

  it('renders with default props (loop=true, autoplay=true)', () => {
    render(<AllLeadsAnim />);
    const animation = screen.getByTestId('lottie-animation');
    expect(animation).toHaveAttribute('data-loop', 'true');
    expect(animation).toHaveAttribute('data-autoplay', 'true');
  });

  it('respects custom loop prop', () => {
    render(<AllLeadsAnim loop={false} />);
    const animation = screen.getByTestId('lottie-animation');
    expect(animation).toHaveAttribute('data-loop', 'false');
  });

  it('respects custom autoplay prop', () => {
    render(<AllLeadsAnim autoplay={false} />);
    const animation = screen.getByTestId('lottie-animation');
    expect(animation).toHaveAttribute('data-autoplay', 'false');
  });

  it('renders background image with correct style', () => {
    const { container } = render(<AllLeadsAnim />);
    const bgElement = container.querySelector('.absolute.inset-0');
    expect(bgElement).toBeInTheDocument();
    expect(bgElement).toHaveStyle({ backgroundImage: 'url(/images/bg-lead.png)' });
  });

  it('renders with correct layered structure', () => {
    const { container } = render(<AllLeadsAnim />);
    
    // Check background layer exists
    const bgElement = container.querySelector('.absolute.inset-0.bg-cover.bg-center.bg-no-repeat');
    expect(bgElement).toBeInTheDocument();
    
    // Check animation container with z-index
    const animationContainer = container.querySelector('.relative.z-10');
    expect(animationContainer).toBeInTheDocument();
  });

  it('applies correct classes to Lottie component', () => {
    render(<AllLeadsAnim />);
    const animation = screen.getByTestId('lottie-animation');
    expect(animation).toHaveClass('h-full');
    expect(animation).toHaveClass('w-full');
  });

  it('can disable both loop and autoplay', () => {
    render(<AllLeadsAnim loop={false} autoplay={false} />);
    const animation = screen.getByTestId('lottie-animation');
    expect(animation).toHaveAttribute('data-loop', 'false');
    expect(animation).toHaveAttribute('data-autoplay', 'false');
  });
});

