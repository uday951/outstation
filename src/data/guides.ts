// Original guides. Medical statements are kept general and defer to the treating doctor.
// A qualified clinician should review these before launch (see the project report).

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  summary: string;
  published: string;
  html: string;
}

export const guides: Guide[] = [
  {
    slug: 'how-to-book-an-outstation-ambulance',
    title: 'How to book an outstation ambulance, step by step',
    metaTitle: 'How to Book an Outstation Ambulance: A Step-by-Step Guide',
    description: 'From the doctor’s go-ahead to the handover at the other end: how to arrange a long-distance ambulance from Hyderabad without surprises on the day.',
    summary: 'The order that works: doctor first, bed second, ambulance third.',
    published: '2026-11-04',
    html: `
<p>Booking a long-distance ambulance is less like calling a taxi and more like planning a small hospital move. Doing things in the right order saves most of the trouble. If this is an emergency, skip this page and <a href="tel:+918821084108">call now</a>.</p>
<h2>1. Ask the treating doctor first</h2>
<p>Before you call anyone, ask the doctor two questions: is the patient fit to travel this distance, and what support do they need on the way? The answers decide almost everything else, including which type of ambulance is needed. If the patient is in hospital, ask for this to be written in the discharge or referral summary.</p>
<h2>2. Confirm the other end</h2>
<p>For a hospital transfer, confirm the bed and get the name and phone number of a contact at the receiving hospital. Ask whether they can admit at the time you expect to arrive. For a trip home, check that someone can receive the patient and that the bed, oxygen or other equipment will be ready.</p>
<h2>3. Call with the details ready</h2>
<p>A coordinator can give a faster and more accurate answer if you can share:</p>
<ul>
  <li>The pickup point: hospital and ward, or home address with floor and lift details</li>
  <li>The destination address, not only the city</li>
  <li>The preferred date and time, and whether either can change</li>
  <li>The patient’s condition, and any oxygen or ventilator needs</li>
  <li>How many family members want to travel</li>
</ul>
<p>Our <a href="/blog/information-needed-before-booking-an-ambulance">checklist of information to have ready</a> goes through these one by one. You can also send them through the <a href="/book">request form</a> or on WhatsApp.</p>
<h2>4. Confirm the plan and the cost</h2>
<p>Before you commit, make sure you know:</p>
<ul>
  <li>Which type of vehicle is coming, and who will be on board</li>
  <li>The route, estimated journey time and planned stops</li>
  <li>The total cost and what it includes. Ask specifically about tolls, waiting time, night travel and any return journey</li>
</ul>
<h2>5. On the day</h2>
<p>Have the patient’s documents and medicines in one bag. Allow time for hospital discharge, which usually takes longer than families expect, and tell the coordinator early if the time moves. Keep your phone charged, and share a contact number at the destination with the crew.</p>
<h2>At the other end</h2>
<p>The crew hands over the patient and an update on the journey to the receiving hospital team, or helps the patient settle at home. Keep your paperwork together, as the receiving doctors will want to see it.</p>
`,
  },
  {
    slug: 'choosing-the-right-ambulance-for-long-distance',
    title: 'How to choose the right ambulance for a long-distance transfer',
    metaTitle: 'BLS, ALS, ICU or Oxygen? Choosing an Ambulance for Long Distance',
    description: 'BLS, oxygen, ALS, ventilator or ICU: what each ambulance does on a long trip, and the questions to ask the doctor so you pay for the right level of care.',
    summary: 'What separates BLS, oxygen, ALS and ICU, and who should make the decision.',
    published: '2026-11-04',
    html: `
<p>The right ambulance is the one that matches what the patient may need on the way. It is not a decision you have to make alone: the treating doctor advises on the level of care, and the coordinator matches a vehicle to that advice. This guide helps you understand the conversation.</p>
<h2>The main levels</h2>
<h3><a href="/services/bls-ambulance">BLS (Basic Life Support)</a></h3>
<p>For patients who are stable but should not travel by car. Includes a trained attendant, oxygen, basic monitoring and a stretcher. A common choice for going home to another city after treatment.</p>
<h3><a href="/services/oxygen-ambulance">Oxygen ambulance</a></h3>
<p>For patients who breathe on their own but need supplemental oxygen and saturation monitoring. The supply must be planned for the whole trip. See our <a href="/blog/oxygen-for-long-distance-ambulance-travel">oxygen planning guide</a>.</p>
<h3><a href="/services/als-ambulance">ALS (Advanced Life Support)</a></h3>
<p>For patients who may need a paramedic to act: managing an airway, starting an IV, giving emergency medication or using a defibrillator.</p>
<h3><a href="/services/ventilator-ambulance">Ventilator ambulance</a> and <a href="/services/icu-ambulance">ICU ambulance</a></h3>
<p>For patients on a ventilator or needing sustained intensive care, with infusion pumps, cardiac monitoring and backup supplies.</p>
<h2>Why distance changes the decision</h2>
<p>A patient who manages well on a 30-minute drive across the city may have different needs on a 10-hour highway trip. Over a long distance, think about:</p>
<ul>
  <li><strong>Time away from a hospital.</strong> Some stretches of highway are a long way from the next large hospital. Ask the doctor what could go wrong, and whether the crew could manage it.</li>
  <li><strong>Supplies.</strong> Oxygen, batteries and medicines all have to last the whole journey, plus a margin for delays.</li>
  <li><strong>Comfort.</strong> Lying on a stretcher for many hours has its own challenges, particularly for elderly patients. Plan stops and repositioning around them.</li>
</ul>
<h2>Questions to ask the doctor</h2>
<ul>
  <li>Is the patient fit to travel this distance by road?</li>
  <li>Do they need oxygen? At what flow rate?</li>
  <li>Should a paramedic or a doctor be on board?</li>
  <li>Which medicines may be needed during the trip, and when?</li>
  <li>What changes should prompt the crew to stop or seek a hospital?</li>
</ul>
<h2>When road may not be the right answer</h2>
<p>For very long distances or very unwell patients, the doctor may advise an air ambulance, or a <a href="/services/medical-escort">medical escort</a> on a regular flight or train. The business can arrange ground legs and escorts, though it does not operate aircraft. See <a href="/services/air-ambulance-coordination">air ambulance coordination</a>.</p>
`,
  },
  {
    slug: 'information-needed-before-booking-an-ambulance',
    title: 'What information do you need before booking an ambulance?',
    metaTitle: 'What to Have Ready Before Booking a Long-Distance Ambulance',
    description: 'A short checklist of the details a coordinator needs for a long-distance patient transfer: pickup, destination, condition, equipment, family and paperwork.',
    summary: 'A short checklist that saves a lot of back-and-forth on the phone.',
    published: '2026-11-04',
    html: `
<p>You do not need all of this before calling, and in an emergency you should not wait for any of it. For a planned transfer, having these details ready gets you a quicker and more accurate answer.</p>
<h2>The journey</h2>
<ul>
  <li><strong>Pickup:</strong> hospital name, ward and floor, or the full home address with a landmark.</li>
  <li><strong>Getting out of the building:</strong> stairs, lift size, narrow lanes, or anything else that affects how a stretcher reaches the vehicle.</li>
  <li><strong>Destination:</strong> the full address and a phone number there. “Bengaluru” is not enough, because a hospital on the far side of a big city can add a long time to the trip.</li>
  <li><strong>Date and time:</strong> your preferred departure, and how much flexibility you have.</li>
</ul>
<h2>The patient</h2>
<p>Share enough for the right vehicle to be sent. You do not need to send medical records through a website form, and the coordinator will ask for what they need.</p>
<ul>
  <li>Approximate age and weight</li>
  <li>Whether the patient can sit up or needs to lie flat</li>
  <li>Oxygen needs and flow rate, if any</li>
  <li>Whether they are on a ventilator, and the current settings</li>
  <li>Any drips, drains, or infusion pumps</li>
  <li>The doctor’s advice about fitness to travel</li>
</ul>
<h2>People</h2>
<ul>
  <li>How many family members want to travel with the patient</li>
  <li>Who the crew should call on the day</li>
  <li>The receiving doctor or hospital contact, for a hospital transfer</li>
</ul>
<h2>Paperwork to carry</h2>
<p>Hospitals vary, so ask the ward what they recommend. Families commonly carry:</p>
<ul>
  <li>The discharge or referral summary</li>
  <li>Recent test reports and scans</li>
  <li>A medication chart and enough medicines for the journey and the first days afterwards</li>
  <li>A government photo ID for the patient and the person accompanying them</li>
</ul>
<h2>Ready?</h2>
<p><a href="/book">Send the request form</a> or <a href="tel:+918821084108">call +91 88210 84108</a>. Then read <a href="/blog/preparing-a-patient-for-long-distance-transport">how to prepare a patient for the journey</a>.</p>
`,
  },
  {
    slug: 'preparing-a-patient-for-long-distance-transport',
    title: 'Preparing a patient for long-distance ambulance transport',
    metaTitle: 'Preparing a Patient for Long-Distance Ambulance Travel: Checklist',
    description: 'What families can do the day before and the morning of a long ambulance journey: medicines, food, comfort, paperwork and what to pack for the road.',
    summary: 'What families can do the day before and on the morning of the journey.',
    published: '2026-11-04',
    html: `
<p>Long ambulance trips go better when the small things are sorted out in advance. This guide covers practical preparation by families. Follow the treating doctor’s instructions wherever they differ from anything here.</p>
<h2>The day before</h2>
<ul>
  <li><strong>Talk to the doctor about medicines.</strong> Ask for a written schedule that includes doses falling during the journey, and ask whether any timings should change.</li>
  <li><strong>Ask about food and water.</strong> Ask what the patient may eat and drink during the trip, especially after surgery or with a feeding tube.</li>
  <li><strong>Ask for the discharge paperwork early.</strong> Hospital discharge often takes longer than expected, and delays can push your arrival into the night.</li>
  <li><strong>Confirm with the coordinator.</strong> Recheck the time and pickup point, and mention any change in the patient’s condition.</li>
  <li><strong>Prepare the destination.</strong> Make sure the bed, equipment and helpers will be ready when the patient arrives.</li>
</ul>
<h2>What to pack</h2>
<ul>
  <li>Medical papers in one folder, kept within reach and not in the luggage</li>
  <li>Medicines with the schedule, plus some extra</li>
  <li>Comfort items: a pillow, a light blanket, and loose clothing</li>
  <li>Personal care items: adult diapers, wipes and a urine bottle if needed</li>
  <li>Water and any food the doctor has allowed</li>
  <li>Phone chargers, and some cash for the road</li>
</ul>
<h2>On the morning of the trip</h2>
<ul>
  <li>Give the patient any medicines due, as the doctor advised</li>
  <li>Help them use the toilet before leaving, if they can</li>
  <li>Tell the crew about anything that has changed overnight</li>
  <li>Decide who is travelling, and who will bring the luggage if there is no space</li>
</ul>
<h2>During the journey</h2>
<p>The crew manages the patient’s care. The most useful thing family can do is stay calm and reassuring. Tell the crew if the patient seems different to you: more confused, in more pain, or breathing differently. You know them best.</p>
<p>For elderly patients, ask for planned stops to help with repositioning and comfort. Long periods lying in one position can be hard on the skin and joints.</p>
<h2>On arrival</h2>
<p>Hand over the folder of papers to the receiving team, and tell them when the last medicines were given. If the patient has come home, ask the treating doctor who to contact locally if there are concerns afterwards.</p>
`,
  },
  {
    slug: 'oxygen-for-long-distance-ambulance-travel',
    title: 'Oxygen requirements during long-distance ambulance travel',
    metaTitle: 'How Much Oxygen for a Long Ambulance Journey? Planning Explained',
    description: 'How oxygen supply is planned for a long ambulance trip: prescribed flow rate, journey time, a reserve for delays, and the questions to ask before you leave.',
    summary: 'How supply is worked out from flow rate and journey time, plus a reserve.',
    published: '2026-11-04',
    html: `
<p><strong>This guide explains planning, not treatment.</strong> Oxygen is a prescribed therapy. The flow rate has to come from the patient’s doctor, and should not be changed without medical advice.</p>
<h2>The basic calculation</h2>
<p>Oxygen planning is mostly simple arithmetic. Multiply the prescribed flow rate, in litres per minute, by the journey time in minutes:</p>
<p><strong>Litres needed = flow rate × minutes of travel</strong></p>
<p>As a purely illustrative example, a patient prescribed 2 litres per minute on a 10-hour trip (600 minutes) would use about 1,200 litres. At 4 litres per minute, the same trip would use about 2,400 litres.</p>
<h2>Why you need a reserve</h2>
<p>The figure above is the minimum, and real trips rarely run to the minute. Roadworks, a closed highway, a slow crossing of a big city, or a wait at the receiving hospital can all add hours. A patient’s needs can also change on the way. The plan should include a clear margin, and the crew should know where they would look for more supply.</p>
<h2>Cylinder sizes differ</h2>
<p>Cylinders hold different amounts according to their size and how full they are, so “two cylinders” does not tell you how long the supply will last. Ask how many litres are available in total, or how many hours they should last at the prescribed flow rate.</p>
<h2>Questions to ask before you leave</h2>
<ul>
  <li>What is the total oxygen on board, and how long will it last at this flow rate?</li>
  <li>What is the reserve if the trip runs long?</li>
  <li>Is there a concentrator on board as well as cylinders? A concentrator depends on a power supply.</li>
  <li>How will saturation be monitored, and how often?</li>
  <li>What will the crew do if the patient’s saturation drops?</li>
</ul>
<h2>Information to share</h2>
<ul>
  <li>The prescribed flow rate, and whether it differs at rest or during sleep</li>
  <li>The type of delivery the patient uses, such as a nasal cannula or a mask</li>
  <li>The patient’s usual saturation range, if the doctor has given you one</li>
  <li>The expected journey time. <a href="/services/outstation-ambulance">Our route pages</a> list typical times</li>
</ul>
<h2>Oxygen or ventilator?</h2>
<p>A patient who breathes on their own and only needs extra oxygen would usually travel in an <a href="/services/oxygen-ambulance">oxygen ambulance</a>. A patient who needs a machine to help them breathe needs a <a href="/services/ventilator-ambulance">ventilator ambulance</a>. The treating doctor decides which applies. If someone is struggling to breathe right now, <a href="tel:+918821084108">call immediately</a>.</p>
`,
  },
  {
    slug: 'hospital-to-hospital-transfer-guidance',
    title: 'Hospital-to-hospital patient transfer: what families should know',
    metaTitle: 'Hospital-to-Hospital Patient Transfer: A Guide for Families in India',
    description: 'Moving a patient between hospitals? Who decides, what paperwork to ask for, how to confirm the bed, and the questions to ask before the ambulance leaves.',
    summary: 'Who decides, what to ask for, and how to avoid arriving to no bed.',
    published: '2026-11-04',
    html: `
<p>Families usually look into a hospital transfer when they want a higher level of care, a particular specialist, lower costs, or a hospital closer to home. Whatever the reason, the order of steps matters.</p>
<h2>Talk to the treating team first</h2>
<p>Tell the current doctor that you are thinking about a transfer, and why. Ask whether it is safe to move the patient now, or whether waiting would be better. If the family decides to go against medical advice, the hospital may ask you to sign a form saying so. Make sure you understand what that means before signing.</p>
<h2>Confirm the bed at the receiving hospital</h2>
<p>This is the step most often skipped, and it causes the most distress. Do not leave until you have:</p>
<ul>
  <li>Confirmed that a suitable bed, such as ICU or a ward, is available</li>
  <li>The name and number of a contact at the receiving hospital</li>
  <li>A conversation between the two treating doctors, where possible</li>
  <li>An understanding of the deposit and admission process at the other end</li>
</ul>
<h2>Paperwork to ask for</h2>
<ul>
  <li>Transfer or discharge summary, with diagnosis and treatment given</li>
  <li>Recent reports, and copies of any scans</li>
  <li>Current medication chart with the last dose times</li>
  <li>Ventilator settings or oxygen requirement, if applicable</li>
</ul>
<h2>Settling the bill</h2>
<p>Discharge billing, insurance approval and pharmacy returns can all take hours. Start early, and tell the coordinator the realistic time so that the ambulance and crew are not arriving hours ahead. Ask your insurer before the transfer about what is covered, including the ambulance.</p>
<h2>Choosing the ambulance</h2>
<p>The current doctor should advise on the level of care the patient needs on the way. A short, stable transfer may need only a <a href="/services/bls-ambulance">BLS ambulance</a>. A patient leaving an ICU often needs an <a href="/services/icu-ambulance">ICU ambulance</a>. See <a href="/blog/choosing-the-right-ambulance-for-long-distance">how to choose the right ambulance</a>.</p>
<h2>Moving to another city</h2>
<p>All of this applies, with more time in the plan. The receiving hospital should know your expected arrival, and be updated along the way. Our <a href="/services/hospital-transfer">hospital-to-hospital transfer page</a> and <a href="/services/outstation-ambulance">outstation routes</a> have more on how these trips are arranged.</p>
`,
  },
];

export const guideBySlug = (s: string) => guides.find((g) => g.slug === s);
