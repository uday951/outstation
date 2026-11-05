// Outstation routes.
// Distances: the business's published figure where it agrees with an independent road-routing
// check (OSRM, Nov 2026), otherwise the checked figure. `check` flags what the business should confirm.
// Hours: the business's published ambulance journey times, unless flagged.

export interface Route {
  slug: string;
  city: string;
  state: string;
  km: number;
  kmLabel: string;
  via: string;
  hours: string;
  states: string;
  stops: { name: string; km: number }[];
  title: string;
  description: string;
  lead: string;
  body: string[];
  planning: string[];
  faqs: { q: string; a: string }[];
  check?: string;
}

export const routes: Route[] = [
  {
    slug: 'hyderabad-to-vijayawada',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    km: 275,
    kmLabel: '~275 km',
    via: 'NH65',
    hours: '5–6 hours',
    states: 'Telangana, Andhra Pradesh',
    stops: [
      { name: 'Choutuppal', km: 49 },
      { name: 'Suryapet', km: 135 },
      { name: 'Kodad', km: 177 },
      { name: 'Vijayawada', km: 275 },
    ],
    title: 'Hyderabad to Vijayawada Ambulance on NH65 | 275 km Patient Transfer',
    description:
      'Moving a patient between Hyderabad and Vijayawada? About 275 km on NH65 in 5–6 hours, often arranged at short notice. Oxygen, ICU or basic ambulance.',
    lead: 'A single highway, about 275 km of it, and one of the shortest interstate transfers from Hyderabad. It can often be confirmed at short notice.',
    body: [
      'NH65 runs almost the whole way from Hyderabad to Vijayawada, through Choutuppal, Suryapet and Kodad. It is one of the corridors families ask for most, usually for a patient going home to Krishna district after treatment in Hyderabad, or coming the other way for specialist care.',
      'At five to six hours, most stable patients complete the trip without a planned rest stop. That also makes it a realistic same-day journey for a hospital discharge, as long as the discharge summary and the receiving address are ready before the ambulance leaves.',
    ],
    planning: [
      'Suryapet sits close to the halfway mark, which makes it the natural point for a fuel or comfort stop if the patient needs one.',
      'NH65 carries heavy traffic leaving Hyderabad through LB Nagar and Hayathnagar. A departure time that avoids the morning peak can shorten the first hour.',
    ],
    faqs: [
      { q: 'How quickly can a Hyderabad to Vijayawada ambulance be arranged?', a: 'Because the distance is shorter, this route can often be confirmed and dispatched sooner than longer outstation trips. Call to check which vehicle is free right now.' },
      { q: 'Can the ambulance pick up from Vijayawada and come to Hyderabad?', a: 'Tell the coordinator the actual pickup point and direction when you call. Trips from Vijayawada to a Hyderabad hospital are arranged case by case, depending on where the nearest suitable vehicle is.' },
      { q: 'Is the trip suitable for a stable patient who still needs monitoring?', a: 'Often yes, but it depends on the patient. Share the treating doctor’s advice and the coordinator will match the vehicle, from a basic ambulance with oxygen up to an ICU setup.' },
    ],
  },
  {
    slug: 'hyderabad-to-guntur',
    city: 'Guntur',
    state: 'Andhra Pradesh',
    km: 270,
    kmLabel: '~270 km',
    via: 'NH65, then the Narketpally–Addanki road',
    hours: '4.5–5.5 hours',
    states: 'Telangana, Andhra Pradesh',
    stops: [
      { name: 'Narketpally', km: 82 },
      { name: 'Miryalaguda', km: 142 },
      { name: 'Piduguralla', km: 205 },
      { name: 'Guntur', km: 270 },
    ],
    title: 'Hyderabad–Guntur Ambulance via Miryalaguda | 4.5–5.5 Hour Transfer',
    description:
      'Ambulance transfer from Hyderabad to Guntur via Narketpally, Miryalaguda and Piduguralla. About 270 km, 4.5–5.5 hours, with oxygen or ICU support if needed.',
    lead: 'The Guntur trip leaves the Vijayawada highway at Narketpally and cuts south-east through Miryalaguda and Piduguralla, about 270 km in all.',
    body: [
      'Many drivers assume Guntur means going through Vijayawada. The shorter line turns off NH65 at Narketpally and follows the Addanki road through Miryalaguda and Piduguralla. It avoids Vijayawada city traffic, and it brings you into Guntur from the west, which is worth knowing if the destination is on that side of town.',
      'Families most often book this route to bring a patient home after treatment in Hyderabad, or to move someone to a Hyderabad hospital for specialist care. It is usually possible to confirm the trip within a few hours of the call.',
    ],
    planning: [
      'Share the exact Guntur address early. The crew can then choose between the western approach and a route through the city.',
      'If the patient’s destination is actually Tenali, Bapatla or Narasaraopet, say so. The trip and the time change, and the coordinator will quote for the real end point.',
    ],
    faqs: [
      { q: 'How soon can an ambulance be arranged for Hyderabad to Guntur?', a: 'This route can often be confirmed within a few hours of your call. Availability depends on the vehicle type you need, so call to check for today.' },
      { q: 'Does the Guntur ambulance go through Vijayawada?', a: 'Usually not. The common route turns off at Narketpally and runs through Miryalaguda and Piduguralla. The crew confirms the final route based on your address and road conditions.' },
      { q: 'Can you go beyond Guntur to a nearby town?', a: 'Yes, tell the coordinator the final address. Outstation trips are planned around the real pickup and drop points, not just the district name.' },
    ],
  },
  {
    slug: 'hyderabad-to-khammam',
    city: 'Khammam',
    state: 'Telangana',
    km: 195,
    kmLabel: '~195 km',
    via: 'NH65, then Suryapet–Khammam road',
    hours: '3.5–4 hours',
    states: 'Telangana',
    stops: [
      { name: 'Choutuppal', km: 49 },
      { name: 'Suryapet', km: 134 },
      { name: 'Khammam', km: 195 },
    ],
    title: 'Khammam Ambulance from Hyderabad | 195 km Within Telangana',
    description:
      'Hyderabad to Khammam patient transfer: about 195 km and 3.5–4 hours via Suryapet. Same-day trips are often possible. Call or WhatsApp to check vehicles.',
    lead: 'Under four hours and entirely inside Telangana. Khammam is among the simpler outstation trips to arrange, and same-day transfers are often possible.',
    body: [
      'The usual line follows NH65 as far as Suryapet, then turns north-east to Khammam. There is no state border to cross, and the distance is short enough that most patients do not need a planned stop.',
      'Most requests are for patients going home after a hospital stay in Hyderabad, or for someone in Khammam who has been referred to a Hyderabad specialist. In a referral, ask the referring doctor what level of care the patient needs on the way before you book.',
    ],
    planning: [
      'Khammam trips work well as same-day discharges. Ask the ward about the discharge time before you fix the ambulance, because discharge paperwork is the most common cause of waiting.',
      'If the patient is going on towards Bhadrachalam or Kothagudem, mention it when you call, as both add meaningful distance.',
    ],
    faqs: [
      { q: 'Can I get a same-day ambulance from Hyderabad to Khammam?', a: 'In many cases, yes. Call with your requirement and the coordinator will confirm the nearest available vehicle and a realistic time.' },
      { q: 'How long does the Hyderabad to Khammam ambulance take?', a: 'Typically 3.5 to 4 hours for about 195 km, depending on traffic leaving Hyderabad and any stops the patient needs.' },
      { q: 'What should I arrange at the Khammam end?', a: 'Confirm that someone can receive the patient and help with the transfer into the home or hospital, and share a phone number at the destination with the crew.' },
    ],
    check: 'Business publishes ~200 km; routing check gives 194–197 km.',
  },
  {
    slug: 'hyderabad-to-warangal',
    city: 'Warangal',
    state: 'Telangana',
    km: 150,
    kmLabel: '~150 km',
    via: 'NH163',
    hours: '2.5–3 hours',
    states: 'Telangana',
    stops: [
      { name: 'Bhongir', km: 48 },
      { name: 'Jangaon', km: 91 },
      { name: 'Warangal', km: 150 },
    ],
    title: 'Warangal Ambulance Service from Hyderabad | NH163, Under 3 Hours',
    description:
      'The shortest regular outstation run: Hyderabad to Warangal on NH163, about 150 km in 2.5–3 hours. Ambulances from Uppal side, with ICU support on request.',
    lead: 'The shortest of the regular outstation routes: about 150 km north-east on NH163, through Bhongir and Jangaon, in under three hours.',
    body: [
      'Warangal is close enough that families sometimes consider a private car. If the patient cannot sit upright for three hours, needs oxygen, or has just had surgery, an ambulance with a stretcher and a trained attendant is the safer way to make even this short trip.',
      'The route leaves Hyderabad through Uppal and Ghatkesar. Patients most often travel home to Warangal, Hanamkonda or Kazipet after treatment in Hyderabad, or come in for specialist care that is not available locally.',
    ],
    planning: [
      'The Uppal stretch of the road is often the slowest part of the trip, so tell the coordinator if you have a fixed arrival time at a hospital.',
      'Hanamkonda and Kazipet are part of the same urban area but sit on different sides of it. Give the exact address rather than just “Warangal”.',
    ],
    faqs: [
      { q: 'How quickly can a Hyderabad to Warangal ambulance leave?', a: 'The shorter distance means this trip can often be confirmed and dispatched quickly. Call to check current availability.' },
      { q: 'Is ICU support available on the Warangal route?', a: 'Yes, ICU-equipped ambulances can be arranged. Tell the coordinator about the patient’s condition and share the doctor’s instructions before departure.' },
      { q: 'Do I need an ambulance for such a short trip?', a: 'Ask the treating doctor. If the patient needs to lie flat, needs oxygen, or could become unwell on the way, an ambulance is the safer choice even over three hours.' },
    ],
    check: 'Business publishes ~145 km; routing check gives 149–154 km.',
  },
  {
    slug: 'hyderabad-to-nellore',
    city: 'Nellore',
    state: 'Andhra Pradesh',
    km: 450,
    kmLabel: '~450 km',
    via: 'NH65, Narketpally–Addanki road, NH16',
    hours: '8–9 hours',
    states: 'Telangana, Andhra Pradesh',
    stops: [
      { name: 'Narketpally', km: 82 },
      { name: 'Miryalaguda', km: 142 },
      { name: 'Addanki', km: 285 },
      { name: 'Ongole', km: 327 },
      { name: 'Nellore', km: 450 },
    ],
    title: 'Ambulance to Nellore from Hyderabad via Ongole | 450 km, 8–9 Hours',
    description:
      'Planning a Hyderabad–Nellore patient transfer? About 450 km via Addanki and Ongole, 8–9 hours by ambulance, with rest stops planned for the patient.',
    lead: 'Most of a working day on the road. The trip joins NH16 near Ongole for the last stretch south, so the timing of departure and rest stops deserves some thought.',
    body: [
      'After Narketpally the road runs south-east through Miryalaguda to Addanki, then joins the NH16 coastal highway around Ongole for the final 120 km or so to Nellore. At 8 to 9 hours, this is long enough that rest stops should be planned rather than improvised.',
      'Families usually book this route for patients moving between Nellore and Hyderabad for specialist treatment, or going home after care in the city. An early departure lets the patient arrive in daylight, which makes the handover at home or at a hospital much easier.',
    ],
    planning: [
      'Ongole is roughly three-quarters of the way along and is the sensible place for a longer break.',
      'For oxygen-dependent patients, ask the coordinator to work out the supply for the full 9 hours plus a reserve. See the oxygen guide for how that calculation works.',
    ],
    faqs: [
      { q: 'What is the distance from Hyderabad to Nellore by ambulance?', a: 'About 450 km by road via Addanki and Ongole, which typically takes 8 to 9 hours depending on traffic and the patient’s condition.' },
      { q: 'Will the ambulance stop on the way to Nellore?', a: 'Rest stops are planned around the patient. Ongole is a common break point on this route. Tell the crew about meal times, medication times or any comfort needs.' },
      { q: 'Should we leave early in the morning?', a: 'For most families, yes. A morning start gets the patient to Nellore in daylight. The coordinator will suggest a time based on discharge timing and the patient’s needs.' },
    ],
    check: 'Business publishes ~370 km and 6–7 hours. Routing check gives ~448 km, so this page uses ~450 km and scales the time. Please confirm.',
  },
  {
    slug: 'hyderabad-to-bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    km: 570,
    kmLabel: '~570 km',
    via: 'NH44',
    hours: '10–11 hours',
    states: 'Telangana, Andhra Pradesh, Karnataka',
    stops: [
      { name: 'Jadcherla', km: 85 },
      { name: 'Kurnool', km: 217 },
      { name: 'Anantapur', km: 365 },
      { name: 'Penukonda', km: 438 },
      { name: 'Bangalore', km: 570 },
    ],
    title: 'Hyderabad to Bangalore Ambulance | NH44, 570 km ICU & Oxygen Transfer',
    description:
      'Hyderabad to Bengaluru ambulance on NH44: about 570 km, 10–11 hours, across three states. ICU, ventilator or oxygen setup confirmed before you commit.',
    lead: 'Straight down NH44 through three states, about 570 km and 10 to 11 hours. It is one of the most requested long-distance transfers from Hyderabad.',
    body: [
      'NH44 is a wide, fast highway for most of the way, passing Kurnool and Anantapur before reaching Bangalore (Bengaluru) from the north. That makes the road itself fairly predictable. The harder variable is the first and last hour: leaving Hyderabad, and crossing Bengaluru to reach the hospital or home. A hospital in the south of Bengaluru can add a real amount of time to a trip that reached the city limits on schedule.',
      'Patients on this route are often going home to Bengaluru after treatment in Hyderabad, or transferring to a specialist there. The vehicle is chosen from the patient’s condition: a standard ambulance, oxygen support or a full ICU setup, confirmed before departure.',
    ],
    planning: [
      'Kurnool falls at around 215 km and Anantapur at around 365 km, so both are natural break points on a 10-hour journey.',
      'Give the exact Bengaluru address and ask the receiving hospital about its admission hours. Reaching the city late at night can mean a wait at the other end.',
    ],
    faqs: [
      { q: 'How long does a Hyderabad to Bangalore ambulance take?', a: 'About 570 km on NH44, typically 10 to 11 hours depending on traffic, weather and any planned rest or medical stops. City traffic at the Bengaluru end can add time.' },
      { q: 'Can an ICU ambulance make the Hyderabad to Bangalore trip?', a: 'Yes. ICU-equipped ambulances are available for this route, with continuous monitoring. Share the treating doctor’s instructions so the crew and equipment can be matched.' },
      { q: 'How do I book the Hyderabad to Bangalore route?', a: 'Call or WhatsApp with the pickup point, the Bengaluru address and the patient’s condition, or send the request form. A coordinator confirms the vehicle, crew and cost before the trip is booked.' },
    ],
  },
  {
    slug: 'hyderabad-to-tirupati',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    km: 555,
    kmLabel: '~555 km',
    via: 'NH44, NH40, NH716',
    hours: '9–10 hours',
    states: 'Telangana, Andhra Pradesh',
    stops: [
      { name: 'Kurnool', km: 213 },
      { name: 'Kadapa', km: 412 },
      { name: 'Rajampet', km: 466 },
      { name: 'Tirupati', km: 555 },
    ],
    title: 'Tirupati Ambulance from Hyderabad via Kurnool & Kadapa | 9–10 Hours',
    description:
      'A long inland route: Hyderabad to Tirupati via Kurnool and Kadapa, about 555 km in 9–10 hours. Suited to elderly patients with planned stops and oxygen.',
    lead: 'An inland route that follows NH44 to Kurnool, then swings south-east through Kadapa. It is about 555 km, with little reason to hurry and every reason to plan the stops.',
    body: [
      'After Kurnool the highway leaves the main Bengaluru line and crosses the Rayalaseema districts by way of Kadapa and Rajampet, reaching Tirupati from the north-west. Long stretches between larger towns make it worth settling in advance where the ambulance will pause and how much oxygen it is carrying.',
      'Families ask for this route for patients travelling to or from Tirupati for ongoing care, and it is often arranged for elderly relatives. The coordinator chooses between a standard, oxygen-supported or ICU vehicle based on the patient’s condition.',
    ],
    planning: [
      'Kadapa, at around 410 km, is the last big town before the final stretch and a good place for a planned stop.',
      'If the patient is elderly, tell the coordinator about medication timings and whether they can tolerate lying flat for long periods, so the stops can be set around them.',
    ],
    faqs: [
      { q: 'Can an elderly or ICU patient travel from Hyderabad to Tirupati?', a: 'It depends on the patient, and the treating doctor should advise. The vehicle, whether standard, oxygen-supported or ICU, is confirmed from the patient’s condition, with planned stops for a journey this long.' },
      { q: 'How far is Tirupati from Hyderabad by ambulance?', a: 'About 555 km by road via Kurnool and Kadapa, typically 9 to 10 hours including allowance for stops.' },
      { q: 'Can the ambulance wait at Tirupati for a return journey?', a: 'Tell the coordinator if you need a return trip or waiting time. It changes the plan and the cost, so it is best settled before departure.' },
    ],
    check: 'Business publishes ~570 km; routing check gives 551–553 km.',
  },
  {
    slug: 'hyderabad-to-visakhapatnam',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    km: 620,
    kmLabel: '~620 km',
    via: 'NH65, NH16',
    hours: '10–11 hours',
    states: 'Telangana, Andhra Pradesh',
    stops: [
      { name: 'Suryapet', km: 134 },
      { name: 'Vijayawada', km: 274 },
      { name: 'Eluru', km: 334 },
      { name: 'Rajamahendravaram', km: 433 },
      { name: 'Visakhapatnam', km: 620 },
    ],
    title: 'Hyderabad to Vizag Ambulance | 620 km via Vijayawada & Rajahmundry',
    description:
      'Long-distance ambulance to Visakhapatnam via Vijayawada and Rajamahendravaram: about 620 km, 10–11 hours, with crew changes and ICU options for longer trips.',
    lead: 'Across the Krishna and the Godavari to the coast, about 620 km on the traditional highway. The trip is long enough that crew changes and rest stops are part of the plan.',
    body: [
      'The traditional route takes NH65 to Vijayawada and then NH16 north-east along the coastal plain through Eluru and Rajamahendravaram. A newer corridor through Khammam can be somewhat shorter, about 560 km by routing data, so ask the coordinator which line they suggest for the day of travel.',
      'Patients on this route are often going home to Visakhapatnam after treatment in Hyderabad, or being moved to Hyderabad for specialist care. On a trip of this length the plan covers crew changes and rest stops, and an ICU-equipped vehicle is available when the patient’s condition calls for one.',
    ],
    planning: [
      'Vijayawada is near the midpoint on the traditional route, which makes it a useful checkpoint for reviewing the patient and supplies.',
      'Coastal Andhra can be affected by heavy rain during the cyclone months. Check the forecast before fixing a date if the transfer can wait.',
    ],
    faqs: [
      { q: 'Is ICU ambulance service available from Hyderabad to Visakhapatnam?', a: 'Yes, ICU-equipped ambulances are available for this route, with continuous monitoring and stops planned around the patient’s condition.' },
      { q: 'How long does a Hyderabad to Vizag ambulance take?', a: 'About 10 to 11 hours for around 620 km on the traditional route via Vijayawada. The coordinator confirms the route and time for your date.' },
      { q: 'Is an air ambulance better than road for Vizag?', a: 'That is a medical decision for the treating doctor. If air is advised, the ground legs at both ends can be coordinated with your air ambulance provider.' },
    ],
    check: 'Routing check gives 561 km via the Khammam corridor and 623 km via Vijayawada. Confirm which route crews actually use.',
  },
  {
    slug: 'hyderabad-to-chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    km: 625,
    kmLabel: '~625 km',
    via: 'NH65, Addanki road, NH16',
    hours: '11–12 hours',
    states: 'Telangana, Andhra Pradesh, Tamil Nadu',
    stops: [
      { name: 'Miryalaguda', km: 142 },
      { name: 'Ongole', km: 327 },
      { name: 'Nellore', km: 454 },
      { name: 'Chennai', km: 625 },
    ],
    title: 'Ambulance Hyderabad to Chennai | Hospital Transfers, 625 km, 11–12 Hrs',
    description:
      'Transferring a patient to or from a Chennai hospital? About 625 km via Ongole and Nellore, 11–12 hours, with oxygen, cardiac monitoring or a full ICU setup.',
    lead: 'A full day on the road: about 625 km, three states, and a final run down the NH16 coast through Ongole and Nellore into Chennai.',
    body: [
      'Chennai’s specialist hospitals make this a common referral corridor. On a transfer of 11 to 12 hours, the plan matters as much as the vehicle. The coordinator goes through crew changes, rest stops and required equipment with you before confirming, whether that is oxygen support, cardiac monitoring or a full ICU setup.',
      'If the receiving hospital is in Chennai’s southern or western suburbs, tell the coordinator early. Getting across the city can take much longer than the last few kilometres suggest, and the arrival time should be agreed with the hospital’s admissions team.',
    ],
    planning: [
      'Ongole and Nellore are the main checkpoints on the coastal stretch, about 330 km and 455 km from Hyderabad.',
      'An alternate inland line via Kurnool and Kadapa exists but is usually longer. Road conditions and the patient’s needs decide which is used.',
    ],
    faqs: [
      { q: 'What is the distance from Hyderabad to Chennai by ambulance?', a: 'About 625 km, typically 11 to 12 hours by road, depending on traffic and the stops the patient’s condition requires.' },
      { q: 'Is oxygen support available on the Chennai route?', a: 'Yes. Oxygen-supported and ICU ambulances are available. Share the prescribed flow rate so the supply can be planned for the full journey plus a reserve.' },
      { q: 'Who talks to the Chennai hospital?', a: 'Before the transfer, your treating doctor should confirm the bed and the handover with the receiving team. Share that contact with the crew so they can update the hospital on the way.' },
    ],
  },
  {
    slug: 'hyderabad-to-mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    km: 710,
    kmLabel: '~710 km',
    via: 'NH65, NH48',
    hours: '13–15 hours',
    states: 'Telangana, Karnataka, Maharashtra',
    stops: [
      { name: 'Zaheerabad', km: 115 },
      { name: 'Solapur', km: 312 },
      { name: 'Pune', km: 565 },
      { name: 'Lonavala', km: 629 },
      { name: 'Mumbai', km: 710 },
    ],
    title: 'Hyderabad to Mumbai Ambulance via Solapur & Pune | 710 km Transfer',
    description:
      'Road ambulance from Hyderabad to Mumbai through Solapur and Pune: about 710 km, usually 13–15 hours. Ask about crew changes, ghat sections and ICU support.',
    lead: 'West across the Deccan to Solapur and Pune, then down the ghats to the coast. It is about 710 km, and the plan has to account for hill sections and Mumbai’s traffic at the end.',
    body: [
      'NH65 runs west from Hyderabad through Zaheerabad and Solapur to Pune, and the route then descends the Western Ghats on the way to Mumbai. Those ghat sections involve steady curves and gradient changes, so it is worth telling the crew if the patient is sensitive to movement or has a condition that needs extra care on bends.',
      'Mumbai is one of the destinations the business names as a frequent request. A trip of this length usually involves crew changes and rest stops, and the exact vehicle, crew and timing are confirmed once the coordinator knows the patient’s condition and the address at the Mumbai end.',
    ],
    planning: [
      'Solapur is close to the midpoint, and Pune is the last major city before the ghats. Both are useful checkpoints.',
      'Mumbai’s traffic varies a lot by time of day. Work out your departure time backwards from when the receiving hospital can admit the patient.',
    ],
    faqs: [
      { q: 'How long does a Hyderabad to Mumbai ambulance take?', a: 'As a planning estimate, 13 to 15 hours for about 710 km, depending on stops, ghat traffic and the part of Mumbai you are going to. The coordinator confirms this for your date.' },
      { q: 'Does the Mumbai route pass Pune?', a: 'Usually yes. If the destination is in Pune instead, tell the coordinator, as a Pune trip is shorter and is planned on its own.' },
      { q: 'Can a ventilator patient travel by road to Mumbai?', a: 'A ventilator ambulance can be arranged, but the treating doctor should decide whether road travel of this length is appropriate or whether air transfer is safer.' },
    ],
    check: 'Business names Mumbai as a frequent route but publishes no page or figures. Distance is from routing data; the time is our planning estimate. Please confirm.',
  },
  {
    slug: 'hyderabad-to-delhi',
    city: 'Delhi',
    state: 'Delhi NCR',
    km: 1510,
    kmLabel: '~1,510 km',
    via: 'NH44',
    hours: '28–34 hours',
    states: 'Telangana, Maharashtra, Madhya Pradesh, Uttar Pradesh, Rajasthan, Haryana, Delhi',
    stops: [
      { name: 'Nirmal', km: 215 },
      { name: 'Nagpur', km: 488 },
      { name: 'Sagar', km: 878 },
      { name: 'Jhansi', km: 1081 },
      { name: 'Agra', km: 1304 },
      { name: 'Delhi', km: 1510 },
    ],
    title: 'Hyderabad to Delhi Ambulance | 1,510 km on NH44, Air Options',
    description:
      'Hyderabad to Delhi is over a day by road ambulance, about 1,510 km on NH44 via Nagpur and Agra. Learn how crew changes work and when air or train makes sense.',
    lead: 'More than a day on the road: about 1,510 km up NH44 through central India. Before booking, it is worth asking whether road is the right choice at all.',
    body: [
      'This is the longest regular route on the list. NH44 runs north through Nagpur, Sagar, Jhansi, Gwalior and Agra, and the trip continues through the night. It needs a second driver or crew changes, and supplies have to be planned for the entire distance.',
      'Road transfer still suits many patients, especially when it allows family to travel alongside, or when flying is not advised. For others, the treating doctor may prefer a medical escort on a commercial flight, or an air ambulance. The business can arrange the ground ambulance legs and a medical escort, but does not operate aircraft.',
    ],
    planning: [
      'Nagpur, at about 490 km, is a major city and a natural first checkpoint. Jhansi and Agra are later checkpoints in the north.',
      'Ask the coordinator what the crew-change plan is, and what the plan is if the patient needs medical attention on the way.',
    ],
    faqs: [
      { q: 'How long does a Hyderabad to Delhi ambulance take?', a: 'As a planning estimate, 28 to 34 hours for about 1,510 km with stops and crew changes. Actual time depends on the patient, the season and road conditions.' },
      { q: 'Should we go by road, train or air to Delhi?', a: 'Ask the treating doctor first, because the patient’s condition decides this. Tell the coordinator what the doctor advises and they can arrange the road ambulance, station or airport transfers, or a medical escort accordingly.' },
      { q: 'Can family travel with the patient to Delhi?', a: 'Usually a limited number can. Space depends on the vehicle and equipment, so tell the coordinator how many people plan to travel. Include the number in the request form.' },
    ],
    check: 'Business names Delhi as a frequent route but publishes no page or figures. Distance is from routing data; the time is our planning estimate. Please confirm.',
  },
];

export const routesByKm = [...routes].sort((a, b) => a.km - b.km);
export const routeBySlug = (slug: string) => routes.find((r) => r.slug === slug);
export const routeHref = (r: Route) => `/services/outstation-ambulance/${r.slug}`;
export const routeWhatsApp = (r: Route) =>
  `Hello, I need an outstation ambulance from Hyderabad to ${r.city}.\nPickup area:\nDate:\nPatient condition:\nAmbulance type needed:`;
