import { render, screen } from '@testing-library/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';

describe('Dialog', () => {
  it('renders with default props', () => {
    render(<Dialog />);
  });

  it('passes through props to Radix root', () => {
    const mockOnOpenChange = jest.fn();
    render(<Dialog open={true} onOpenChange={mockOnOpenChange} />);

    // Should not throw any errors
  });

  it('renders children as trigger', () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <button>Open Dialog</button>
        </DialogTrigger>
      </Dialog>
    );

    expect(
      screen.getByRole('button', { name: /open dialog/i })
    ).toBeInTheDocument();
  });

  it('renders content when open', () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <p>Dialog content</p>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByText('Dialog content')).toBeInTheDocument();
  });

  it('shows close button by default', () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <p>Dialog content</p>
        </DialogContent>
      </Dialog>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  it('hides close button when showCloseButton is false', () => {
    render(
      <Dialog open={true}>
        <DialogContent showCloseButton={false}>
          <p>Dialog content</p>
        </DialogContent>
      </Dialog>
    );

    const closeButton = screen.queryByRole('button', { name: /close/i });
    expect(closeButton).not.toBeInTheDocument();
  });

  it('renders header content', () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <h2>Header Title</h2>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByText('Header Title')).toBeInTheDocument();
  });

  it('renders title content', () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
  });

  it('renders description content', () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogDescription>Dialog description</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByText('Dialog description')).toBeInTheDocument();
  });

  it('renders footer content', () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogFooter>
            <button>Cancel</button>
            <button>Confirm</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /confirm/i })
    ).toBeInTheDocument();
  });

  it('close button has screen reader text', () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <p>Dialog content</p>
        </DialogContent>
      </Dialog>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();

    const srText = closeButton.querySelector('.sr-only');
    expect(srText).toHaveTextContent('Close');
  });
});
