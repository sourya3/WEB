export interface CourseModule {
  title: string;
  description: string;
}

export interface CourseStep {
  step: number;
  title: string;
  description: string;
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface CourseData {
  slug: string;
  name: string;
  category: string;
  categoryType: 'skill' | 'language';
  tagline: string;
  whatsappMessage: string;
  duration: string;
  batchSize: string;
  format: string;
  certificate: string;
  whyCourse: string;
  outcomes: { icon: string; text: string }[];
  modules: CourseModule[];
  steps: CourseStep[];
  whoIsItFor: string[];
  faqs: CourseFAQ[];
  relatedSlugs: string[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

export const ALL_COURSES: CourseData[] = [
  {
    slug: 'ai-course',
    name: 'AI Tools Course',
    category: 'Skill Course',
    categoryType: 'skill',
    tagline: 'Master the AI tools that are already replacing jobs — before they replace yours.',
    whatsappMessage: "Hi%2C%20I'm%20interested%20in%20the%20AI%20Tools%20Course%20at%20Uniq%20Turn.%20Please%20share%20details.",
    duration: '6 Weeks',
    batchSize: 'Max 15 Students',
    format: 'In-Person / Hybrid',
    certificate: 'Certificate Included',
    whyCourse:
      'AI is no longer a future technology — it is already transforming how businesses operate, how content is created, and how work gets done. Professionals who can use AI tools effectively are being hired faster, promoted sooner, and paid more. This course gives you hands-on experience with the most in-demand AI tools so you can apply them immediately in your work, freelance projects, or business.',
    outcomes: [
      { icon: '✦', text: 'Use ChatGPT and advanced prompting to automate repetitive tasks and generate high-quality content' },
      { icon: '✦', text: 'Create professional images and visuals using AI image generation tools like Midjourney and DALL·E' },
      { icon: '✦', text: 'Build no-code AI automation workflows that save hours of manual work every week' },
      { icon: '✦', text: 'Confidently apply AI tools in real freelance, business, and job contexts' },
    ],
    modules: [
      {
        title: 'Module 1: Introduction to AI & the Modern Landscape',
        description: 'Understand what AI is, how it works at a practical level, and which tools matter most right now. We map the AI ecosystem so you know exactly where to focus your energy.',
      },
      {
        title: 'Module 2: ChatGPT & Advanced Prompt Engineering',
        description: 'Go beyond basic prompts. Learn structured prompting frameworks, role-playing techniques, chain-of-thought prompting, and how to get consistent, professional-grade outputs for writing, research, and business tasks.',
      },
      {
        title: 'Module 3: AI Image & Video Generation',
        description: 'Create stunning visuals with Midjourney, DALL·E, and Stable Diffusion. Learn prompt crafting for images, style control, inpainting, and how to use AI-generated visuals in real projects.',
      },
      {
        title: 'Module 4: AI for Content & Marketing',
        description: 'Use AI to write social media posts, blog articles, ad copy, email campaigns, and video scripts at scale. Learn how to maintain your brand voice while leveraging AI speed.',
      },
      {
        title: 'Module 5: Workflow Automation with AI',
        description: 'Build no-code automation pipelines using tools like Make (Integromat) and Zapier combined with AI. Automate lead follow-ups, content scheduling, data processing, and more.',
      },
      {
        title: 'Module 6: Real-World Projects & Portfolio',
        description: 'Apply everything you have learned in a capstone project. Build a portfolio piece that demonstrates your AI skills to employers or clients, and get feedback from instructors.',
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Enroll via WhatsApp',
        description: 'Message us on WhatsApp to confirm your spot. We will share the batch schedule, fee details, and everything you need to get started.',
      },
      {
        step: 2,
        title: 'Attend Hands-On Classes',
        description: 'Join small-group sessions where you practice with real AI tools on real tasks — not just theory. Every class includes live demos and guided exercises.',
      },
      {
        step: 3,
        title: 'Complete Your Project',
        description: 'Build a real project using the AI tools you have learned. Instructors provide feedback so your work is portfolio-ready.',
      },
      {
        step: 4,
        title: 'Graduate with Your Certificate',
        description: 'Receive your Uniq Turn certificate and leave with a portfolio, practical skills, and the confidence to apply AI in your career immediately.',
      },
    ],
    whoIsItFor: [
      'Complete beginners who have heard about AI but do not know where to start',
      'Working professionals who want to use AI to work faster and stand out at their job',
      'Freelancers and entrepreneurs looking to automate tasks and scale their output',
      'Content creators, marketers, and designers who want AI to supercharge their workflow',
      'Students who want to future-proof their career before entering the job market',
    ],
    faqs: [
      {
        question: 'Do I need any prior experience or coding knowledge?',
        answer: 'No coding or technical background is required. This course is designed for complete beginners. If you can use a smartphone and browse the internet, you have everything you need to start.',
      },
      {
        question: 'How long is the course and how are classes scheduled?',
        answer: 'The course runs for 6 weeks with classes held multiple times per week. Exact class timings are shared when you enroll. We offer morning and evening batches to fit different schedules.',
      },
      {
        question: 'Is there a certificate at the end?',
        answer: 'Yes. Upon completing the course and your capstone project, you receive an official Uniq Turn certificate that you can add to your CV, LinkedIn profile, or portfolio.',
      },
      {
        question: 'What is the fee, and are there payment plans?',
        answer: 'We keep our fees accessible and offer flexible payment options. Please message us on WhatsApp for the current fee structure and any available installment plans — we are happy to work with your budget.',
      },
      {
        question: 'What happens after I finish the course?',
        answer: 'Graduates receive ongoing support through our alumni community, access to updated course materials as AI tools evolve, and job/freelance referrals where available. Many of our graduates have gone on to freelance, get hired, or launch their own AI-powered services.',
      },
    ],
    relatedSlugs: ['video-editing', 'digital-marketing', 'capcut-editing'],
    seo: {
      title: 'AI Tools Course Kathmandu | ChatGPT, Midjourney & Automation | Uniq Turn',
      description: 'Learn AI tools — ChatGPT, Midjourney, automation workflows — at Uniq Turn Kathmandu. No coding needed. 6-week hands-on course with certificate. Enroll today.',
      keywords: 'AI course Kathmandu, ChatGPT course Nepal, AI tools training Kathmandu, artificial intelligence class Nepal, prompt engineering course Kathmandu',
    },
  },
  {
    slug: 'video-editing',
    name: 'Video Editing Course',
    category: 'Skill Course',
    categoryType: 'skill',
    tagline: 'Edit like a professional — from raw footage to client-ready videos in weeks.',
    whatsappMessage: "Hi%2C%20I'm%20interested%20in%20the%20Video%20Editing%20Course%20at%20Uniq%20Turn.%20Please%20share%20details.",
    duration: '8 Weeks',
    batchSize: 'Max 12 Students',
    format: 'In-Person',
    certificate: 'Certificate Included',
    whyCourse:
      'Video content is the most consumed media on the internet, and skilled video editors are in high demand across YouTube channels, social media agencies, corporate brands, and film production. Whether you want to freelance, work for a media company, or create your own content, professional video editing is one of the most valuable and immediately monetizable skills you can learn.',
    outcomes: [
      { icon: '▶', text: 'Edit professional videos using Premiere Pro or DaVinci Resolve from scratch to final export' },
      { icon: '▶', text: 'Apply cinematic color grading to make your footage look polished and professional' },
      { icon: '▶', text: 'Mix and master audio so your videos sound as good as they look' },
      { icon: '▶', text: 'Deliver client-ready exports optimized for YouTube, Instagram, and broadcast' },
    ],
    modules: [
      {
        title: 'Module 1: Foundations of Video Editing',
        description: 'Learn the editing workflow from import to export. Understand timelines, cuts, transitions, and how professional editors think about storytelling through editing.',
      },
      {
        title: 'Module 2: Premiere Pro / DaVinci Resolve Mastery',
        description: 'Deep dive into your chosen editing software. Master the interface, keyboard shortcuts, multicam editing, and advanced timeline techniques used by professional editors.',
      },
      {
        title: 'Module 3: Color Grading & Correction',
        description: 'Learn primary and secondary color correction, LUT application, skin tone matching, and how to create a consistent cinematic look across your entire project.',
      },
      {
        title: 'Module 4: Audio Editing & Sound Design',
        description: 'Clean up dialogue, add music and sound effects, mix levels, and use noise reduction tools. Good audio is what separates amateur videos from professional ones.',
      },
      {
        title: 'Module 5: Motion Graphics & Text',
        description: 'Create lower thirds, title sequences, animated text, and basic motion graphics. Learn to use templates and customize them for client projects.',
      },
      {
        title: 'Module 6: Client Projects & Delivery',
        description: 'Work on real-world style projects — YouTube videos, social media reels, corporate promos. Learn how to manage client feedback, revisions, and final delivery formats.',
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Enroll via WhatsApp',
        description: 'Message us to reserve your seat. We will confirm your batch, share the software setup guide, and answer any questions before your first class.',
      },
      {
        step: 2,
        title: 'Learn by Editing Real Footage',
        description: 'Every class involves hands-on editing with real footage. You will not just watch demos — you will edit alongside the instructor from day one.',
      },
      {
        step: 3,
        title: 'Build Your Portfolio',
        description: 'Complete multiple projects throughout the course — a YouTube video, a social media reel, and a short promo — so you graduate with a real portfolio.',
      },
      {
        step: 4,
        title: 'Get Certified & Start Working',
        description: 'Receive your certificate and leave with the skills, portfolio, and confidence to take on freelance clients or apply for editing roles immediately.',
      },
    ],
    whoIsItFor: [
      'Complete beginners with no editing experience who want to learn from scratch',
      'Content creators who want to edit their own YouTube or social media videos professionally',
      'Aspiring freelancers who want to offer video editing as a service',
      'Marketing professionals who need to produce video content for brands',
      'Anyone who wants to turn a passion for video into a career or income stream',
    ],
    faqs: [
      {
        question: 'Do I need any prior experience?',
        answer: 'No prior experience is needed. We start from the very basics and build up to professional-level editing. You do not need to own a camera — we provide footage to practice with.',
      },
      {
        question: 'How long is the course and how are classes scheduled?',
        answer: 'The course runs for 8 weeks with regular in-person sessions. We offer flexible batch timings — message us on WhatsApp to find a schedule that works for you.',
      },
      {
        question: 'Is there a certificate at the end?',
        answer: 'Yes. You receive an official Uniq Turn certificate upon completing the course and your final project, which you can use to demonstrate your skills to clients or employers.',
      },
      {
        question: 'What is the fee, and are there payment plans?',
        answer: 'Fees are kept affordable and installment options are available. Please message us on WhatsApp for current pricing — we are happy to discuss options that fit your situation.',
      },
      {
        question: 'What happens after I finish the course?',
        answer: 'Graduates leave with a portfolio of real projects, a certificate, and access to our alumni network. Many graduates go on to freelance immediately or join media agencies and YouTube channels as editors.',
      },
    ],
    relatedSlugs: ['capcut-editing', 'camera-mastery', 'ai-course'],
    seo: {
      title: 'Video Editing Course Kathmandu | Premiere Pro & DaVinci Resolve | Uniq Turn',
      description: 'Professional video editing course in Kathmandu. Learn Premiere Pro, DaVinci Resolve, color grading & audio. 8-week hands-on training with certificate. Enroll at Uniq Turn.',
      keywords: 'video editing course Kathmandu, Premiere Pro class Nepal, DaVinci Resolve training Kathmandu, video editing classes Nepal, film editing course Kathmandu',
    },
  },
  {
    slug: 'camera-mastery',
    name: 'Camera Mastery Course',
    category: 'Skill Course',
    categoryType: 'skill',
    tagline: 'Go from auto mode to full manual control and shoot like a professional.',
    whatsappMessage: "Hi%2C%20I'm%20interested%20in%20the%20Camera%20Mastery%20Course%20at%20Uniq%20Turn.%20Please%20share%20details.",
    duration: '6 Weeks',
    batchSize: 'Max 10 Students',
    format: 'In-Person',
    certificate: 'Certificate Included',
    whyCourse:
      'Great visuals are the foundation of every successful brand, content channel, and creative career. Yet most people who own a camera never move beyond auto mode, leaving the full potential of their equipment untapped. This course teaches you to take control of your camera, understand light, and compose shots that look intentional and professional — skills that translate directly into freelance photography, videography, and content creation work.',
    outcomes: [
      { icon: '◉', text: 'Shoot in full manual mode with complete control over exposure, aperture, and shutter speed' },
      { icon: '◉', text: 'Set up and work with natural and artificial lighting to create professional-quality shots' },
      { icon: '◉', text: 'Apply composition principles that make every frame look intentional and visually compelling' },
      { icon: '◉', text: 'Produce a short film or photo series as a portfolio piece by the end of the course' },
    ],
    modules: [
      {
        title: 'Module 1: Understanding Your Camera',
        description: 'Learn the anatomy of a DSLR or mirrorless camera, what every button and dial does, and how to navigate menus confidently. We cover both photo and video modes.',
      },
      {
        title: 'Module 2: Exposure Triangle — Aperture, Shutter Speed & ISO',
        description: 'Master the three pillars of exposure. Understand how each setting affects your image and how to balance them in any lighting condition to get the shot you want.',
      },
      {
        title: 'Module 3: Lighting Fundamentals',
        description: 'Learn to read and shape light — natural window light, golden hour, reflectors, and basic artificial lighting setups. Good lighting is the single biggest difference between amateur and professional work.',
      },
      {
        title: 'Module 4: Composition & Visual Storytelling',
        description: 'Apply the rule of thirds, leading lines, framing, depth of field, and other composition techniques. Learn to see a scene the way a professional photographer does.',
      },
      {
        title: 'Module 5: Video Production Basics',
        description: 'Transition from stills to video. Learn frame rates, focus pulling, smooth camera movement, and how to shoot footage that is ready for professional editing.',
      },
      {
        title: 'Module 6: Short Film / Portfolio Project',
        description: 'Plan, shoot, and produce a short film or photo series from concept to final deliverable. Receive instructor feedback and leave with a portfolio-ready piece.',
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Enroll via WhatsApp',
        description: 'Message us to confirm your spot. We will share what equipment you need (or can borrow) and what to expect in your first session.',
      },
      {
        step: 2,
        title: 'Shoot in Every Class',
        description: 'Every session involves hands-on shooting — indoors, outdoors, with different lighting setups. You learn by doing, not just watching.',
      },
      {
        step: 3,
        title: 'Review & Improve Together',
        description: 'Instructors review your shots in class, giving specific feedback on what works and what to adjust. You improve faster with direct, personalized guidance.',
      },
      {
        step: 4,
        title: 'Graduate with a Portfolio',
        description: 'Complete your short film or photo series, receive your certificate, and leave with real work you can show to clients or use to launch your creative career.',
      },
    ],
    whoIsItFor: [
      'Beginners who own a camera but have never moved beyond auto mode',
      'Content creators who want to improve the visual quality of their photos and videos',
      'Aspiring photographers and videographers who want to freelance or work professionally',
      'Small business owners who want to shoot their own product and marketing content',
      'Students interested in film, media, or visual storytelling as a career path',
    ],
    faqs: [
      {
        question: 'Do I need any prior experience?',
        answer: 'No experience is needed. We start from the very basics — even if you have never touched a camera before, you will be shooting confidently by the end of the first week.',
      },
      {
        question: 'Do I need to own a camera?',
        answer: 'Having your own camera is ideal, but not mandatory. We have equipment available for practice during class sessions. We can also advise you on what camera to buy if you are looking to invest.',
      },
      {
        question: 'How long is the course and how are classes scheduled?',
        answer: 'The course runs for 6 weeks with in-person sessions. Exact timings are confirmed at enrollment — message us on WhatsApp to find a batch that fits your schedule.',
      },
      {
        question: 'Is there a certificate at the end?',
        answer: 'Yes. You receive an official Uniq Turn certificate upon completing the course and your portfolio project.',
      },
      {
        question: 'What is the fee, and are there payment plans?',
        answer: 'Fees are affordable and installment options are available. Please message us on WhatsApp for current pricing details.',
      },
      {
        question: 'What happens after I finish the course?',
        answer: 'Graduates leave with a portfolio, a certificate, and the technical skills to freelance as a photographer or videographer, shoot content for brands, or continue into advanced filmmaking.',
      },
    ],
    relatedSlugs: ['video-editing', 'capcut-editing', 'digital-marketing'],
    seo: {
      title: 'Camera Mastery Course Kathmandu | Photography & Videography Training | Uniq Turn',
      description: 'Learn photography and videography from scratch at Uniq Turn Kathmandu. Master manual mode, lighting, composition & short film production. 6-week course with certificate.',
      keywords: 'camera course Kathmandu, photography class Nepal, videography training Kathmandu, DSLR course Nepal, photography school Kathmandu',
    },
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing Course',
    category: 'Skill Course',
    categoryType: 'skill',
    tagline: 'Learn to grow brands online — and get paid to do it.',
    whatsappMessage: "Hi%2C%20I'm%20interested%20in%20the%20Digital%20Marketing%20Course%20at%20Uniq%20Turn.%20Please%20share%20details.",
    duration: '8 Weeks',
    batchSize: 'Max 15 Students',
    format: 'In-Person / Hybrid',
    certificate: 'Certificate Included',
    whyCourse:
      'Every business — from local shops to global brands — needs digital marketing to survive and grow. Skilled digital marketers who can run ads, grow social media, and analyze results are among the most in-demand professionals in Nepal and globally. This course gives you a complete, practical toolkit: from social media strategy and SEO to paid advertising and analytics, so you can work for agencies, freelance for clients, or grow your own business.',
    outcomes: [
      { icon: '◈', text: 'Build and execute social media strategies that grow audiences and drive real business results' },
      { icon: '◈', text: 'Run profitable paid ad campaigns on Meta (Facebook/Instagram) and Google' },
      { icon: '◈', text: 'Optimize websites and content for search engines (SEO) to drive organic traffic' },
      { icon: '◈', text: 'Read and interpret analytics data to make smarter marketing decisions' },
    ],
    modules: [
      {
        title: 'Module 1: Digital Marketing Foundations',
        description: 'Understand the full digital marketing landscape — channels, funnels, buyer journeys, and how all the pieces fit together. Build a strategic mindset before diving into tactics.',
      },
      {
        title: 'Module 2: Social Media Marketing',
        description: 'Learn platform-specific strategies for Instagram, Facebook, TikTok, and LinkedIn. Content planning, posting schedules, community management, and organic growth tactics.',
      },
      {
        title: 'Module 3: Search Engine Optimization (SEO)',
        description: 'Keyword research, on-page optimization, technical SEO basics, link building, and local SEO. Learn how to rank content on Google and drive free, consistent traffic.',
      },
      {
        title: 'Module 4: Paid Advertising — Meta & Google Ads',
        description: 'Set up, run, and optimize paid campaigns on Facebook, Instagram, and Google. Learn targeting, bidding strategies, ad creative best practices, and how to read campaign data.',
      },
      {
        title: 'Module 5: Content Marketing & Email',
        description: 'Create content strategies, write compelling copy, build email lists, and run email campaigns. Learn how to use content to attract, nurture, and convert customers.',
      },
      {
        title: 'Module 6: Analytics, Reporting & Strategy',
        description: 'Use Google Analytics, Meta Business Suite, and other tools to measure performance. Learn to build reports, identify what is working, and present results to clients or management.',
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Enroll via WhatsApp',
        description: 'Message us to confirm your enrollment. We will share batch details, what to bring to your first class, and how to set up your accounts before you start.',
      },
      {
        step: 2,
        title: 'Learn with Live Campaigns',
        description: 'Run real ad campaigns and manage real social media accounts during the course. You learn by doing — not just studying theory in a textbook.',
      },
      {
        step: 3,
        title: 'Build a Marketing Portfolio',
        description: 'Complete a capstone project where you create a full digital marketing strategy and campaign for a real or simulated brand, ready to show to employers or clients.',
      },
      {
        step: 4,
        title: 'Graduate & Start Working',
        description: 'Receive your certificate and leave with the skills, portfolio, and confidence to work at a marketing agency, freelance for clients, or grow your own business online.',
      },
    ],
    whoIsItFor: [
      'Complete beginners who want to start a career in digital marketing',
      'Business owners who want to market their own products and services online',
      'Freelancers who want to add digital marketing to their service offerings',
      'Students and fresh graduates looking for a high-demand, well-paying career path',
      'Marketing professionals who want to upgrade their skills with current digital tools',
    ],
    faqs: [
      {
        question: 'Do I need any prior experience?',
        answer: 'No prior marketing or technical experience is required. We start from the fundamentals and build up to advanced strategies. Basic computer and internet skills are all you need.',
      },
      {
        question: 'How long is the course and how are classes scheduled?',
        answer: 'The course runs for 8 weeks with regular sessions. We offer both morning and evening batches. Message us on WhatsApp to find a schedule that works for you.',
      },
      {
        question: 'Is there a certificate at the end?',
        answer: 'Yes. You receive an official Uniq Turn certificate upon completing the course and your capstone project.',
      },
      {
        question: 'What is the fee, and are there payment plans?',
        answer: 'Fees are affordable and installment options are available. Please message us on WhatsApp for current pricing and payment plan details.',
      },
      {
        question: 'What happens after I finish the course?',
        answer: 'Graduates leave with a portfolio, a certificate, and practical skills ready to apply immediately. Many graduates go on to work at digital agencies, freelance for local and international clients, or use their skills to grow their own businesses.',
      },
    ],
    relatedSlugs: ['ai-course', 'video-editing', 'capcut-editing'],
    seo: {
      title: 'Digital Marketing Course Kathmandu | Social Media, SEO & Ads | Uniq Turn',
      description: 'Learn digital marketing at Uniq Turn Kathmandu. Social media, SEO, Meta & Google Ads, content marketing. 8-week practical course with certificate. Enroll today.',
      keywords: 'digital marketing course Kathmandu, social media marketing class Nepal, SEO course Kathmandu, Google Ads training Nepal, digital marketing training Kathmandu',
    },
  },
  {
    slug: 'capcut-editing',
    name: 'CapCut Video Editing',
    category: 'Skill Course',
    categoryType: 'skill',
    tagline: 'Create viral Reels, TikToks, and Shorts that stop the scroll — from your phone.',
    whatsappMessage: "Hi%2C%20I'm%20interested%20in%20the%20CapCut%20Video%20Editing%20Course%20at%20Uniq%20Turn.%20Please%20share%20details.",
    duration: '4 Weeks',
    batchSize: 'Max 15 Students',
    format: 'In-Person',
    certificate: 'Certificate Included',
    whyCourse:
      'Short-form video is the fastest-growing content format on the internet, and CapCut has become the go-to editing tool for creators, marketers, and businesses worldwide. Whether you want to grow your own social media presence, offer editing as a freelance service, or create content for brands, mastering CapCut gives you a powerful, in-demand skill that you can use immediately — no expensive equipment or computer required.',
    outcomes: [
      { icon: '⬡', text: 'Edit professional-quality Reels, TikToks, and Shorts entirely on your phone using CapCut' },
      { icon: '⬡', text: 'Apply trending effects, transitions, and text animations that drive views and engagement' },
      { icon: '⬡', text: 'Use CapCut templates and customize them to match any brand or content style' },
      { icon: '⬡', text: 'Deliver polished, export-ready videos optimized for each platform\'s format and algorithm' },
    ],
    modules: [
      {
        title: 'Module 1: CapCut Interface & Core Tools',
        description: 'Get comfortable with the CapCut interface on both mobile and desktop. Learn the timeline, cutting tools, layers, and the core editing workflow from import to export.',
      },
      {
        title: 'Module 2: Transitions, Effects & Filters',
        description: 'Master CapCut\'s library of transitions and effects. Learn which effects are trending, how to time them to music, and how to use them without making your video look cluttered.',
      },
      {
        title: 'Module 3: Text, Captions & Typography',
        description: 'Add animated text, auto-captions, and stylized typography that enhances your video. Learn caption styling, timing, and how to use text to hook viewers in the first 3 seconds.',
      },
      {
        title: 'Module 4: Trending Reels & Shorts Formats',
        description: 'Study what makes Reels and TikToks go viral. Learn the hook-body-CTA structure, trending audio usage, pacing techniques, and how to adapt your editing style to each platform.',
      },
      {
        title: 'Module 5: Templates & Brand Consistency',
        description: 'Use and customize CapCut templates for fast, consistent content production. Learn how to build a recognizable visual style for a brand or personal account.',
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Enroll via WhatsApp',
        description: 'Message us to confirm your spot. All you need is a smartphone with CapCut installed — we will guide you through setup before your first class.',
      },
      {
        step: 2,
        title: 'Edit in Every Session',
        description: 'Every class is hands-on. You will edit real videos during each session, applying what you learn immediately so it sticks.',
      },
      {
        step: 3,
        title: 'Create Your Portfolio Reel',
        description: 'By the end of the course, you will have edited multiple short-form videos across different styles — a portfolio you can use to attract clients or grow your own channel.',
      },
      {
        step: 4,
        title: 'Graduate & Start Creating',
        description: 'Receive your certificate and leave with the skills to edit professional short-form content for yourself, clients, or brands — starting immediately.',
      },
    ],
    whoIsItFor: [
      'Content creators who want to level up their Reels and TikTok editing quality',
      'Aspiring freelancers who want to offer short-form video editing as a service',
      'Small business owners who want to create their own social media video content',
      'Students and young professionals who want a fast, practical, monetizable skill',
      'Anyone who wants to grow a social media presence with high-quality video content',
    ],
    faqs: [
      {
        question: 'Do I need any prior experience?',
        answer: 'No experience needed. If you can use a smartphone, you can take this course. We start from the very beginning and move at a pace that works for everyone.',
      },
      {
        question: 'Do I need a specific phone or device?',
        answer: 'CapCut works on both Android and iOS smartphones. A reasonably modern phone (last 3-4 years) is sufficient. We also cover the desktop version for those who prefer editing on a computer.',
      },
      {
        question: 'How long is the course and how are classes scheduled?',
        answer: 'The course runs for 4 weeks with regular in-person sessions. Message us on WhatsApp for current batch timings.',
      },
      {
        question: 'Is there a certificate at the end?',
        answer: 'Yes. You receive an official Uniq Turn certificate upon completing the course.',
      },
      {
        question: 'What is the fee, and are there payment plans?',
        answer: 'This is one of our most affordable courses. Please message us on WhatsApp for current pricing and any available payment options.',
      },
      {
        question: 'What happens after I finish the course?',
        answer: 'Graduates leave with editing skills they can apply immediately — whether to grow their own social media, offer editing services to clients, or create content for brands. Many graduates start taking on freelance work within weeks of completing the course.',
      },
    ],
    relatedSlugs: ['video-editing', 'camera-mastery', 'digital-marketing'],
    seo: {
      title: 'CapCut Editing Course Kathmandu | Reels, TikTok & Shorts | Uniq Turn',
      description: 'Master CapCut video editing at Uniq Turn Kathmandu. Create viral Reels, TikToks & Shorts. 4-week mobile editing course with certificate. No experience needed.',
      keywords: 'CapCut course Kathmandu, CapCut editing class Nepal, Reels editing course Kathmandu, TikTok editing training Nepal, short video editing course Kathmandu',
    },
  },
  {
    slug: 'english-language',
    name: 'English Language Classes',
    category: 'Language & Visa',
    categoryType: 'language',
    tagline: 'Build the confident English communication skills that open doors in work and life.',
    whatsappMessage: "Hi%2C%20I'm%20interested%20in%20the%20English%20Language%20Classes%20at%20Uniq%20Turn.%20Please%20share%20details.",
    duration: '3 Months',
    batchSize: 'Max 12 Students',
    format: 'In-Person',
    certificate: 'Certificate Included',
    whyCourse:
      'English is the global language of business, education, and opportunity. In Nepal, strong English communication skills are a direct advantage in job interviews, workplace promotions, international study applications, and everyday professional interactions. Whether you are starting from basics or looking to polish your professional communication, this course builds real, usable English skills — not just grammar rules.',
    outcomes: [
      { icon: '🌐', text: 'Speak English confidently in professional and everyday situations without hesitation' },
      { icon: '🌐', text: 'Write clear, professional emails, reports, and messages in English' },
      { icon: '🌐', text: 'Understand spoken English in different accents and contexts' },
      { icon: '🌐', text: 'Use business English vocabulary and communication styles for workplace success' },
    ],
    modules: [
      {
        title: 'Module 1: Foundations — Grammar & Sentence Structure',
        description: 'Build a solid grammatical foundation. Cover tenses, sentence construction, common errors, and the rules that make English communication clear and correct.',
      },
      {
        title: 'Module 2: Speaking & Pronunciation',
        description: 'Practice speaking in structured conversations, presentations, and role-plays. Work on pronunciation, fluency, and the confidence to speak without overthinking every word.',
      },
      {
        title: 'Module 3: Listening & Comprehension',
        description: 'Train your ear with real-world audio — conversations, interviews, news, and presentations. Develop the ability to understand different accents and speaking speeds.',
      },
      {
        title: 'Module 4: Reading & Vocabulary Building',
        description: 'Expand your vocabulary systematically and improve reading comprehension. Learn strategies for understanding unfamiliar words in context.',
      },
      {
        title: 'Module 5: Business & Professional English',
        description: 'Master professional email writing, meeting language, presentation skills, and workplace communication. Practical focus on the English you actually need at work.',
      },
      {
        title: 'Module 6: Fluency Practice & Assessment',
        description: 'Intensive speaking practice, mock interviews, and group discussions. Final assessment to measure your progress and identify areas for continued improvement.',
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Enroll via WhatsApp',
        description: 'Message us to confirm your enrollment. We will assess your current level and place you in the right batch — beginner, intermediate, or advanced.',
      },
      {
        step: 2,
        title: 'Practice in Small Groups',
        description: 'Small class sizes mean you get to speak in every session. No hiding at the back — everyone practices, everyone improves.',
      },
      {
        step: 3,
        title: 'Use English Every Day',
        description: 'We give you daily practice exercises and real-world tasks so your English improves between classes, not just during them.',
      },
      {
        step: 4,
        title: 'Graduate with Confidence',
        description: 'Complete your final assessment, receive your certificate, and leave with the English skills to communicate confidently in any professional or personal setting.',
      },
    ],
    whoIsItFor: [
      'Beginners who want to build English from the ground up',
      'Working professionals who need better English for their job or career advancement',
      'Students preparing for university applications or study abroad programs',
      'Anyone who feels hesitant or nervous speaking English and wants to build confidence',
      'People preparing for job interviews that require English communication',
    ],
    faqs: [
      {
        question: 'Do I need any prior experience?',
        answer: 'No. We have classes for all levels — from complete beginners to those who want to polish their professional English. We assess your level at enrollment and place you in the right batch.',
      },
      {
        question: 'How long is the course and how are classes scheduled?',
        answer: 'The course runs for 3 months with regular sessions. We offer morning and evening batches. Message us on WhatsApp to find a schedule that works for you.',
      },
      {
        question: 'Is there a certificate at the end?',
        answer: 'Yes. You receive an official Uniq Turn certificate upon completing the course.',
      },
      {
        question: 'What is the fee, and are there payment plans?',
        answer: 'Fees are affordable and monthly payment options are available. Please message us on WhatsApp for current pricing.',
      },
      {
        question: 'What happens after I finish the course?',
        answer: 'Graduates leave with significantly improved English communication skills. Many students go on to pass job interviews, get promotions, or successfully apply to international universities. We also offer advanced follow-up courses for those who want to continue.',
      },
    ],
    relatedSlugs: ['ielts-pte-prep', 'korean-language', 'japanese-language'],
    seo: {
      title: 'English Language Classes Kathmandu | Spoken & Business English | Uniq Turn',
      description: 'Build confident English communication skills at Uniq Turn Kathmandu. Spoken English, business English, grammar & writing. All levels welcome. Enroll today.',
      keywords: 'English language class Kathmandu, spoken English course Nepal, English communication training Kathmandu, business English class Nepal, English speaking course Kathmandu',
    },
  },
  {
    slug: 'korean-language',
    name: 'Korean Language Classes',
    category: 'Language & Visa',
    categoryType: 'language',
    tagline: 'Learn Korean from scratch — for work, study, or life in South Korea.',
    whatsappMessage: "Hi%2C%20I'm%20interested%20in%20the%20Korean%20Language%20Classes%20at%20Uniq%20Turn.%20Please%20share%20details.",
    duration: '4 Months',
    batchSize: 'Max 12 Students',
    format: 'In-Person',
    certificate: 'Certificate Included',
    whyCourse:
      'South Korea is one of the top destinations for Nepali students and workers, and Korean language proficiency is a significant advantage — or outright requirement — for study visas, work permits, and EPS-TOPIK qualification. Beyond practical necessity, Korean opens doors to one of Asia\'s most dynamic economies and cultures. This course takes you from zero to conversational Korean with a clear, structured path.',
    outcomes: [
      { icon: '🌐', text: 'Read and write Hangul (the Korean alphabet) fluently from scratch' },
      { icon: '🌐', text: 'Hold basic to intermediate conversations in Korean for everyday and work situations' },
      { icon: '🌐', text: 'Understand Korean grammar structure and build sentences correctly' },
      { icon: '🌐', text: 'Prepare for TOPIK (Test of Proficiency in Korean) or EPS-TOPIK examinations' },
    ],
    modules: [
      {
        title: 'Module 1: Hangul — The Korean Alphabet',
        description: 'Learn to read and write all 40 Hangul characters (vowels and consonants) and understand how they combine to form syllable blocks. Most students can read Korean within the first week.',
      },
      {
        title: 'Module 2: Pronunciation & Basic Vocabulary',
        description: 'Master Korean pronunciation rules, including consonant assimilation and vowel harmony. Build a core vocabulary of 300+ essential words for daily use.',
      },
      {
        title: 'Module 3: Basic Grammar & Sentence Structure',
        description: 'Understand Korean sentence structure (Subject-Object-Verb), basic particles, verb conjugation, and how to form simple statements and questions.',
      },
      {
        title: 'Module 4: Conversational Korean — Everyday Situations',
        description: 'Practice conversations for real-life situations: greetings, shopping, directions, restaurants, workplace introductions, and phone calls.',
      },
      {
        title: 'Module 5: Intermediate Grammar & Writing',
        description: 'Expand into more complex grammar patterns, honorific speech levels, and written Korean. Build the skills needed for intermediate-level communication.',
      },
      {
        title: 'Module 6: TOPIK / EPS-TOPIK Preparation',
        description: 'Targeted preparation for Korean proficiency exams. Practice with past papers, exam strategies, and the specific vocabulary and grammar patterns tested in TOPIK and EPS-TOPIK.',
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Enroll via WhatsApp',
        description: 'Message us to confirm your enrollment. We will share batch details and what to expect in your first class — no prior Korean knowledge needed.',
      },
      {
        step: 2,
        title: 'Learn in Small, Focused Groups',
        description: 'Small class sizes mean more speaking practice and direct instructor attention. You will be speaking Korean from your very first session.',
      },
      {
        step: 3,
        title: 'Practice with Real Materials',
        description: 'Use authentic Korean materials — dialogues, audio recordings, and reading passages — so your Korean sounds natural, not textbook-stiff.',
      },
      {
        step: 4,
        title: 'Graduate Ready for Korea',
        description: 'Receive your certificate and leave with the Korean language skills to communicate in South Korea, pass your proficiency exam, or continue to advanced levels.',
      },
    ],
    whoIsItFor: [
      'Students planning to study in South Korea who need Korean for visa or university requirements',
      'Workers preparing for EPS-TOPIK or other Korean language requirements for employment visas',
      'K-drama and K-pop fans who want to understand Korean without subtitles',
      'Complete beginners with no prior exposure to Korean or any Asian language',
      'Anyone planning to live, work, or travel in South Korea',
    ],
    faqs: [
      {
        question: 'Do I need any prior experience?',
        answer: 'No. We start from absolute zero — the very first class teaches you the Korean alphabet. No prior knowledge of Korean or any other Asian language is required.',
      },
      {
        question: 'How long is the course and how are classes scheduled?',
        answer: 'The course runs for 4 months with regular sessions. We offer flexible batch timings. Message us on WhatsApp to find a schedule that works for you.',
      },
      {
        question: 'Is there a certificate at the end?',
        answer: 'Yes. You receive an official Uniq Turn certificate upon completing the course.',
      },
      {
        question: 'What is the fee, and are there payment plans?',
        answer: 'Fees are affordable and monthly payment options are available. Please message us on WhatsApp for current pricing.',
      },
      {
        question: 'What happens after I finish the course?',
        answer: 'Graduates leave with conversational Korean skills and TOPIK/EPS-TOPIK preparation. Many students go on to successfully apply for Korean study or work visas. We also offer advanced Korean classes for those who want to continue.',
      },
    ],
    relatedSlugs: ['japanese-language', 'english-language', 'ielts-pte-prep'],
    seo: {
      title: 'Korean Language Class Kathmandu | TOPIK & EPS-TOPIK Prep | Uniq Turn',
      description: 'Learn Korean from scratch at Uniq Turn Kathmandu. Hangul, conversational Korean, TOPIK & EPS-TOPIK preparation. 4-month course with certificate. Enroll today.',
      keywords: 'Korean language class Kathmandu, Korean course Nepal, TOPIK preparation Kathmandu, EPS-TOPIK class Nepal, Korean language training Kathmandu',
    },
  },
  {
    slug: 'japanese-language',
    name: 'Japanese Language Classes',
    category: 'Language & Visa',
    categoryType: 'language',
    tagline: 'Master Japanese — for travel, work, JLPT, or a life in Japan.',
    whatsappMessage: "Hi%2C%20I'm%20interested%20in%20the%20Japanese%20Language%20Classes%20at%20Uniq%20Turn.%20Please%20share%20details.",
    duration: '4 Months',
    batchSize: 'Max 12 Students',
    format: 'In-Person',
    certificate: 'Certificate Included',
    whyCourse:
      'Japan is a growing destination for Nepali students and workers, and Japanese language proficiency is increasingly required for study visas, technical internship programs (TITP), and Specified Skilled Worker (SSW) visas. Beyond practical necessity, Japanese opens doors to one of the world\'s most technologically advanced economies. This course builds a strong foundation in Japanese from Hiragana to conversational fluency.',
    outcomes: [
      { icon: '🌐', text: 'Read and write Hiragana and Katakana — the two Japanese phonetic scripts — fluently' },
      { icon: '🌐', text: 'Hold basic to intermediate conversations in Japanese for everyday and work situations' },
      { icon: '🌐', text: 'Understand fundamental Japanese grammar and build correct sentences' },
      { icon: '🌐', text: 'Prepare for JLPT N5/N4 examinations or Japanese language requirements for visa applications' },
    ],
    modules: [
      {
        title: 'Module 1: Hiragana & Katakana',
        description: 'Learn all 46 Hiragana and 46 Katakana characters — the two phonetic scripts that form the foundation of Japanese reading and writing. Most students master both within the first two weeks.',
      },
      {
        title: 'Module 2: Pronunciation & Core Vocabulary',
        description: 'Master Japanese pronunciation (which is very regular and consistent) and build a core vocabulary of 300+ essential words for daily communication.',
      },
      {
        title: 'Module 3: Basic Grammar — JLPT N5 Level',
        description: 'Learn Japanese sentence structure, basic particles (は, が, を, に, で), verb conjugation, and the grammar patterns tested in JLPT N5.',
      },
      {
        title: 'Module 4: Conversational Japanese',
        description: 'Practice conversations for real situations: self-introduction, shopping, asking directions, ordering food, and basic workplace interactions.',
      },
      {
        title: 'Module 5: Kanji Introduction & Intermediate Grammar',
        description: 'Introduction to the most common Kanji characters (JLPT N5 level: ~100 characters). Expand into intermediate grammar patterns for JLPT N4 preparation.',
      },
      {
        title: 'Module 6: JLPT Exam Preparation',
        description: 'Targeted preparation for JLPT N5 or N4. Practice with past papers, exam strategies, listening comprehension exercises, and vocabulary review.',
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Enroll via WhatsApp',
        description: 'Message us to confirm your enrollment. We will share batch details and what to expect in your first class — no prior Japanese knowledge needed.',
      },
      {
        step: 2,
        title: 'Learn Scripts First, Then Speak',
        description: 'We start with Hiragana and Katakana so you can read and write from the beginning — then move quickly into speaking and listening practice.',
      },
      {
        step: 3,
        title: 'Practice with Authentic Materials',
        description: 'Use real Japanese audio, dialogues, and reading passages so your Japanese sounds natural and prepares you for real-world use.',
      },
      {
        step: 4,
        title: 'Graduate Ready for Japan',
        description: 'Receive your certificate and leave with the Japanese language skills to pass your JLPT exam, meet visa language requirements, or communicate in Japan.',
      },
    ],
    whoIsItFor: [
      'Students planning to study in Japan who need Japanese for visa or university requirements',
      'Workers preparing for TITP or SSW visa language requirements',
      'Anime and manga fans who want to understand Japanese without subtitles',
      'Complete beginners with no prior exposure to Japanese',
      'Anyone planning to live, work, or travel in Japan',
    ],
    faqs: [
      {
        question: 'Do I need any prior experience?',
        answer: 'No. We start from absolute zero — the very first classes teach you Hiragana and Katakana. No prior knowledge of Japanese or any Asian language is required.',
      },
      {
        question: 'How long is the course and how are classes scheduled?',
        answer: 'The course runs for 4 months with regular sessions. We offer flexible batch timings. Message us on WhatsApp to find a schedule that works for you.',
      },
      {
        question: 'Is there a certificate at the end?',
        answer: 'Yes. You receive an official Uniq Turn certificate upon completing the course.',
      },
      {
        question: 'What is the fee, and are there payment plans?',
        answer: 'Fees are affordable and monthly payment options are available. Please message us on WhatsApp for current pricing.',
      },
      {
        question: 'What happens after I finish the course?',
        answer: 'Graduates leave with foundational Japanese skills and JLPT preparation. Many students go on to pass JLPT N5 or N4 and successfully apply for Japanese study or work visas. We also offer advanced Japanese classes for those who want to continue.',
      },
    ],
    relatedSlugs: ['korean-language', 'english-language', 'ielts-pte-prep'],
    seo: {
      title: 'Japanese Language Classes Kathmandu | JLPT N5/N4 Preparation | Uniq Turn',
      description: 'Learn Japanese from scratch at Uniq Turn Kathmandu. Hiragana, Katakana, conversational Japanese & JLPT N5/N4 prep. 4-month course with certificate.',
      keywords: 'Japanese language class Kathmandu, Japanese course Nepal, JLPT preparation Kathmandu, Japanese language training Nepal, Japanese class Kathmandu',
    },
  },
  {
    slug: 'ielts-pte-prep',
    name: 'IELTS / PTE Prep',
    category: 'Language & Visa',
    categoryType: 'language',
    tagline: 'Targeted exam preparation that gives you the best chance of hitting your target score.',
    whatsappMessage: "Hi%2C%20I'm%20interested%20in%20the%20IELTS%2FPTE%20Prep%20Course%20at%20Uniq%20Turn.%20Please%20share%20details.",
    duration: '6–8 Weeks',
    batchSize: 'Max 12 Students',
    format: 'In-Person',
    certificate: 'Completion Certificate',
    whyCourse:
      'IELTS and PTE scores are required for university admissions, skilled migration visas, and professional registration in English-speaking countries. A strong score can be the difference between getting your visa approved or rejected, or between being accepted to your preferred university or not. This course provides structured, exam-focused preparation across all four skills — Reading, Writing, Listening, and Speaking — with mock tests and expert feedback.',
    outcomes: [
      { icon: '📋', text: 'Understand the exact format, timing, and question types of IELTS and PTE exams' },
      { icon: '📋', text: 'Apply proven strategies for each section to maximize your score efficiently' },
      { icon: '📋', text: 'Practice with full mock tests under real exam conditions to build confidence and timing' },
      { icon: '📋', text: 'Receive personalized feedback on your Writing and Speaking to identify and fix specific weaknesses' },
    ],
    modules: [
      {
        title: 'Module 1: Exam Overview & Strategy',
        description: 'Understand the structure, scoring, and timing of IELTS Academic, IELTS General, and PTE Academic. Learn the overall strategy for approaching each exam and how to allocate your preparation time.',
      },
      {
        title: 'Module 2: Reading — Techniques & Practice',
        description: 'Master skimming, scanning, and detailed reading strategies. Practice with authentic IELTS and PTE reading passages and learn how to manage time across different question types.',
      },
      {
        title: 'Module 3: Listening — Skills & Practice',
        description: 'Develop active listening skills for different accents and speaking speeds. Practice with real exam audio and learn strategies for note-taking, prediction, and avoiding common errors.',
      },
      {
        title: 'Module 4: Writing — Task 1 & Task 2 / PTE Writing',
        description: 'Learn the structure, vocabulary, and grammar required for high-scoring IELTS Task 1 (graphs/charts) and Task 2 (essays), or PTE writing tasks. Practice with instructor feedback on every piece.',
      },
      {
        title: 'Module 5: Speaking — Fluency & Band Score Strategies',
        description: 'Practice IELTS Speaking Parts 1, 2, and 3 or PTE Speaking tasks with mock interviews. Learn how examiners score fluency, coherence, vocabulary, and pronunciation — and how to maximize each.',
      },
      {
        title: 'Module 6: Full Mock Tests & Final Review',
        description: 'Complete multiple full mock tests under real exam conditions. Receive detailed score breakdowns and targeted feedback. Final review of weak areas before your exam date.',
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Enroll via WhatsApp',
        description: 'Message us to confirm your enrollment. Share your target score and exam date so we can tailor your preparation plan from day one.',
      },
      {
        step: 2,
        title: 'Diagnose Your Starting Point',
        description: 'Take a diagnostic test in your first session so we know exactly where you are and where to focus your preparation for maximum improvement.',
      },
      {
        step: 3,
        title: 'Practice with Real Exam Materials',
        description: 'Every session uses authentic IELTS and PTE materials. You practice the real thing — not simplified exercises — so exam day feels familiar.',
      },
      {
        step: 4,
        title: 'Take Your Exam with Confidence',
        description: 'Leave with proven strategies, multiple mock tests under your belt, and personalized feedback on your weaknesses — ready to perform at your best on exam day.',
      },
    ],
    whoIsItFor: [
      'Students applying to universities in Australia, UK, Canada, USA, or New Zealand who need IELTS or PTE scores',
      'Professionals applying for skilled migration visas that require English proficiency proof',
      'Anyone who has taken IELTS or PTE before and wants to improve their score',
      'People who need a specific band score (e.g., 6.5 or 7.0) for a visa or university requirement',
      'Students preparing to study abroad who want to strengthen their English alongside exam prep',
    ],
    faqs: [
      {
        question: 'Do I need any prior experience?',
        answer: 'You should have a reasonable foundation in English (roughly B1/B2 level) to benefit most from this course. If you are a complete beginner, we recommend starting with our English Language Classes first.',
      },
      {
        question: 'How long is the course and how are classes scheduled?',
        answer: 'The course runs for 6–8 weeks depending on your target exam date and starting level. We offer flexible batch timings. Message us on WhatsApp to discuss a schedule that fits your timeline.',
      },
      {
        question: 'Is there a certificate at the end?',
        answer: 'You receive a Uniq Turn completion certificate. Your official IELTS or PTE score certificate comes from the exam body (British Council / IDP for IELTS, Pearson for PTE) after you sit the actual exam.',
      },
      {
        question: 'What is the fee, and are there payment plans?',
        answer: 'Fees are affordable and installment options are available. Please message us on WhatsApp for current pricing.',
      },
      {
        question: 'What score can I expect to improve to?',
        answer: 'Score improvement depends on your starting level, how much you practice outside class, and how consistently you attend. We cannot guarantee a specific score — that is determined by the exam body. What we can guarantee is structured preparation, expert feedback, and the strategies that give you the best possible chance of reaching your target. We recommend a consultation via WhatsApp to discuss realistic expectations based on your current level.',
      },
      {
        question: 'What happens after I finish the course?',
        answer: 'You will be ready to sit your IELTS or PTE exam with confidence. We also provide guidance on booking your exam, what to expect on test day, and how to submit your scores to universities or visa applications.',
      },
    ],
    relatedSlugs: ['english-language', 'visa-guidance', 'korean-language'],
    seo: {
      title: 'IELTS PTE Preparation Kathmandu | Expert Coaching & Mock Tests | Uniq Turn',
      description: 'Targeted IELTS & PTE preparation at Uniq Turn Kathmandu. All 4 skills, mock tests, expert feedback. 6–8 week course. Enroll today for your best chance at your target score.',
      keywords: 'IELTS preparation Kathmandu, PTE coaching Nepal, IELTS PTE prep Kathmandu, IELTS class Nepal, PTE preparation Kathmandu, IELTS coaching Sundhara',
    },
  },
  {
    slug: 'visa-guidance',
    name: 'Visa Guidance',
    category: 'Language & Visa',
    categoryType: 'language',
    tagline: 'Navigate the visa process with confidence — step-by-step support from document prep to interview.',
    whatsappMessage: "Hi%2C%20I'm%20interested%20in%20Visa%20Guidance%20at%20Uniq%20Turn.%20Please%20share%20details.",
    duration: 'Ongoing / As Needed',
    batchSize: 'Individual & Small Group',
    format: 'In-Person',
    certificate: 'Guidance Certificate',
    whyCourse:
      'Applying for a study or work visa abroad is one of the most important and stressful processes a person can go through — and a single documentation error or missed requirement can result in rejection. Uniq Turn\'s visa guidance service provides structured, step-by-step support to help you prepare the strongest possible application: from understanding requirements and gathering documents to preparing for interviews and understanding what to expect at each stage.',
    outcomes: [
      { icon: '✈', text: 'Understand the complete visa application process for your target country and visa type' },
      { icon: '✈', text: 'Prepare a complete, accurate, and well-organized documentation package' },
      { icon: '✈', text: 'Prepare confidently for visa interviews with mock interview practice and feedback' },
      { icon: '✈', text: 'Avoid common mistakes that lead to visa rejections or delays' },
    ],
    modules: [
      {
        title: 'Session 1: Visa Assessment & Planning',
        description: 'Understand your visa options, eligibility requirements, and the full application timeline for your target country. We map out exactly what you need and create a personalized action plan.',
      },
      {
        title: 'Session 2: Document Preparation',
        description: 'Go through every required document — academic certificates, financial statements, employment letters, language scores, and more. Learn how to obtain, format, and organize each document correctly.',
      },
      {
        title: 'Session 3: Application Form Guidance',
        description: 'Complete your visa application forms accurately. We review every section to ensure there are no errors, inconsistencies, or missing information that could cause delays or rejection.',
      },
      {
        title: 'Session 4: Financial Documentation',
        description: 'Understand the financial requirements for your visa type. Learn how to present bank statements, sponsorship letters, and financial evidence in the way visa officers expect to see them.',
      },
      {
        title: 'Session 5: Interview Preparation',
        description: 'Practice mock visa interviews with common questions and feedback on your answers. Learn how to present yourself confidently and honestly, and what visa officers are looking for.',
      },
      {
        title: 'Session 6: Final Review & Submission Support',
        description: 'Final review of your complete application package before submission. Guidance on submission procedures, tracking your application, and what to do while you wait for a decision.',
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Enroll via WhatsApp',
        description: 'Message us with your target country and visa type. We will schedule an initial consultation to assess your situation and explain exactly how we can help.',
      },
      {
        step: 2,
        title: 'Build Your Application Package',
        description: 'Work through each document and form with our guidance. We review everything to ensure accuracy and completeness before you submit anything.',
      },
      {
        step: 3,
        title: 'Prepare for Your Interview',
        description: 'Practice mock interviews and receive honest feedback so you feel confident and prepared when you sit in front of a visa officer.',
      },
      {
        step: 4,
        title: 'Submit with Confidence',
        description: 'Submit your application knowing it is as strong as it can be. We remain available to answer questions and provide support while you wait for your decision.',
      },
    ],
    whoIsItFor: [
      'Students applying for study visas to Australia, UK, Canada, Japan, South Korea, or other countries',
      'Workers applying for employment or skilled migration visas',
      'Anyone who has had a visa rejected before and wants expert guidance for a reapplication',
      'People who find the visa process confusing, overwhelming, or stressful',
      'Families supporting a member through the visa application process',
    ],
    faqs: [
      {
        question: 'Do I need any prior experience?',
        answer: 'No experience with visa applications is needed. We guide you through every step from the very beginning, regardless of whether this is your first application or a reapplication after a rejection.',
      },
      {
        question: 'How long is the process and how are sessions scheduled?',
        answer: 'The timeline depends on your visa type and how quickly you can gather documents. Sessions are scheduled flexibly around your timeline. Message us on WhatsApp to discuss your specific situation.',
      },
      {
        question: 'Is there a certificate at the end?',
        answer: 'You receive a Uniq Turn guidance certificate. Your actual visa decision comes from the embassy or immigration authority of your target country.',
      },
      {
        question: 'What is the fee, and are there payment plans?',
        answer: 'Fees vary depending on the level of support you need. Please message us on WhatsApp for a consultation and current pricing.',
      },
      {
        question: 'Which countries do you help with visa applications for?',
        answer: 'We primarily support applications for Australia, UK, Canada, USA, Japan, South Korea, and other popular study and work destinations for Nepali applicants. Message us on WhatsApp to confirm support for your specific target country.',
      },
      {
        question: 'Do you guarantee visa approval?',
        answer: 'No. We want to be completely honest about this: no organization — including Uniq Turn — can guarantee visa approval. Visa decisions are made solely by the embassy or immigration authority of the destination country, based on their assessment of your application. What we do is help you prepare the strongest, most accurate, and most complete application possible — which gives you the best chance of a positive outcome. Anyone who promises guaranteed visa approval is not being truthful with you.',
      },
      {
        question: 'What happens after I finish the guidance process?',
        answer: 'We support you through the submission process and remain available to answer questions while you wait for your decision. If your visa is approved, we can also provide guidance on pre-departure preparation. If your application is unsuccessful, we can help you understand the reasons and plan next steps.',
      },
    ],
    relatedSlugs: ['ielts-pte-prep', 'english-language', 'korean-language'],
    seo: {
      title: 'Visa Guidance Kathmandu | Study & Work Visa Support | Uniq Turn',
      description: 'Expert visa guidance at Uniq Turn Kathmandu. Document prep, application support & interview coaching for study and work visas. Honest, step-by-step help. Contact us today.',
      keywords: 'visa guidance Kathmandu, study visa help Nepal, visa application support Kathmandu, visa counseling Nepal, student visa guidance Kathmandu',
    },
  },
];

export function getCourseBySlug(slug: string): CourseData | undefined {
  return ALL_COURSES.find((c) => c.slug === slug);
}

export function getRelatedCourses(slugs: string[]): CourseData[] {
  return slugs.map((s) => ALL_COURSES.find((c) => c.slug === s)).filter(Boolean) as CourseData[];
}

// Map from homepage course IDs to slugs
export const COURSE_ID_TO_SLUG: Record<string, string> = {
  ai: 'ai-course',
  video: 'video-editing',
  camera: 'camera-mastery',
  marketing: 'digital-marketing',
  capcut: 'capcut-editing',
  english: 'english-language',
  korean: 'korean-language',
  japanese: 'japanese-language',
  ielts: 'ielts-pte-prep',
  visa: 'visa-guidance',
};
