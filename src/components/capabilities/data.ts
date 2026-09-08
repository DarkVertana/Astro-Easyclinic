export type FaqItem = {
	question: string;
	answer: string;
};

export type CapabilitySection = {
	eyebrow: string;
	title: string;
	lede: string;
	items: { title: string; copy: string }[];
};

export type Capability = {
	slug:
		| 'appointment-scheduling-at-easy-clinic'
		| 'patient-engagement-at-easyclinic'
		| 'reports-and-dashboards'
		| 'payor-management'
		| 'revenue-management';
	href: string;
	navLabel: string;
	cardTitle: string;
	cardCopy: string;
	eyebrow: string;
	title: string;
	lede: string;
	note?: string;
	heroFacts: { value: string; label: string }[];
	sections: CapabilitySection[];
	faqs: FaqItem[];
	ctaTitle: string;
	ctaLede: string;
	seoTitle: string;
	seoDescription: string;
};

export const capabilities: Capability[] = [
	{
		slug: 'appointment-scheduling-at-easy-clinic',
		href: '/appointment-scheduling-at-easy-clinic',
		navLabel: 'Appointment scheduling',
		cardTitle: 'Appointment scheduling',
		cardCopy:
			'Walk-ins, timed slots, reminders, waiting room, and multi-location books on one calendar.',
		eyebrow: 'Scheduling',
		title: 'Appointment & resource scheduling that keeps the floor moving',
		lede: 'One book for doctors, rooms, and teleconsults — with reminders that cut no-shows and a waiting room that stays honest.',
		note: 'Walk-ins, fixed slots, and follow-ups in the same day view.',
		heroFacts: [
			{ value: 'One calendar', label: 'Doctors, rooms, slots' },
			{ value: 'Reminders', label: 'WhatsApp, SMS, email' },
			{ value: 'Self-service', label: 'Book, onboard, check in' },
		],
		sections: [
			{
				eyebrow: 'Day control',
				title: 'Centralized appointment management',
				lede: 'View, book, and adjust the day from one dashboard — so reception keeps pace when the clinic gets busy.',
				items: [
					{
						title: 'Single dashboard view',
						copy: 'Monitor appointments, visit status, and resources without hopping between tools.',
					},
					{
						title: 'Real-time updates',
						copy: 'See cancellations, walk-ins, and reschedules as they happen and rebalance the book.',
					},
					{
						title: 'Quick booking',
						copy: 'Book visits in a few clicks with adaptable schedule templates per doctor and hours.',
					},
					{
						title: 'Resource-aware slots',
						copy: 'Coordinate rooms and equipment with the doctor calendar so clashes drop before they reach the floor.',
					},
				],
			},
			{
				eyebrow: 'Attendance',
				title: 'Automated reminders that reduce no-shows',
				lede: 'Reach patients on the channel they actually read — and know who acknowledged.',
				items: [
					{
						title: 'Multi-channel reminders',
						copy: 'Send SMS, email, WhatsApp, or in-app nudges before the visit.',
					},
					{
						title: 'Customizable timing',
						copy: 'Schedule reminders days or hours ahead to match how your specialty books.',
					},
					{
						title: 'Acknowledgment tracking',
						copy: 'See who confirmed so reception can chase the right gaps — not every name on the list.',
					},
				],
			},
			{
				eyebrow: 'Waiting room',
				title: 'Queue status patients can trust',
				lede: 'Keep the waiting room calm with live status, wait alerts, and fair prioritization.',
				items: [
					{
						title: 'Real-time queue status',
						copy: 'Show where each patient sits in the day so reception spends less time fielding “how long?” questions.',
					},
					{
						title: 'Wait-time alerts',
						copy: 'Push updates when the schedule slips so patients can adjust without crowding the desk.',
					},
					{
						title: 'Queue prioritization',
						copy: 'Order by clinical need or appointment type without losing the overall flow.',
					},
				],
			},
			{
				eyebrow: 'Self-service',
				title: 'Let patients book, onboard, and check in',
				lede: 'Move intake off the counter so staff focus on the people already in the clinic.',
				items: [
					{
						title: 'Online appointment booking',
						copy: 'Patients pick available slots from your portal or app — front desk stops retyping the same call.',
					},
					{
						title: 'Pre-visit onboarding',
						copy: 'Custom intake forms complete before arrival so check-in is confirmation, not paperwork.',
					},
					{
						title: 'Remote check-in',
						copy: 'Patients announce arrival from their phone and join the queue without a second line at reception.',
					},
				],
			},
			{
				eyebrow: 'Telehealth',
				title: 'Video consults on the same appointment book',
				lede: 'Schedule remote visits beside in-clinic slots, collect fees online, and skip third-party meeting tools.',
				items: [
					{
						title: 'Built-in video & chat',
						copy: 'Doctors and patients join from a browser on computer or phone — no extra apps to install.',
					},
					{
						title: 'Online fee collection',
						copy: 'Take payment with the teleconsult booking so the till stays tied to the visit.',
					},
					{
						title: 'Same day view',
						copy: 'Remote and on-site appointments share one dashboard, status, and billing path.',
					},
				],
			},
			{
				eyebrow: 'Networks',
				title: 'Multi-location scheduling without five calendars',
				lede: 'Chains and multi-site groups keep one scheduling standard while every branch stays visible.',
				items: [
					{
						title: 'Cross-location visibility',
						copy: 'View and manage appointments across branches from a central book.',
					},
					{
						title: 'Consistent standards',
						copy: 'Shared templates and rules keep the patient experience uniform from site to site.',
					},
					{
						title: 'Resource allocation',
						copy: 'Share doctors and rooms across locations when the day demands it.',
					},
					{
						title: 'Day-end clarity',
						copy: 'Visit tracking, one-click billing from the appointment screen, and end-of-day summaries for the team.',
					},
				],
			},
		],
		faqs: [
			{
				question: 'Can EasyClinic handle walk-ins and fixed slots together?',
				answer:
					'Yes. Walk-ins, timed appointments, follow-ups, and teleconsults sit on one calendar with a shared waiting-room status.',
			},
			{
				question: 'Do appointment reminders work on WhatsApp?',
				answer:
					'Yes. Reminders can go out on WhatsApp, SMS, and email so patients get the nudge on the channel they already use.',
			},
			{
				question: 'Is online self-booking included?',
				answer:
					'Patients can book, complete intake forms, and check in digitally — reducing phone tag and counter queues.',
			},
		],
		ctaTitle: 'See scheduling on your clinic calendar',
		ctaLede:
			'Book a demo and we will map slots, reminders, and waiting-room flow to how your front desk already works.',
		seoTitle: 'Appointment Scheduling Software for Clinics — EasyClinic',
		seoDescription:
			'Clinic appointment scheduling with walk-ins, reminders, waiting room, self-booking, teleconsults, and multi-location calendars — built into EasyClinic EMR.',
	},
	{
		slug: 'patient-engagement-at-easyclinic',
		href: '/patient-engagement-at-easyclinic',
		navLabel: 'Patient engagement',
		cardTitle: 'Patient engagement',
		cardCopy:
			'Portal, mobile app, WhatsApp outreach, feedback, and loyalty — without a second stack.',
		eyebrow: 'Engagement',
		title: 'Patient engagement that stays beside the EMR',
		lede: 'Portal and app access, enrollment links, teleconsults, feedback, and personalized WhatsApp / SMS — so retention is a workflow, not a campaign afterthought.',
		heroFacts: [
			{ value: 'Portal & app', label: 'Records & booking' },
			{ value: 'WhatsApp', label: 'Rx, reminders, forms' },
			{ value: 'Feedback', label: 'Ratings that reach HQ' },
		],
		sections: [
			{
				eyebrow: 'Portal & app',
				title: 'Give patients 24/7 access without flooding reception',
				lede: 'A secure patient portal and mobile app for records, appointments, payments, and medication requests.',
				items: [
					{
						title: 'Self-serve appointments',
						copy: 'Patients book or join a walk-in queue online — fewer missed calls and clearer day lists.',
					},
					{
						title: 'Records & plans',
						copy: 'Share visit history and treatment plans so patients arrive informed and trust stays high.',
					},
					{
						title: 'Secure messaging',
						copy: 'Prescription refill requests and care questions land in the right workflow instead of personal phones.',
					},
					{
						title: 'Payments online',
						copy: 'Collect fees and outstanding balances without another trip to the counter.',
					},
				],
			},
			{
				eyebrow: 'Onboarding',
				title: 'Custom forms and enrollment links',
				lede: 'Registration that starts on the patient’s phone — not a clipboard at the desk.',
				items: [
					{
						title: 'Clinic-specific forms',
						copy: 'Build intake and consent forms that match your specialties and protocols.',
					},
					{
						title: 'SMS & WhatsApp links',
						copy: 'Send enrollment links so new patients complete details before the first visit.',
					},
					{
						title: 'Mobile-first completion',
						copy: 'Patients finish registration anywhere; staff stop retyping paper into the EMR.',
					},
					{
						title: 'Less manual entry',
						copy: 'Cleaner data at registration means cleaner billing and fewer chart gaps later.',
					},
				],
			},
			{
				eyebrow: 'Teleconsult',
				title: 'Remote visits with prescriptions that land instantly',
				lede: 'Video and chat in the product, online fees, and Rx delivery on WhatsApp, SMS, or email.',
				items: [
					{
						title: 'Browser-based video',
						copy: 'No third-party meeting app — doctors and patients join from phone or computer.',
					},
					{
						title: 'Fee collection built in',
						copy: 'Book the teleconsult and take payment in the same flow.',
					},
					{
						title: 'Instant Rx delivery',
						copy: 'Send prescriptions after the visit with a clear remote-consult disclaimer for compliance.',
					},
				],
			},
			{
				eyebrow: 'Feedback',
				title: 'Patient feedback you can act on',
				lede: 'Surveys, ratings, and forms that surface what to fix — and what to celebrate.',
				items: [
					{
						title: 'Structured insights',
						copy: 'Collect satisfaction data in formats your team can review weekly, not once a year.',
					},
					{
						title: 'Continuous improvement',
						copy: 'Spot service gaps early across locations before reviews go public.',
					},
					{
						title: 'Trust & loyalty',
						copy: 'Closing the loop on feedback shows patients their voice matters — and they come back.',
					},
				],
			},
			{
				eyebrow: 'Outreach',
				title: 'Personalized communication at clinic scale',
				lede: 'WhatsApp, email, SMS, and notifications tuned to preferences — automated without sounding robotic.',
				items: [
					{
						title: 'Channel preference',
						copy: 'Reach patients where they respond so reminders and updates actually get read.',
					},
					{
						title: 'Workflow automation',
						copy: 'Trigger messages from visits, follow-ups, and care plans without a separate marketing tool.',
					},
					{
						title: 'Retention loops',
						copy: 'Stay top-of-mind for chronic care and review visits without manual calling lists.',
					},
				],
			},
			{
				eyebrow: 'Loyalty',
				title: 'Rewards that encourage regular care',
				lede: 'Discounts, points, and offers for adherence and return visits — tied to the same patient record.',
				items: [
					{
						title: 'Encourage follow-ups',
						copy: 'Incentivize scheduled reviews so chronic care does not drift.',
					},
					{
						title: 'Build long-term loyalty',
						copy: 'Reward commitment to your clinic instead of competing only on walk-in price.',
					},
					{
						title: 'Engage between visits',
						copy: 'Keep patients active in their care plan with tangible reasons to stay connected.',
					},
				],
			},
		],
		faqs: [
			{
				question: 'Does EasyClinic include a patient portal and mobile app?',
				answer:
					'Yes. Patients can access records, book visits, pay, and manage medication requests through the portal and app.',
			},
			{
				question: 'Can we send forms and enrollment links on WhatsApp?',
				answer:
					'Yes. Custom forms and enrollment links can be shared over SMS and WhatsApp so registration starts before the visit.',
			},
			{
				question: 'Is teleconsultation part of patient engagement?',
				answer:
					'Video consults, online fees, and instant prescription delivery sit in the same engagement and scheduling stack.',
			},
		],
		ctaTitle: 'Engage patients without another vendor stack',
		ctaLede:
			'See portal, WhatsApp, feedback, and teleconsult workflows on a demo tailored to your clinic.',
		seoTitle: 'Patient Engagement Software for Clinics — EasyClinic',
		seoDescription:
			'Patient engagement for clinics — portal and app, WhatsApp forms, teleconsults, feedback, and loyalty programs built into EasyClinic EMR.',
	},
	{
		slug: 'reports-and-dashboards',
		href: '/reports-and-dashboards',
		navLabel: 'Reports & dashboards',
		cardTitle: 'Reports & dashboards',
		cardCopy:
			'Real-time clinic KPIs, automated reports, and data-warehouse paths for Power BI when you outgrow PDFs.',
		eyebrow: 'Analytics',
		title: 'Reports and dashboards that answer the day — not last month',
		lede: 'Real-time visualization, 100+ clinical and financial views, and optional ETL into a warehouse for Power BI — so leadership decides while the clinic is still open.',
		heroFacts: [
			{ value: '100+ views', label: 'Clinical & finance' },
			{ value: 'Real-time', label: 'KPIs while open' },
			{ value: 'Power BI ready', label: 'Warehouse & ETL' },
		],
		sections: [
			{
				eyebrow: 'Visibility',
				title: 'Real-time data you can act on in minutes',
				lede: 'Patient statistics, financial snapshots, and operational metrics without waiting for a spreadsheet rebuild.',
				items: [
					{
						title: 'Customizable dashboards',
						copy: 'Pin the KPIs that matter — outcomes, utilization, revenue — and drop the noise.',
					},
					{
						title: 'Automated reporting',
						copy: 'Generate and distribute reports on a schedule so teams always see the latest numbers.',
					},
					{
						title: 'Role-aware access',
						copy: 'Give doctors, managers, and HQ the views they need — nothing more.',
					},
				],
			},
			{
				eyebrow: 'Intelligence',
				title: 'From EMR data to actionable intelligence',
				lede: 'Define ETL paths with Azure pipelines when you need enterprise-grade consolidation and BI.',
				items: [
					{
						title: 'End-to-end data integration',
						copy: 'Consolidate databases, files, and APIs into a warehouse or lake with Azure Data Factory–style pipelines.',
					},
					{
						title: 'Power BI visual insights',
						copy: 'Feed cleaned clinic data into Power BI for charts leadership already knows how to share.',
					},
					{
						title: 'Reliable, consistent data',
						copy: 'Reduce duplicates and mismatches so reports stay trustworthy across sites.',
					},
				],
			},
			{
				eyebrow: 'Library',
				title: 'Flexible reports across operations',
				lede: 'Detail patient demographics, revenue streams, inventory, and clinical activity in formats your team can use.',
				items: [
					{
						title: 'Deep report library',
						copy: 'More than 100 graphical dashboards and detailed reports spanning clinical, admin, inventory, and finance.',
					},
					{
						title: 'AI-assisted analysis',
						copy: 'Surface trends and opportunities instead of exporting raw tables every Friday.',
					},
					{
						title: 'Encrypted by design',
						copy: 'Keep sensitive reporting behind the same security posture as the EMR.',
					},
				],
			},
			{
				eyebrow: 'Operations',
				title: 'Efficiency that scales with the network',
				lede: 'Automate compilation so staff stay with patients — and add sites without rebuilding analytics.',
				items: [
					{
						title: 'Less manual compilation',
						copy: 'Replace month-end spreadsheet hunts with live panels and scheduled packs.',
					},
					{
						title: 'Performance monitoring',
						copy: 'Watch utilization and revenue goals continuously, not only at board meetings.',
					},
					{
						title: 'Multi-platform access',
						copy: 'Open dashboards from desktop, tablet, or phone when you are off-site.',
					},
					{
						title: 'Built to grow',
						copy: 'Add clinics and users as the network expands — same reporting foundation.',
					},
				],
			},
		],
		faqs: [
			{
				question: 'How many dashboards does EasyClinic include?',
				answer:
					'EasyClinic ships with a large library of graphical dashboards and detailed reports covering clinical, administrative, inventory, and financial data — over 100 views in typical deployments.',
			},
			{
				question: 'Can we connect EasyClinic data to Power BI?',
				answer:
					'Yes. Enterprise setups can use ETL / data-warehouse paths so refined clinic data feeds Power BI and other BI tools.',
			},
			{
				question: 'Are reports available in real time?',
				answer:
					'Operational and financial dashboards refresh with live clinic activity so leaders can act during the day, not after month-end.',
			},
		],
		ctaTitle: 'See your clinic KPIs on a live dashboard',
		ctaLede:
			'Book a demo and we will walk through the reports your managers and doctors ask for every week.',
		seoTitle: 'Clinic Reports & Dashboards Software — EasyClinic',
		seoDescription:
			'Clinic reports and dashboards with real-time KPIs, 100+ views, automated reporting, and Power BI–ready data warehouse options in EasyClinic.',
	},
	{
		slug: 'payor-management',
		href: '/payor-management',
		navLabel: 'Payor management',
		cardTitle: 'Payor management',
		cardCopy:
			'Onboard insurers and corporates, encode coverage rules, and submit cleaner claims from the visit.',
		eyebrow: 'Payors',
		title: 'Payor management that keeps claims clean',
		lede: 'Onboard insurers, corporates, and TPAs once — then apply coverage, subscription categories, and patient links automatically so billing stops guessing.',
		heroFacts: [
			{ value: 'Fast setup', label: 'Payors in minutes' },
			{ value: 'Coverage rules', label: 'Fewer rejections' },
			{ value: 'Auto-link', label: 'Patient to plan' },
		],
		sections: [
			{
				eyebrow: 'Setup',
				title: 'Add payors in minutes, not spreadsheets',
				lede: 'Create payor profiles with rates, contract terms, and covered services — then reuse them on every visit.',
				items: [
					{
						title: 'Quick payor onboarding',
						copy: 'Capture billing rates, coverage, and terms once; apply them across patient interactions automatically.',
					},
					{
						title: 'Customized payor profiles',
						copy: 'Document services covered, payment terms, and exclusions so staff are not reinventing each claim.',
					},
					{
						title: 'Less repetitive entry',
						copy: 'Speed up admin by removing copy-paste setup every time a corporate plan arrives.',
					},
				],
			},
			{
				eyebrow: 'Invoicing',
				title: 'Invoices that follow payor rules',
				lede: 'Generate claims from predefined contracts so reimbursements move faster with fewer rejections.',
				items: [
					{
						title: 'Rule-based billing',
						copy: 'Pre-defined contracts drive invoice lines — cutting inconsistency before submission.',
					},
					{
						title: 'Faster reimbursement cycles',
						copy: 'Cleaner, quicker claims improve cash flow without adding night-shift billing work.',
					},
					{
						title: 'Fewer manual errors',
						copy: 'Automation replaces hand-built invoices that break when a code or rate drifts.',
					},
				],
			},
			{
				eyebrow: 'Plans',
				title: 'Flexible subscription categories per payor',
				lede: 'Model different coverage types and benefit limits without a tangle of side spreadsheets.',
				items: [
					{
						title: 'Customizable plans',
						copy: 'Services, coverage levels, and restrictions mirror each payor contract.',
					},
					{
						title: 'Benefit tracking',
						copy: 'Apply service limits and payment rates automatically as care is delivered.',
					},
					{
						title: 'Clinic-shaped configuration',
						copy: 'Tune categories to your specialties and patient mix — not a one-size hospital template.',
					},
				],
			},
			{
				eyebrow: 'Coverage',
				title: 'Validate coverage before the claim leaves',
				lede: 'Assign coverage categories, surface what is billable, and stop uncovered services from becoming denials.',
				items: [
					{
						title: 'Specific coverage assignment',
						copy: 'Encode exclusions and service limits for corporate plans and insurers alike.',
					},
					{
						title: 'Billing transparency',
						copy: 'Staff see what a patient’s plan covers at the point of care — fewer awkward surprises.',
					},
					{
						title: 'Rejection avoidance',
						copy: 'Real-time validation helps you avoid submitting claims for uncovered services.',
					},
				],
			},
			{
				eyebrow: 'Patients',
				title: 'Link patients to the right payor from registration',
				lede: 'Correct plan association from day one — with easy updates when coverage changes.',
				items: [
					{
						title: 'Automatic patient–payor linking',
						copy: 'Registration attaches the right rules to the billing cycle immediately.',
					},
					{
						title: 'Accurate claim submission',
						copy: 'Coverage details travel with the visit so acceptance rates improve.',
					},
					{
						title: 'Real-time association updates',
						copy: 'Change a patient’s plan when life or employer coverage shifts — without rebuilding the chart.',
					},
				],
			},
		],
		faqs: [
			{
				question: 'Can EasyClinic manage multiple insurance and corporate payors?',
				answer:
					'Yes. Add insurers, corporate tie-ups, and TPAs with customized profiles, rates, and coverage rules in one module.',
			},
			{
				question: 'How does payor management reduce claim rejections?',
				answer:
					'Coverage validation and rule-based invoicing help ensure only covered services are billed, with the correct plan linked to each patient.',
			},
			{
				question: 'Is payor management only for large hospitals?',
				answer:
					'No. Busy clinics and OPD floors that juggle mixed payors benefit as soon as manual claim prep starts to lag the day.',
			},
		],
		ctaTitle: 'Cleaner claims start at the visit',
		ctaLede:
			'Book a demo of EasyClinic payor management on your insurers, corporates, and TPA mix.',
		seoTitle: 'Insurance & Payor Management for Clinics — EasyClinic',
		seoDescription:
			'Clinic payor management for insurers, corporates, and TPAs — fast onboarding, coverage rules, automated invoicing, and patient–plan linking in EasyClinic.',
	},
	{
		slug: 'revenue-management',
		href: '/revenue-management',
		navLabel: 'Revenue management',
		cardTitle: 'Revenue management',
		cardCopy:
			'Orders to invoices, dynamic price lists, cash registers, payors, and financial dashboards in one loop.',
		eyebrow: 'Revenue',
		title: 'Revenue management that closes the till cleanly',
		lede: 'Automate order-to-invoice, apply payor and price-list rules, control cash registers, and watch financial dashboards — so cash flow keeps up with care.',
		heroFacts: [
			{ value: 'Order → invoice', label: 'Less rekeying' },
			{ value: 'Dynamic prices', label: 'Payor & location lists' },
			{ value: 'Day close', label: 'Cash & finance reports' },
		],
		sections: [
			{
				eyebrow: 'Orders',
				title: 'Invoice automation from real work orders',
				lede: 'Lab orders, procedures, and inventory usage become invoice lines without a second data entry pass.',
				items: [
					{
						title: 'Real-time work-order tracking',
						copy: 'Monitor orders as they progress and generate corresponding invoice lines automatically.',
					},
					{
						title: 'Customized invoicing rules',
						copy: 'Payor contracts and billing rules drive accuracy so claims and patient bills match the visit.',
					},
					{
						title: 'Orders–inventory sync',
						copy: 'Product usage reflects in stock and on the invoice together — fewer leakage gaps.',
					},
					{
						title: 'Faster reimbursement',
						copy: 'Automated invoicing gets claims out sooner and improves cash flow.',
					},
				],
			},
			{
				eyebrow: 'Payors',
				title: 'Payor and claim streamlining in the revenue loop',
				lede: 'The same payor profiles that protect coverage also keep revenue predictable.',
				items: [
					{
						title: 'Rapid payor setup',
						copy: 'Onboard insurers and corporates with rates and terms applied across visits.',
					},
					{
						title: 'Subscription categories',
						copy: 'Model benefit levels and limits without parallel spreadsheets.',
					},
					{
						title: 'Coverage at the point of care',
						copy: 'Validate what is billable before the claim — not after a denial.',
					},
					{
						title: 'Patient–plan linking',
						copy: 'Correct payor association from registration keeps every invoice honest.',
					},
				],
			},
			{
				eyebrow: 'Pricing',
				title: 'Dynamic price lists for every segment',
				lede: 'Context-based pricelists for customers, payors, and locations — with discounts you can measure.',
				items: [
					{
						title: 'Targeted discounts & offers',
						copy: 'Personalize pricing for segments without losing control of margin.',
					},
					{
						title: 'Automated price updates',
						copy: 'New rates appear instantly in billing so the till never lags the price book.',
					},
					{
						title: 'Revenue impact analysis',
						copy: 'See how pricing strategies move overall revenue before you lock them in.',
					},
				],
			},
			{
				eyebrow: 'Cash',
				title: 'Cash registers with clear accountability',
				lede: 'Track inflows and outflows, lock access by role, and close the day with a report you can trust.',
				items: [
					{
						title: 'Automated cash reconciliation',
						copy: 'Reduce the evening hunt for missing cash movements.',
					},
					{
						title: 'Role-based access',
						copy: 'Permissions keep cash handling secure and auditable.',
					},
					{
						title: 'End-of-day reporting',
						copy: 'Snapshot transactions for the clinic or the whole organization.',
					},
				],
			},
			{
				eyebrow: 'Finance views',
				title: 'Financial reports and dashboards on demand',
				lede: 'Customizable finance panels, automated packs, and day-close summaries for operators and HQ.',
				items: [
					{
						title: 'Custom finance dashboards',
						copy: 'Focus on the metrics your CFO and clinic managers actually review.',
					},
					{
						title: 'Secure, role-based access',
						copy: 'Protect financial data with the same access discipline as clinical records.',
					},
					{
						title: 'Automated distribution',
						copy: 'Push the latest packs to stakeholders without a manual export ritual.',
					},
				],
			},
		],
		faqs: [
			{
				question: 'Does revenue management include billing and payors?',
				answer:
					'Yes. Order-to-invoice automation, payor rules, dynamic pricing, cash registers, and financial dashboards work as one revenue loop.',
			},
			{
				question: 'Can we run different price lists by location or payor?',
				answer:
					'Context-based pricelists support customer segments, payors, and location-based pricing with instant billing updates.',
			},
			{
				question: 'How does EasyClinic help with day-end cash close?',
				answer:
					'Cash register controls, automated reconciliation, and end-of-day financial reports give a clear snapshot for the clinic or organization.',
			},
		],
		ctaTitle: 'Tighten revenue without slowing the front desk',
		ctaLede:
			'Book a demo of EasyClinic revenue management on your price lists, payors, and day-close workflow.',
		seoTitle: 'Clinic Revenue Management Software — EasyClinic',
		seoDescription:
			'Clinic revenue management — order-to-invoice automation, payor claims, dynamic pricing, cash registers, and financial dashboards in EasyClinic.',
	},
];

export const capabilityBySlug = Object.fromEntries(capabilities.map((c) => [c.slug, c])) as Record<
	Capability['slug'],
	Capability
>;

export const capabilitySlugs = capabilities.map((c) => c.slug);
