import { render, screen } from '@/utils/test-utils';
import { checkAccessibility } from '@/utils/a11y-test-utils';
import { ContactInfoItem } from './page';

xdescribe('ContactInfoItem', () => {
  it('renders with string details', () => {
    render(
      <ContactInfoItem icon="email" title="Email" details="test@example.com" />
    );

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('renders with object details', () => {
    render(
      <ContactInfoItem
        icon="access_time"
        title="Business Hours"
        details={{
          Weekdays: '9:00 AM - 6:00 PM',
          Weekends: '10:00 AM - 4:00 PM',
        }}
      />
    );

    expect(screen.getByText('Business Hours')).toBeInTheDocument();
    expect(screen.getByText('Weekdays:')).toBeInTheDocument();
    expect(screen.getByText('9:00 AM - 6:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Weekends:')).toBeInTheDocument();
    expect(screen.getByText('10:00 AM - 4:00 PM')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    await checkAccessibility(
      <ContactInfoItem icon="email" title="Email" details="test@example.com" />
    );
  });
});
