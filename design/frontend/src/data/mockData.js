// Mock data for DLIMS Punjab Clone

export const navItems = [
  { label: 'Home', href: '#', active: true },
  { label: 'About us', href: '#about' },
  { label: 'How it works', href: '#process' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Downloads', href: '#' },
  { label: 'Fee Structure', href: '#' },
  { label: 'e-License', href: '#', highlighted: true },
  { label: 'Track Application', href: '#' },
  { label: 'Verify License', href: '#' },
];

export const features = [
  {
    icon: 'https://dlims.punjab.gov.pk/theme_new/assets/images/affect_less.png',
    title: 'Effortless Application Process',
    description: 'Apply for your driving license from the comfort of your home. Skip the queues and paperwork with our streamlined online application process',
  },
  {
    icon: 'https://dlims.punjab.gov.pk/theme_new/assets/images/real_time.png',
    title: 'Real-Time Application Tracking',
    description: 'Access a personalized dashboard for real-time updates. Stay informed throughout the process',
  },
  {
    icon: 'https://dlims.punjab.gov.pk/theme_new/assets/images/securepayment.png',
    title: 'Secure Payments via ePay System',
    description: 'Pay securely and Generate your Payment Slip Identification (PSID) token seamlessly. Get your unique identifier for payment processing',
  },
];

export const aboutContent = {
  image: 'https://dlims.punjab.gov.pk/theme_new/assets/images/about_us.png',
  title: 'About Dlims - Powered by Dastak',
  description: 'The Driving License Information Management System (DLIMS) is an integrated component of the Government of Punjab\'s Dastak - One Window for all Government Services which securely carries out all DLIMS processes including form submission, verification, payment, and card tracking.',
};

export const downloadContent = {
  title: 'Download the app',
  subtitle: 'Dastak - Doorstep Services',
  description: 'All services of DLIMS - Driving License Information Management System are now seamlessly consolidated and accessible at one window for all Government services through the Dastak app.',
  phoneImage: 'https://dlims.punjab.gov.pk/theme_new/assets/images/dastak_landing_service_info.png',
  licenseTypes: ['Learner License', 'Regular License', 'International License'],
};

export const processSteps = {
  learner: [
    {
      step: 1,
      title: 'Create Account & Login',
      description: 'Begin your driving journey: sign up or log in to access our online platform. Streamlined processes await, so start today for a smoother path to driving.',
    },
    {
      step: 2,
      title: 'Fill Application Form',
      description: 'Fill out your application form accurately with the required details. Ensure a smooth process for your learner\'s license application.',
    },
    {
      step: 3,
      title: 'Generate PSID',
      description: 'After submitting your application, a unique PSID (Public Service Identifier) will be generated for reference and processing.',
      hasPayButton: true,
    },
    {
      step: 4,
      title: 'Payment Confirmation',
      description: 'Following the submission, once the payment for your application is successfully processed, you\'ll receive a payment confirmation.',
    },
    {
      step: 5,
      title: 'Print Learner',
      description: 'Obtain a physical copy of your learner\'s license by printing it directly from our system. Get ready to hit the road safely!',
    },
  ],
  regular: [
    {
      step: 1,
      title: 'Create Account & Login',
      description: 'Begin your driving journey: sign up or log in to access our online platform. Streamlined processes await, so start today for a smoother path to driving.',
    },
    {
      step: 2,
      title: 'Fill Application Form',
      description: 'Fill out your application form accurately with the required details. Ensure a smooth process for your learner\'s license application.',
    },
    {
      step: 3,
      title: 'Generate PSID',
      description: 'After submitting your application, a unique PSID (Public Service Identifier) will be generated for reference and processing.',
      hasPayButton: true,
    },
    {
      step: 4,
      title: 'Payment Confirmation',
      description: 'Following the submission, once the payment for your application is successfully processed, you\'ll receive a payment confirmation.',
    },
    {
      step: 5,
      title: 'Approval',
      description: 'Subsequently, your application undergoes an administrative review. Upon approval, you\'ll be notified that your application has been approved by the administration.',
    },
    {
      step: 6,
      title: 'Processing & Dispatch',
      description: 'Finally, once approved, your driving license application will be processed and dispatched to you accordingly.',
    },
  ],
  international: [
    {
      step: 1,
      title: 'Create Account & Login',
      description: 'Begin your driving journey: sign up or log in to access our online platform. Streamlined processes await, so start today for a smoother path to driving.',
    },
    {
      step: 2,
      title: 'Fill Application Form',
      description: 'Fill out your application form accurately with the required details. Ensure a smooth process for your learner\'s license application.',
    },
    {
      step: 3,
      title: 'Generate PSID',
      description: 'After submitting your application, a unique PSID (Public Service Identifier) will be generated for reference and processing.',
      hasPayButton: true,
    },
    {
      step: 4,
      title: 'Payment Confirmation',
      description: 'Following the submission, once the payment for your application is successfully processed, you\'ll receive a payment confirmation.',
    },
    {
      step: 5,
      title: 'Approval',
      description: 'Subsequently, your application undergoes an administrative review. Upon approval, you\'ll be notified that your application has been approved by the administration.',
    },
    {
      step: 6,
      title: 'Processing & Dispatch',
      description: 'Finally, once approved, your driving license application will be processed and dispatched to you accordingly.',
    },
  ],
};

export const faqItems = [
  {
    question: 'What documents are required for the online application process?',
    answer: [
      'Picture (Face)',
      'Scanned copy/picture of Original CNIC\'s front',
      'Scanned copy/picture of Original CNIC\'s back',
      'Medical Certificate signed by a government doctor in case age is above 50 years',
    ],
  },
  {
    question: 'How can I apply for an online learner driving license?',
    answer: [
      'Step 1: Create an account on the DLIMS licensing website',
      'Step 2: Fill out the application form',
      'Step 3: Upload documents',
      'Step 4: Generate PSID and pay through ATM, Online Banking or Mobile Banking channels.',
    ],
  },
  {
    question: 'What are the fees associated with applying for an online learner driving license?',
    answer: ['500 PKR for each category (Bike, Car etc.)'],
  },
  {
    question: 'How long does it take to receive the online learner driving license after applying?',
    answer: ['You can get the driving license instantly after filling the form and completing payment.'],
  },
  {
    question: 'How will I get/download my learner driving license after filling the form and making payment?',
    answer: ['Digital copy of the learner driving license will be available in your login which you created for applying.'],
  },
  {
    question: 'Are there any specific guidelines for uploading documents in the online application?',
    answer: ['Documents should be clear, within size constraints, and in the appropriate format (PDF, JPEG, etc.).'],
  },
];

export const footerContent = {
  logo: 'https://dlims.punjab.gov.pk/theme_new/assets/images/dastak_landing_logo.svg',
  secondaryLogo: 'https://dlims.punjab.gov.pk/theme_new/assets/images/dastak_landing_footer_logo.svg',
  description: 'The Driving License Information Management System (DLIMS) is an integrated component of the Government of Punjab\'s Dastak - One Window for all Government Services which securely carries out all DLIMS processes including form submission, verification, payment, and card tracking.',
  contacts: [
    { icon: 'phone', label: 'Emergency Number : 15', href: 'tel:15' },
    { icon: 'phone', label: 'Phone Number: 042-99202892', href: 'tel:042-99202892' },
    { icon: 'mail', label: 'Email: info@dlims.punjab.gov.pk', href: 'mailto:info@dlims.punjab.gov.pk' },
  ],
};

export const heroLicenseTypes = [
  'لرنر لائسنس',
  'ریگولر لائسنس',
  'بین الاقوامی لائسنس',
  'ای لائسنس',
];
