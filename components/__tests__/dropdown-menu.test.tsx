import { render } from '@testing-library/react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuGroup,
  DropdownMenuPortal
} from '../ui/dropdown-menu';

// Mock Radix UI primitives
jest.mock('@radix-ui/react-dropdown-menu', () => ({
  Root: jest.fn(),
  Portal: jest.fn(),
  Trigger: jest.fn(),
  Content: jest.fn(),
  Group: jest.fn(),
  Item: jest.fn(),
  CheckboxItem: jest.fn(),
  RadioGroup: jest.fn(),
  RadioItem: jest.fn(),
  Label: jest.fn(),
  Separator: jest.fn(),
  Sub: jest.fn(),
  SubTrigger: jest.fn(),
  SubContent: jest.fn(),
  ItemIndicator: jest.fn()
}));

// Mock icons
jest.mock('lucide-react', () => ({
  CheckIcon: () => <svg data-testid="check-icon" />,
  ChevronRightIcon: () => <svg data-testid="chevron-right-icon" />,
  CircleIcon: () => <svg data-testid="circle-icon" />
}));

// Mock cn utility
jest.mock('@/lib', () => ({
  cn: jest.fn((...classes) => classes.filter(Boolean).join(' '))
}));

describe('DropdownMenu Components', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('DropdownMenu', () => {
    it('renders without crashing', () => {
      expect(() => render(<DropdownMenu>Content</DropdownMenu>)).not.toThrow();
    });

    it('renders with props', () => {
      const props = { open: true, onOpenChange: jest.fn() };
      expect(() =>
        render(<DropdownMenu {...props}>Content</DropdownMenu>)
      ).not.toThrow();
    });
  });

  describe('DropdownMenuPortal', () => {
    it('renders without crashing', () => {
      expect(() =>
        render(<DropdownMenuPortal>Content</DropdownMenuPortal>)
      ).not.toThrow();
    });
  });

  describe('DropdownMenuTrigger', () => {
    it('renders without crashing', () => {
      expect(() =>
        render(<DropdownMenuTrigger>Trigger</DropdownMenuTrigger>)
      ).not.toThrow();
    });
  });

  describe('DropdownMenuContent', () => {
    it('renders without crashing', () => {
      expect(() =>
        render(<DropdownMenuContent>Content</DropdownMenuContent>)
      ).not.toThrow();
    });

    it('renders with props', () => {
      expect(() =>
        render(
          <DropdownMenuContent className="test-class" align="start">
            Content
          </DropdownMenuContent>
        )
      ).not.toThrow();
    });
  });

  describe('DropdownMenuGroup', () => {
    it('renders without crashing', () => {
      expect(() =>
        render(<DropdownMenuGroup>Content</DropdownMenuGroup>)
      ).not.toThrow();
    });
  });

  describe('DropdownMenuItem', () => {
    it('renders without crashing', () => {
      expect(() =>
        render(<DropdownMenuItem>Item</DropdownMenuItem>)
      ).not.toThrow();
    });

    it('supports inset variant', () => {
      expect(() =>
        render(<DropdownMenuItem inset>Item</DropdownMenuItem>)
      ).not.toThrow();
    });

    it('supports destructive variant', () => {
      expect(() =>
        render(<DropdownMenuItem variant="destructive">Item</DropdownMenuItem>)
      ).not.toThrow();
    });
  });

  describe('DropdownMenuCheckboxItem', () => {
    it('renders without crashing', () => {
      expect(() =>
        render(
          <DropdownMenuCheckboxItem checked={true}>
            Checked Item
          </DropdownMenuCheckboxItem>
        )
      ).not.toThrow();
    });

    it('renders unchecked without crashing', () => {
      expect(() =>
        render(
          <DropdownMenuCheckboxItem checked={false}>
            Unchecked Item
          </DropdownMenuCheckboxItem>
        )
      ).not.toThrow();
    });
  });

  describe('DropdownMenuRadioGroup', () => {
    it('renders without crashing', () => {
      const props = { value: 'option1', onValueChange: jest.fn() };
      expect(() =>
        render(
          <DropdownMenuRadioGroup {...props}>
            Radio Options
          </DropdownMenuRadioGroup>
        )
      ).not.toThrow();
    });
  });

  describe('DropdownMenuRadioItem', () => {
    it('renders without crashing', () => {
      expect(() =>
        render(
          <DropdownMenuRadioItem value="test">Radio Item</DropdownMenuRadioItem>
        )
      ).not.toThrow();
    });

    it('renders with props', () => {
      expect(() =>
        render(
          <DropdownMenuRadioItem value="option1" className="test-class">
            Radio Item
          </DropdownMenuRadioItem>
        )
      ).not.toThrow();
    });
  });

  describe('DropdownMenuLabel', () => {
    it('renders without crashing', () => {
      expect(() =>
        render(<DropdownMenuLabel>Label</DropdownMenuLabel>)
      ).not.toThrow();
    });

    it('supports inset variant', () => {
      expect(() =>
        render(<DropdownMenuLabel inset>Label</DropdownMenuLabel>)
      ).not.toThrow();
    });
  });

  describe('DropdownMenuShortcut', () => {
    it('renders without crashing', () => {
      expect(() =>
        render(<DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>)
      ).not.toThrow();
    });
  });

  describe('DropdownMenuSeparator', () => {
    it('renders without crashing', () => {
      expect(() => render(<DropdownMenuSeparator />)).not.toThrow();
    });
  });

  describe('DropdownMenuSub', () => {
    it('renders without crashing', () => {
      const props = { open: true, onOpenChange: jest.fn() };
      expect(() =>
        render(<DropdownMenuSub {...props}>Sub Content</DropdownMenuSub>)
      ).not.toThrow();
    });
  });

  describe('DropdownMenuSubTrigger', () => {
    it('renders without crashing', () => {
      expect(() =>
        render(<DropdownMenuSubTrigger>Sub Trigger</DropdownMenuSubTrigger>)
      ).not.toThrow();
    });

    it('supports inset variant', () => {
      expect(() =>
        render(
          <DropdownMenuSubTrigger inset>Sub Trigger</DropdownMenuSubTrigger>
        )
      ).not.toThrow();
    });
  });

  describe('DropdownMenuSubContent', () => {
    it('renders without crashing', () => {
      expect(() =>
        render(<DropdownMenuSubContent>Sub Content</DropdownMenuSubContent>)
      ).not.toThrow();
    });
  });
});
