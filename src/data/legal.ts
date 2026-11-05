// Drafted from how the site and forms actually work and from the business's published policies.
// Every page shows DRAFT - BUSINESS REVIEW REQUIRED and is noindex until `reviewed` is set to true
// (also remove the path from draftLegal in astro.config.mjs). [CONFIRM] marks facts we could not verify.
import { business, telHref, fullAddress } from './business';

export interface LegalPage { slug: string; title: string; metaTitle: string; description: string; summary: string; reviewed: boolean; html: string; }

const contact = `<a href="mailto:${business.email}">${business.email}</a> or <a href="${telHref}">${business.phoneDisplay}</a>`;

export const legalPages: LegalPage[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    metaTitle: 'Privacy Policy | Best Ambulance Service',
    description: 'What information Best Ambulance Service collects through this website, phone and WhatsApp, why it is collected, who processes it and how to contact us.',
    summary: 'What we collect, why, and who handles it.',
    reviewed: false,
    html: `
<h2>Who we are</h2>
<p>${business.name}, ${fullAddress}. Contact: ${contact}.</p>
<h2>Information we collect</h2>
<p>When you use a form on this website, we collect what you enter:</p>
<ul>
  <li><strong>Transfer request form:</strong> your name and phone number, pickup and destination, journey date and time, the patient’s general condition, ambulance type, oxygen or ventilator needs, number of family members travelling, and anything you add in the additional requirements box.</li>
  <li><strong>Callback form:</strong> your name, phone number and preferred time.</li>
  <li><strong>Contact form:</strong> your name, phone number, optional email, topic and message.</li>
</ul>
<ul>
  <li><strong>Advance payment form:</strong> your name and phone number, the amount, and optionally your email and booking reference. These are passed to Cashfree Payments to process the payment. You enter card, UPI or bank details on Cashfree’s checkout, and this website does not see or store them.</li>
</ul>
<p>We ask only for general information about the patient’s condition, so that the right vehicle can be sent. Please do not send a diagnosis or medical records through a website form. If you choose <em>Use my current location</em>, your browser asks your permission, and your location is placed in the pickup field for you to review before sending.</p>
<p>When you call or message us on WhatsApp, we receive your phone number and what you tell us. WhatsApp is operated by Meta under its own terms and privacy policy.</p>
<h2>How we use it</h2>
<p>We use this information to respond to your request, arrange and carry out the service, and keep the records our business needs. We do not sell your personal information.</p>
<h2>Who processes it</h2>
<p>Online payments are processed by Cashfree Payments under its own terms and privacy policy. Form submissions and payment notices are passed to us through our delivery provider(s). [CONFIRM: name the provider actually configured, for example Resend for email or Google for a Sheet.] Our website host processes basic server logs. [CONFIRM: hosting provider.]</p>
<h2>Cookies and analytics</h2>
<p>This website does not currently set advertising cookies or load analytics tools. If this changes, we will update this page first. [CONFIRM before adding any analytics.]</p>
<h2>How long we keep it</h2>
<p>[CONFIRM: retention period. Suggested wording: we keep enquiry and booking records for as long as needed to provide the service and to meet legal and accounting requirements.]</p>
<h2>Your choices</h2>
<p>You can ask us to access, correct or delete your information by contacting ${contact}. [CONFIRM: named grievance contact and response time, as required under India’s Digital Personal Data Protection Act, 2023. Please take legal advice on this section.]</p>
`,
  },
  {
    slug: 'terms',
    title: 'Terms and Conditions',
    metaTitle: 'Terms and Conditions | Best Ambulance Service',
    description: 'The terms that apply when you use this website or request an ambulance from Best Ambulance Service, including requests, availability and pricing.',
    summary: 'The terms for using this website and requesting a service.',
    reviewed: false,
    html: `
<h2>About these terms</h2>
<p>These terms apply when you use this website or request a service from ${business.name}. [CONFIRM: legal entity name and governing jurisdiction.]</p>
<h2>A request is not a booking</h2>
<p>Submitting a form sends us a request. A trip is booked only when our coordinator has spoken with you and confirmed the vehicle, crew, timing and cost. For an emergency, always call rather than using a form.</p>
<h2>Availability</h2>
<p>We aim to send ambulances as quickly as possible. Response times and journey times can be affected by traffic, weather, distance, road conditions and vehicle availability. Times and distances on this website are typical estimates and not guarantees.</p>
<h2>Pricing and payment</h2>
<p>Pricing depends on the service type, distance, crew and equipment required. For emergencies, the ambulance is dispatched and pricing is confirmed with you directly. For scheduled services, pricing is confirmed when you book. Ask what the quote includes before confirming.</p>
<p>Advances for scheduled services can be paid online through Cashfree Payments, in Indian rupees. Paying online does not by itself book a vehicle: a trip is booked when our coordinator has confirmed it with you. No payment is required before an emergency dispatch.</p>
<h2>Your information</h2>
<p>Please give accurate information about the patient’s condition and the pickup and destination. The vehicle and crew are planned around what you tell us. The decision about whether a patient is fit to travel rests with the treating doctor and the family.</p>
<h2>Website content</h2>
<p>This website is for general information and to help you reach us. It is not medical advice. See our <a href="/disclaimer">Disclaimer</a>.</p>
<h2>Limitation of liability</h2>
<p>[CONFIRM: please have a lawyer provide this clause. The business’s current published wording says it takes every reasonable step to provide safe, timely service, and that factors outside its control can affect outcomes.]</p>
<h2>Related policies</h2>
<p>See our <a href="/cancellation-policy">Cancellation Policy</a>, <a href="/refund-policy">Refund Policy</a>, <a href="/service-delivery-policy">Service Delivery Policy</a> and <a href="/privacy-policy">Privacy Policy</a>.</p>
<h2>Contact</h2>
<p>${contact}.</p>
`,
  },
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    metaTitle: 'Disclaimer | Best Ambulance Service',
    description: 'What the content on this website is and is not for: general information only, not medical advice, and not a replacement for emergency services.',
    summary: 'What this website’s content is, and is not, meant for.',
    reviewed: false,
    html: `
<h2>Not medical advice</h2>
<p>Content on this website, including guides, FAQs and route pages, is general information. It is not medical advice and does not replace advice from a qualified doctor. Whether a patient is fit to travel, what care they need on the way, and any oxygen or medication must be decided by the treating doctor.</p>
<h2>In an emergency</h2>
<p>Do not rely on anything you read here, and do not wait for a reply to a website form. Call us on <a href="${telHref}">${business.phoneDisplay}</a> or India’s emergency number, 112.</p>
<h2>Times, distances and availability</h2>
<p>Distances and journey times are estimates for planning. Response-time figures are typical ranges, not guarantees. Actual times depend on location, traffic, weather, vehicle availability and the patient’s condition. Equipment and crew are confirmed for each trip by a coordinator.</p>
<h2>Hospitals and other names</h2>
<p>Hospitals and landmarks are named only to describe areas and routes. Mentioning a hospital does not mean it has any partnership with us or endorses our service, unless we say so expressly.</p>
<h2>Third-party links</h2>
<p>Links to other websites, including WhatsApp, Google Maps and our related brands, are for convenience. Those websites are managed separately.</p>
<h2>Questions</h2>
<p>${contact}.</p>
`,
  },
  {
    slug: 'refund-policy',
    title: 'Refund Policy',
    metaTitle: 'Refund Policy | Best Ambulance Service',
    description: 'How refunds are handled when a planned ambulance booking is cancelled or cannot be fulfilled by Best Ambulance Service, and how to request one.',
    summary: 'How refunds work if a booking is cancelled or cannot go ahead.',
    reviewed: false,
    html: `
<h2>When a refund may apply</h2>
<p>A refund may apply if a booked service such as planned patient transport, an outstation ambulance or a standby booking is cancelled before it begins, or if we cannot fulfil a confirmed booking because of circumstances on our side. Emergency dispatches are not refundable once the vehicle has reached you or begun the journey.</p>
<h2>Timeframe</h2>
<p>Where a refund is due, it is processed within [CONFIRM: number of business days] of approval, to the original payment method.</p>
<h2>When a refund does not apply</h2>
<ul>
  <li>An ambulance has already been dispatched and reached the pickup location</li>
  <li>A scheduled service has already been completed</li>
  <li>A cancellation is made within [CONFIRM: number of hours] of the scheduled pickup for a planned trip</li>
</ul>
<h2>How to request a refund</h2>
<p>Contact ${contact} with your booking details. We will confirm eligibility and next steps. Please read this with our <a href="/cancellation-policy">Cancellation Policy</a>.</p>
`,
  },
  {
    slug: 'cancellation-policy',
    title: 'Cancellation Policy',
    metaTitle: 'Cancellation Policy | Best Ambulance Service',
    description: 'How to cancel a planned ambulance, standby or outstation booking with Best Ambulance Service, and what applies depending on the timing of the cancellation.',
    summary: 'How to cancel, and what applies depending on the timing.',
    reviewed: false,
    html: `
<h2>Planned bookings</h2>
<p>To cancel a planned trip such as patient transport or an outstation ambulance, contact our team as early as possible, so that we can release the vehicle and crew for other patients.</p>
<h2>Emergency dispatches</h2>
<p>Once an ambulance has been dispatched for an emergency and is on its way or has arrived, it cannot be cancelled in the same way as a planned trip, because the vehicle and crew are already committed.</p>
<h2>Timing</h2>
<ul>
  <li>Cancelled more than [CONFIRM: number of hours] before pickup: no charge</li>
  <li>Cancelled within [CONFIRM: number of hours] of pickup: a charge may apply, confirmed at the time of booking</li>
  <li>Vehicle already dispatched or on its way: full charges apply, per the <a href="/refund-policy">Refund Policy</a></li>
</ul>
<h2>Standby and contract bookings</h2>
<p>Notice periods and cancellation terms for standby, event or contract arrangements are agreed in writing at booking.</p>
<h2>How to cancel</h2>
<p>Call or WhatsApp <a href="${telHref}">${business.phoneDisplay}</a> with your booking details.</p>
`,
  },
  {
    slug: 'service-delivery-policy',
    title: 'Service Delivery Policy',
    metaTitle: 'Service Delivery Policy | Best Ambulance Service',
    description: 'What service delivery means for an ambulance business: how emergency dispatch and planned trips work, our coverage area, and what happens if we cannot reach you.',
    summary: 'How dispatch and planned trips reach you, and what happens if they cannot.',
    reviewed: false,
    html: `
<h2>What delivery means here</h2>
<p>We do not ship products. What we deliver is an ambulance, crew and equipment at your location.</p>
<h2>Emergency dispatch</h2>
<p>For emergency calls, the nearest available ambulance suited to the need is sent after the call. Response time depends on your location, traffic and which vehicles are available.</p>
<h2>Planned trips</h2>
<p>For planned patient transport and outstation trips, the vehicle and crew are confirmed and arrive at the agreed time and location. We contact you ahead of the scheduled time to confirm the details.</p>
<h2>Coverage</h2>
<p>Our core coverage is Hyderabad, Secunderabad and surrounding localities. See <a href="/locations">service locations</a>. We also arrange outstation transport to other cities on request.</p>
<h2>If we cannot reach you</h2>
<p>In rare cases such as extreme weather, road closures or no vehicle being available, we will tell you straight away and help coordinate an alternative.</p>
`,
  },
];
