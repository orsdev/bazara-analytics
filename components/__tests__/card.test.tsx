import { render, screen } from '@/lib/test-utils';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter
} from '../ui/card';

describe('Card Components', () => {
  describe('Card', () => {
    it('renders correctly', () => {
      render(<Card data-testid="card">Card content</Card>);
      const card = screen.getByTestId('card');

      expect(card).toBeInTheDocument();
    });
  });

  describe('CardHeader', () => {
    it('renders correctly', () => {
      render(<CardHeader data-testid="header">Header content</CardHeader>);
      const header = screen.getByTestId('header');

      expect(header).toBeInTheDocument();
    });
  });

  describe('CardTitle', () => {
    it('renders correctly', () => {
      render(<CardTitle data-testid="title">Card Title</CardTitle>);
      const title = screen.getByTestId('title');

      expect(title).toBeInTheDocument();
    });
  });

  describe('CardDescription', () => {
    it('renders correctly', () => {
      render(
        <CardDescription data-testid="description">
          Card description
        </CardDescription>
      );
      const description = screen.getByTestId('description');
      expect(description).toBeInTheDocument();
    });
  });

  describe('CardAction', () => {
    it('renders correctly', () => {
      render(<CardAction data-testid="action">Action content</CardAction>);
      const action = screen.getByTestId('action');
      expect(action).toBeInTheDocument();
    });
  });

  describe('CardContent', () => {
    it('renders correctly', () => {
      render(<CardContent data-testid="content">Card content</CardContent>);
      const content = screen.getByTestId('content');

      expect(content).toBeInTheDocument();
    });
  });

  describe('CardFooter', () => {
    it('renders correctly', () => {
      render(<CardFooter data-testid="footer">Footer content</CardFooter>);
      const footer = screen.getByTestId('footer');

      expect(footer).toBeInTheDocument();
    });
  });

  describe('Complete Card Structure', () => {
    it('renders a complete card with all components', () => {
      render(
        <Card data-testid="complete-card">
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
            <CardAction>Action</CardAction>
          </CardHeader>
          <CardContent>Content goes here</CardContent>
          <CardFooter>Footer content</CardFooter>
        </Card>
      );

      expect(screen.getByTestId('complete-card')).toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
      expect(screen.getByText('Content goes here')).toBeInTheDocument();
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });
  });
});
