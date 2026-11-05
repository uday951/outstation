// Localities and nearby hospital/landmark facts come from the business's published coverage pages.
// Dedicated pages exist only where there is something specific to say. Others are listed on the hub.

export interface LocationPage {
  slug: string;
  name: string;
  title: string;
  description: string;
  lead: string;
  body: string[];
  hospitals: string[];
  landmarks: string[];
  outstation: string;
  corridors: string[];
  faqs: { q: string; a: string }[];
  nearby: string[];
}

export const locationPages: LocationPage[] = [
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    title: 'Ambulance Services in Hyderabad | ICU, Emergency & Outstation, 24×7',
    description: 'Ambulance services across Hyderabad, from emergency response and ICU transfers to long-distance trips, dispatched by a live coordinator at any hour.',
    lead: 'The home base for every trip. Emergency response, ICU transfers and scheduled transport run across the city, and every outstation route begins here.',
    body: [
      'The business is based at LB Nagar and covers Hyderabad’s major localities, from the IT corridor around Gachibowli and HITEC City to the older neighbourhoods near Charminar and the northern suburbs around Kompally.',
      'A big city makes the first part of any transfer the least predictable. The route out of Hyderabad depends on where you start and where you are going: the Vijayawada highway leaves through LB Nagar, the Bengaluru highway runs south past Shamshabad, and the Warangal road heads out via Uppal.',
    ],
    hospitals: ['Apollo Hospitals, Jubilee Hills', 'NIMS, Panjagutta', 'Osmania General Hospital, Afzalgunj', 'Yashoda Hospitals, Somajiguda'],
    landmarks: ['Rajiv Gandhi International Airport, Shamshabad', 'Nampally Railway Station', 'LB Nagar junction', 'Outer Ring Road'],
    outstation: 'All regular outstation routes start from Hyderabad. See the route list for distances and journey times.',
    corridors: ['hyderabad-to-bangalore', 'hyderabad-to-vijayawada', 'hyderabad-to-warangal'],
    faqs: [
      { q: 'Does the ambulance cover all of Hyderabad?', a: 'The business lists more than 30 localities on its coverage list. If yours is not listed, call, because outer areas can often still be reached.' },
      { q: 'How quickly can an ambulance reach me in Hyderabad?', a: 'It depends on your location, traffic and which vehicles are free. The business reports 15 to 20 minutes as typical in well-covered areas, which is not a guarantee.' },
      { q: 'Can I choose the hospital?', a: 'Yes, generally the patient goes to the hospital you choose. In an emergency the crew may advise on the closest suitable hospital.' },
    ],
    nearby: ['secunderabad', 'lb-nagar', 'banjara-hills', 'gachibowli'],
  },
  {
    slug: 'secunderabad',
    name: 'Secunderabad',
    title: 'Ambulance Services in Secunderabad | Station Transfers & Outstation',
    description: 'Ambulance coverage around Secunderabad Railway Station, Parade Grounds and Gandhi Hospital, with station transfers and long-distance trips from the twin city.',
    lead: 'Hyderabad’s twin city, built around one of south India’s busiest rail junctions. That makes it as much a travel point as a neighbourhood.',
    body: [
      'Coverage here focuses on the railway station, Parade Grounds and the older residential streets around them, some of which are narrow. Giving a landmark when you call helps the crew reach you quickly.',
      'Patients travelling on by train can be met at or brought to Secunderabad station. Staff help with the platform and any medical support needed up to boarding. See train ambulance coordination for how this works.',
    ],
    hospitals: ['Gandhi Hospital', 'Yashoda Hospitals, Secunderabad', 'Global Hospitals, Lakdi-ka-pul'],
    landmarks: ['Secunderabad Railway Station', 'Parade Grounds', 'Clock Tower', 'Sarojini Devi Eye Hospital area'],
    outstation: 'From Secunderabad the northern routes are the most direct, so the Warangal road and NH44 towards Nagpur start close by.',
    corridors: ['hyderabad-to-warangal', 'hyderabad-to-delhi', 'hyderabad-to-vijayawada'],
    faqs: [
      { q: 'Can you pick up a patient arriving at Secunderabad station?', a: 'Yes, station pickup is available. Share the train number, coach and arrival time so that the crew can plan to meet the patient.' },
      { q: 'Do you handle transfers between Secunderabad and Hyderabad city hospitals?', a: 'Yes. Transfers between Secunderabad and hospitals in the rest of Hyderabad are routine. The vehicle is matched to the patient’s condition.' },
      { q: 'Can an ambulance reach the older lanes?', a: 'Tell the coordinator about narrow lanes when you call and give a nearby landmark. That helps the crew plan the best approach.' },
    ],
    nearby: ['hyderabad', 'kukatpally'],
  },
  {
    slug: 'lb-nagar',
    name: 'LB Nagar',
    title: 'Ambulance Service in LB Nagar | Vijayawada Highway Base, Hyderabad',
    description: 'Ambulance service in LB Nagar, where the business is based. A junction on the Vijayawada highway, close to Dilsukhnagar, Nagole and Vanasthalipuram.',
    lead: 'Where the business is based, and where NH65 begins its run towards Vijayawada, Guntur and Khammam.',
    body: [
      'LB Nagar anchors south-east Hyderabad as a major junction, with the flyover and many residential colonies around it. The office is near the Chintalkunta Check Post bus stop, close to NASA Hospitals.',
      'Being on the eastern edge of the city also shortens the start of eastbound outstation trips, because a patient from this side does not have to cross central Hyderabad first.',
    ],
    hospitals: ['Care Hospitals, LB Nagar', 'Sunshine Hospitals, LB Nagar', 'NASA Hospitals'],
    landmarks: ['LB Nagar flyover junction', 'Chintalkunta Check Post', 'Chaitanyapuri approach', 'Central Mall'],
    outstation: 'Eastbound outstation trips on NH65 pass straight through this side of the city, which is useful for transfers towards coastal Andhra.',
    corridors: ['hyderabad-to-vijayawada', 'hyderabad-to-guntur', 'hyderabad-to-khammam'],
    faqs: [
      { q: 'Can I visit the LB Nagar office?', a: 'The business address is at Chintalkunta Check Post, LB Nagar. For an urgent need, always call rather than travelling to the office.' },
      { q: 'Do you cover the colonies around LB Nagar junction?', a: 'Yes, the residential colonies off the junction are in the business’s standard coverage zone.' },
      { q: 'Is an outstation trip faster from LB Nagar?', a: 'For destinations east on NH65, this side of the city avoids some cross-town traffic. Actual timing still depends on the day and the patient.' },
    ],
    nearby: ['hyderabad', 'secunderabad'],
  },
  {
    slug: 'gachibowli',
    name: 'Gachibowli',
    title: 'Gachibowli Ambulance Service | Financial District Hospital Transfers',
    description: 'Ambulance coverage in Gachibowli and the Financial District: office campuses, AIG and Continental Hospitals, and a quick start for trips towards Bengaluru.',
    lead: 'Western Hyderabad’s office and hospital corridor, with a large daytime population and major hospitals, and a quick link to the Outer Ring Road.',
    body: [
      'Gachibowli has both a workplace population in the Financial District and DLF Cyber City and dense housing around Nanakramguda and the stadium. Because the area is spread out, response varies by zone. Give the campus or tower name and gate number when you call.',
      'Several of the city’s larger private hospitals are here, so it is a common pickup point for discharges and inter-city transfers. The Outer Ring Road gives a direct link to NH44 south.',
    ],
    hospitals: ['AIG Hospitals', 'Continental Hospitals', 'Sunshine Hospitals, Gachibowli'],
    landmarks: ['Gachibowli Stadium', 'DLF Cyber City', 'Financial District', 'University of Hyderabad approach road'],
    outstation: 'The Outer Ring Road connects Gachibowli to NH44, making this a convenient start for trips heading south.',
    corridors: ['hyderabad-to-bangalore', 'hyderabad-to-tirupati', 'hyderabad-to-mumbai'],
    faqs: [
      { q: 'Do you respond to offices in the Financial District?', a: 'Yes, medical emergencies at offices and campuses here are in coverage. Give the campus name and gate, and alert building security so that the crew can get straight in.' },
      { q: 'Can a patient be moved from a Gachibowli hospital to another city?', a: 'Yes. Long-distance discharges and transfers are arranged case by case. Share the hospital, ward and the discharge timing with the coordinator.' },
      { q: 'Is an ICU ambulance available in Gachibowli?', a: 'ICU ambulances are available for transfers across Hyderabad’s hospital network, including Gachibowli.' },
    ],
    nearby: ['hitech-city', 'kukatpally'],
  },
  {
    slug: 'kukatpally',
    name: 'Kukatpally',
    title: 'Kukatpally Ambulance Service | KPHB Colony & JNTU Area Coverage',
    description: 'Ambulance coverage for Kukatpally, all phases of KPHB Colony and the JNTU area, with hospital transfers, planned patient transport and outstation trips.',
    lead: 'One of Hyderabad’s largest residential areas, large enough that the business treats it as its own coverage zone.',
    body: [
      'From KPHB Colony’s residential phases to the commercial stretch near the mall, Kukatpally is densely built and busy at peak hours. When you call, give the KPHB phase and block number and a nearby landmark, as many streets look alike.',
      'Elderly residents here often need planned trips for hospital visits and dialysis. Scheduled patient transport is well suited to those needs.',
    ],
    hospitals: ['Omni Hospitals', 'KIMS Hospital, Kondapur', 'Sunshine Hospitals, Kukatpally'],
    landmarks: ['KPHB Colony', 'JNTU Hyderabad', 'Forum Sujana Mall', 'Kukatpally Housing Board'],
    outstation: 'NH65 heading west starts close by, so trips towards Solapur, Pune and Mumbai avoid crossing the whole city.',
    corridors: ['hyderabad-to-mumbai', 'hyderabad-to-bangalore', 'hyderabad-to-vijayawada'],
    faqs: [
      { q: 'Do you cover all KPHB Colony phases?', a: 'Yes, all phases of KPHB Colony and the wider Kukatpally area are in the regular coverage list.' },
      { q: 'Can you respond near JNTU Hyderabad?', a: 'Yes. Give the exact gate or nearby landmark when you call, so that the crew can reach you directly.' },
      { q: 'Is an ICU ambulance available for transfers from Kukatpally?', a: 'Yes, ICU ambulance transfers can be arranged. Share the patient’s condition and the receiving hospital with the coordinator.' },
    ],
    nearby: ['hitech-city', 'secunderabad'],
  },
  {
    slug: 'banjara-hills',
    name: 'Banjara Hills',
    title: 'Banjara Hills Ambulance Service | Road No. 12 & KBR Park Area',
    description: 'Ambulance service across Banjara Hills, from Road No. 1 to Road No. 14, Film Nagar approach and GVK One, with ICU transfers from nearby major hospitals.',
    lead: 'Numbered roads, gated homes and some of the city’s best-known hospitals within a short distance of each other.',
    body: [
      'Banjara Hills runs across its numbered roads from KBR Park to Rajbhavan Road. Road number and a building name are the fastest way to direct a crew, and traffic on Road No. 1 and Rajbhavan Road can slow things at peak hours.',
      'Transfers often start at a nearby hospital, with a discharge or referral going on to another city. Ask the ward about discharge timing before you fix the ambulance, so that the crew and family are not left waiting.',
    ],
    hospitals: ['Care Hospitals, Banjara Hills', 'Yashoda Hospitals, Somajiguda', 'Apollo Hospitals, Jubilee Hills'],
    landmarks: ['KBR National Park', 'GVK One Mall', 'Road No. 12 commercial stretch', 'Film Nagar approach'],
    outstation: 'Central enough to reach any highway, though the first half hour depends on traffic. Agree a departure time that avoids the peak.',
    corridors: ['hyderabad-to-chennai', 'hyderabad-to-bangalore', 'hyderabad-to-visakhapatnam'],
    faqs: [
      { q: 'Do you cover all road numbers in Banjara Hills?', a: 'Yes. Coverage spans the numbered roads, the Film Nagar approach and the commercial area near GVK One.' },
      { q: 'Can you take a patient from Banjara Hills to any hospital?', a: 'Generally yes. Tell the coordinator the receiving hospital and the patient’s condition so that the right ambulance is sent.' },
      { q: 'Is an ICU ambulance available in Banjara Hills?', a: 'Yes, ICU ambulances are available here. Mention ventilator or infusion needs when you call.' },
    ],
    nearby: ['jubilee-hills', 'hitech-city'],
  },
  {
    slug: 'jubilee-hills',
    name: 'Jubilee Hills',
    title: 'Jubilee Hills Ambulance | Apollo, Film Nagar & Check Post Coverage',
    description: 'Ambulance coverage for Jubilee Hills: Check Post, Road No. 36, Film Nagar and Apollo Hospitals. Book a planned transfer or call for emergencies, any hour.',
    lead: 'A busy mix of residential streets and commercial roads around Road No. 36, Check Post and Film Nagar, with one of the city’s largest hospitals nearby.',
    body: [
      'Traffic around the Check Post and Road No. 36 can change quickly, so an accurate pickup point saves time. Tell the coordinator the road number, the society name and which gate the crew should use.',
      'Scheduled transfers from clinics and hospitals here can be planned in advance, including trips that continue to another city once the patient is discharged.',
    ],
    hospitals: ['Apollo Hospitals, Jubilee Hills', 'Rainbow Children’s Hospital, Banjara Hills', 'Continental Hospitals, Gachibowli'],
    landmarks: ['Jubilee Hills Check Post', 'Film Nagar', 'Peddamma Temple', 'Road No. 36'],
    outstation: 'The Outer Ring Road is reached fairly easily through Gachibowli, which helps on southbound and westbound trips.',
    corridors: ['hyderabad-to-bangalore', 'hyderabad-to-chennai', 'hyderabad-to-mumbai'],
    faqs: [
      { q: 'How fast can an ambulance reach Jubilee Hills Check Post?', a: 'In typical conditions, the business reports 15 to 20 minutes. Actual time depends on traffic and which vehicles are free when you call.' },
      { q: 'Do you serve Film Nagar residential societies?', a: 'Yes. Coverage extends across Film Nagar and the Check Post commercial zone. Give the society name and gate.' },
      { q: 'Can I book a scheduled transfer from a Jubilee Hills clinic?', a: 'Yes, scheduled transfers can be booked in advance by phone, WhatsApp or the request form.' },
    ],
    nearby: ['banjara-hills', 'hitech-city'],
  },
  {
    slug: 'hitech-city',
    name: 'HITEC City',
    title: 'HITEC City Ambulance Service | Cyber Towers, Mindspace & Madhapur',
    description: 'Ambulance coverage for HITEC City office campuses at Cyber Towers and Mindspace, Madhapur apartments and nearby hospitals, with standby options for employers.',
    lead: 'Large office campuses and a dense working population during the day, with apartments all around them.',
    body: [
      'Cyber Towers, Mindspace and the Madhapur junction are busy throughout the working day, so a medical incident at work often means negotiating gates and lifts as well as traffic. Having someone meet the crew at the gate saves valuable minutes.',
      'Employers here can also arrange a stationed ambulance on contract. See standby ambulance services for how that works, including site planning and how staff should raise an alert.',
    ],
    hospitals: ['Continental Hospitals, Nanakramguda', 'AIG Hospitals, Gachibowli', 'Apollo Health City, Jubilee Hills'],
    landmarks: ['Cyber Towers', 'Mindspace', 'Inorbit Mall', 'HITEC City Metro Station'],
    outstation: 'Employees and families from other states often need a transfer home, or to bring a relative to Hyderabad for treatment. The Outer Ring Road gives quick highway access.',
    corridors: ['hyderabad-to-bangalore', 'hyderabad-to-chennai', 'hyderabad-to-delhi'],
    faqs: [
      { q: 'Can you respond to an emergency inside an office campus?', a: 'Yes, office campuses are in coverage. Alert your security desk so that the crew can be taken straight to the patient.' },
      { q: 'Do you cover apartments near Madhapur?', a: 'Yes. Give the apartment name, block and gate when you call, and let security know that an ambulance is coming.' },
      { q: 'Is patient transport available for scheduled appointments?', a: 'Yes, planned transport for appointments and discharges can be booked in advance.' },
    ],
    nearby: ['gachibowli', 'kukatpally'],
  },
];

// Full published coverage list. Localities without a dedicated page are listed on the hub only.
export const allAreas = [
  'Alwal', 'Ameerpet', 'Attapur', 'Balanagar', 'Banjara Hills', 'Begumpet', 'Charminar', 'Dilsukhnagar', 'ECIL', 'Financial District',
  'Gachibowli', 'Hayathnagar', 'HITEC City', 'Jubilee Hills', 'Kompally', 'Kondapur', 'Kothapet', 'Kukatpally', 'LB Nagar', 'Madhapur',
  'Malakpet', 'Malkajgiri', 'Manikonda', 'Mehdipatnam', 'Miyapur', 'Nagole', 'Nampally', 'Rajendra Nagar', 'Secunderabad', 'Shamshabad',
  'Tarnaka', 'Tolichowki', 'Uppal', 'Vanasthalipuram', 'Yousufguda',
];

export const locationBySlug = (s: string) => locationPages.find((l) => l.slug === s);
export const locationHref = (s: string) => `/locations/${s}`;

export const hospitals = [
  { name: 'Apollo Hospitals', area: 'Jubilee Hills' },
  { name: 'Care Hospitals', area: 'Banjara Hills' },
  { name: 'Yashoda Hospitals', area: 'Somajiguda' },
  { name: 'Continental Hospitals', area: 'Gachibowli' },
  { name: 'AIG Hospitals', area: 'Gachibowli' },
  { name: 'KIMS Hospital', area: 'Kondapur' },
  { name: 'Osmania General Hospital', area: 'Afzalgunj' },
  { name: 'Gandhi Hospital', area: 'Musheerabad, Secunderabad' },
  { name: 'NIMS', area: 'Panjagutta' },
  { name: 'Global Hospitals', area: 'Lakdi-ka-pul' },
];
