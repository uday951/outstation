// shadcn/ui buttons. Rendered to static HTML with no client JavaScript.
import { Phone, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-[#128045]">
      <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.1-.7.2l-.9 1.2c-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 2.5 1.1 3 .9 3.5.8.5-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3ZM12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2Z" />
    </svg>
  );
}

interface Props {
  tel: string;
  phone: string;
  wa: string;
  plan?: boolean;
  planHref?: string;
}

export default function ContactButtons({ tel, phone, wa, plan = false, planHref = '/book' }: Props) {
  return (
    <div className="actions actions--stack">
      <Button asChild variant="call" size="xl">
        <a href={tel}>
          <Phone />
          Call {phone}
        </a>
      </Button>
      <Button asChild variant="glass" size="xl">
        <a href={wa} rel="noopener">
          <WhatsAppIcon />
          WhatsApp us
        </a>
      </Button>
      {plan && (
        <Button asChild variant="glass" size="xl">
          <a href={planHref}>
            <ClipboardList />
            Send a transfer request
          </a>
        </Button>
      )}
    </div>
  );
}
