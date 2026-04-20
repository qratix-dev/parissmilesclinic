export interface ServiceDetail {
  id: string
  longDescription: string
  benefits: string[]
  process: { step: string; detail: string }[]
  duration: string
  recovery: string
  startingPrice: string
}

export const serviceDetails: ServiceDetail[] = [
  {
    id: 'implantation',
    longDescription:
      'Dental implants are the gold standard for replacing missing teeth. A small titanium post is surgically placed into the jawbone, acting as an artificial root. Over time, the implant fuses with the bone through a process called osseointegration, creating a permanent and stable foundation for a lifelike crown. Unlike dentures or bridges, implants do not rely on neighbouring teeth and preserve the natural bone structure. At Paris Smiles Clinic, we use premium brands including Osstem®, Nobel®, Straumann BLX®, and MegaGen Anyridge® to ensure the best outcomes for every patient.',
    benefits: [
      'Natural look, feel, and function',
      'Permanent — lasts a lifetime with proper care',
      'Preserves jawbone and facial structure',
      'No adhesives or removal required',
      'Protects adjacent healthy teeth',
    ],
    process: [
      { step: 'Consultation & Imaging', detail: 'Digital X-rays and 3D CT scan to plan placement precisely.' },
      { step: 'Implant Placement', detail: 'Titanium post inserted under local anaesthetic — usually painless.' },
      { step: 'Healing Period', detail: '8–12 weeks for osseointegration (bone bonding).' },
      { step: 'Crown Attachment', detail: 'Custom ceramic crown fitted for a perfect bite and appearance.' },
    ],
    duration: '1–2 visits (same-day crowns available)',
    recovery: '2–5 days mild discomfort',
    startingPrice: 'From £435 per implant',
  },
  {
    id: 'dental-veneer',
    longDescription:
      'Dental veneers are ultra-thin porcelain shells bonded to the front surface of your teeth to transform your smile. They correct discolouration, chips, uneven spacing, and minor misalignment without extensive drilling. At Paris Smiles Clinic, we offer E.MAX® and Zirconium Porcelain veneers, as well as our exclusive LD Premium Non-Prep Lumineers — a minimally invasive option that preserves all your natural tooth structure. Each veneer is individually crafted and shade-matched by our dental technicians to achieve a natural, radiant result.',
    benefits: [
      'Dramatic smile transformation in just days',
      'Stain-resistant porcelain lasts 10–15 years',
      'Minimal tooth preparation required',
      'Covers chips, cracks, and discolouration',
      'Custom colour matched to your complexion',
    ],
    process: [
      { step: 'Smile Design Consultation', detail: 'Digital smile preview so you see the result before treatment.' },
      { step: 'Tooth Preparation', detail: 'A thin layer is removed from the tooth surface (or none for Lumineers).' },
      { step: 'Impressions & Fabrication', detail: 'Your veneers are crafted by our in-house technicians.' },
      { step: 'Bonding', detail: 'Veneers are permanently bonded and polished for a seamless finish.' },
    ],
    duration: '3–5 days',
    recovery: 'No downtime',
    startingPrice: 'From £240 per veneer',
  },
  {
    id: 'dental-crown',
    longDescription:
      'A dental crown is a custom-made cap that fits over a damaged, decayed, or weakened tooth, restoring it to its original shape, strength, and appearance. Crowns are also used to protect teeth after root canal treatment and to cover dental implants. We offer Metal Porcelain, Zirconium Porcelain, and E.MAX® crowns — each selected based on the location of the tooth and your aesthetic goals. Zirconium crowns are our most popular choice for their exceptional strength and natural translucency.',
    benefits: [
      'Restores heavily damaged or decayed teeth',
      'Stronger than natural enamel — highly durable',
      'Natural translucency with Zirconium and E.MAX®',
      'Protects teeth after root canal treatment',
      'Seamlessly colour-matched to surrounding teeth',
    ],
    process: [
      { step: 'Assessment', detail: 'Digital scans and shade mapping to plan your crown.' },
      { step: 'Tooth Preparation', detail: 'The tooth is shaped to accept the crown; a temporary is placed.' },
      { step: 'Crown Fabrication', detail: 'Permanent crown crafted in our lab to precise specifications.' },
      { step: 'Fitting & Bonding', detail: 'Crown cemented and adjusted for a perfect bite.' },
    ],
    duration: '2–3 days',
    recovery: 'Minimal — normal function same day',
    startingPrice: 'From £140 per crown',
  },
  {
    id: 'teeth-whitening',
    longDescription:
      'Professional teeth whitening at Paris Smiles Clinic delivers dramatically whiter teeth in a single appointment. Our laser whitening treatment uses a clinical-strength bleaching gel activated by advanced LED or laser light, breaking down deep stains from coffee, tea, wine, and tobacco. Unlike over-the-counter kits, our professional treatment is customised to your sensitivity level and desired shade — achieving up to 8–10 shades whiter results safely. We also offer a take-home whitening kit for maintenance between professional treatments.',
    benefits: [
      'Up to 8–10 shades whiter in one session',
      'Safe, supervised, and pain-free',
      'Results last 1–2 years with good maintenance',
      'Removes deep stains from food and beverages',
      'Immediate confidence boost — same-day results',
    ],
    process: [
      { step: 'Shade Assessment', detail: 'Your current shade is recorded so we can measure results.' },
      { step: 'Gum Protection', detail: 'A protective barrier is applied to your gums and lips.' },
      { step: 'Gel Application & Activation', detail: 'Whitening gel applied and activated with laser/LED light (3 × 15 min rounds).' },
      { step: 'Final Shade Check', detail: 'Results compared and aftercare instructions provided.' },
    ],
    duration: '1 appointment (approx. 90 mins)',
    recovery: 'No downtime — avoid staining foods for 48 hrs',
    startingPrice: 'From £250',
  },
  {
    id: 'sinus-lifting',
    longDescription:
      'A sinus lift (also called sinus augmentation) is a surgical procedure that adds bone to the upper jaw in the area of the molars and premolars. It is often necessary when there is insufficient bone height in the upper jaw or when the sinuses are too close to the jaw for dental implants to be placed. During the procedure, the sinus membrane is gently lifted upward and bone graft material is inserted into the space. Over time, the graft integrates with your existing bone, creating a solid foundation for implants. This procedure is performed under local anaesthesia and is well-tolerated by most patients.',
    benefits: [
      'Enables implant placement for patients previously ineligible',
      'Uses biocompatible bone graft material',
      'High long-term success rate',
      'Preserves facial structure and prevents bone loss',
      'Performed under local anaesthesia — comfortable procedure',
    ],
    process: [
      { step: 'CT Scan & Planning', detail: '3D imaging to measure sinus dimensions and plan the approach.' },
      { step: 'Surgical Access', detail: 'A small opening is made in the gum and bone to access the sinus.' },
      { step: 'Membrane Elevation', detail: 'The sinus membrane is gently lifted to create space for grafting.' },
      { step: 'Bone Grafting', detail: 'Bone graft material is packed into the space; the site is sutured.' },
      { step: 'Healing & Implant Placement', detail: '4–6 months healing before implants are placed.' },
    ],
    duration: '1 surgical appointment',
    recovery: '3–5 days swelling; 4–6 months before implant',
    startingPrice: 'From £225',
  },
  {
    id: 'bone-grafting',
    longDescription:
      'Bone grafting is a procedure used to rebuild or augment bone that has been lost due to tooth extraction, gum disease, or trauma. Without adequate bone volume, dental implants cannot be securely placed. Our surgeons use advanced grafting techniques and high-quality biocompatible materials to stimulate new bone growth and restore the jaw\'s natural architecture. Once the graft has healed and the new bone has formed, implants can be placed with confidence. The procedure is performed under local anaesthesia and is typically very well tolerated.',
    benefits: [
      'Restores bone lost from extractions or disease',
      'Makes implant placement possible in previously unsuitable sites',
      'Biocompatible materials — safe and effective',
      'Prevents further bone loss and facial collapse',
      'Improves long-term implant stability and longevity',
    ],
    process: [
      { step: 'Assessment & Planning', detail: 'CT scan to measure bone deficiency and select the right graft type.' },
      { step: 'Graft Placement', detail: 'Bone graft material packed into the deficient area and covered with a membrane.' },
      { step: 'Suturing', detail: 'The site is closed and allowed to heal undisturbed.' },
      { step: 'Healing Phase', detail: '3–6 months for new bone to form and mature.' },
      { step: 'Implant Placement', detail: 'Once sufficient bone volume is confirmed, implants are placed.' },
    ],
    duration: '1 surgical appointment',
    recovery: '3–5 days; 3–6 months before implant',
    startingPrice: 'From £100 per 1cc',
  },
]
