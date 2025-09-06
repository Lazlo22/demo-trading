import userEvent from '@testing-library/user-event';

import { render, screen } from '../../test-utils';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '../../../src/components/ui/sheet';

describe('Sheet Components', () => {
  it('renders sheet trigger', () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
      </Sheet>
    );

    expect(screen.getByText('Open Sheet')).toBeInTheDocument();
  });

  it('opens sheet when trigger is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet description for accessibility</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    await user.click(screen.getByText('Open Sheet'));
    expect(screen.getByText('Sheet Title')).toBeInTheDocument();
  });

  it('renders sheet content with all components', async () => {
    const user = userEvent.setup();
    
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Test Title</SheetTitle>
            <SheetDescription>Test Description</SheetDescription>
          </SheetHeader>
          <div>Sheet Body Content</div>
          <SheetFooter>
            <SheetClose>Close</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

    await user.click(screen.getByText('Open Sheet'));
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Sheet Body Content')).toBeInTheDocument();
    expect(screen.getAllByText('Close')[0]).toBeInTheDocument();
  });

  it('closes sheet when close button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet description for accessibility</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose>Close</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

    await user.click(screen.getByText('Open Sheet'));
    expect(screen.getByText('Sheet Title')).toBeInTheDocument();

    await user.click(screen.getAllByText('Close')[0]);
    expect(screen.queryByText('Sheet Title')).not.toBeInTheDocument();
  });
});