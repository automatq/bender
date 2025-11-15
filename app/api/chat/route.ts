import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const responses: Record<string, string> = {
  // Pricing questions
  'how much': 'Our pricing starts at $2,500 for basic websites and goes up based on complexity. E-commerce sites and custom applications are priced individually. Contact us for a detailed quote!',
  'cost': 'Website packages start at $2,500 for standard sites. Custom projects are quoted based on requirements. Reach out to discuss your specific needs!',
  'price': 'We offer flexible pricing: Basic Sites ($2,500+), E-commerce Solutions (custom), Web Apps (custom). Let\'s talk about your budget!',
  
  // Services questions
  'what do you offer': 'We offer custom web design, responsive websites, e-commerce solutions, web applications, and ongoing support. All built with modern technologies like React and Next.js.',
  'services': 'Our services include: Website Design & Development, E-commerce Solutions, Web Applications, UI/UX Design, and Ongoing Support & Maintenance.',
  'what services': 'We specialize in: Custom Website Design, Responsive Web Development, E-commerce Platforms, Web Apps, and Maintenance Services.',
  
  // Timeline questions
  'how long': 'Most projects take 4-8 weeks depending on complexity. Simple sites may be quicker, while e-commerce and custom apps take longer. We\'ll give you a timeline during consultation.',
  'timeline': 'Typical timelines: Basic Sites (4 weeks), E-commerce (6-8 weeks), Custom Apps (8+ weeks). Let\'s discuss your specific project!',
  'how many weeks': 'Website development typically takes 4-8 weeks. Complex projects may take longer. We\'ll provide a detailed timeline after understanding your needs.',
  
  // Technology questions
  'technologies': 'We build with React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Firebase, and more modern frameworks.',
  'what technology': 'We use cutting-edge tech: Next.js, React, TypeScript, Tailwind CSS, Firebase, Stripe, and more.',
  'tech stack': 'Our tech stack: React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Firebase for backend, and Stripe for payments.',
  
  // Support questions
  'support': 'Yes! We offer ongoing maintenance and support packages to keep your site secure, fast, and up-to-date.',
  'maintenance': 'We provide maintenance packages including updates, security patches, performance optimization, and technical support.',
  'after launch': 'We don\'t disappear after launch! We offer support packages for maintenance, updates, and any issues that arise.',
  
  // General questions
  'hello': 'Hi! 👋 Welcome to EliteWeb! How can I help you today? Feel free to ask about our services, pricing, or timeline.',
  'hi': 'Hey there! 👋 What would you like to know about our web design services?',
  'help': 'I can help answer questions about: Services, Pricing, Timeline, Technologies, Support, and more. What interests you?',
  'contact': 'You can reach us through this form or visit our pricing page to learn more. We\'d love to hear about your project!',
  'email': 'You can submit your inquiry through this chat or visit our contact page. We respond within 24 hours!',
};

function findBestMatch(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for exact or close matches
  for (const [keyword, response] of Object.entries(responses)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  // Default response
  return 'Great question! For detailed information about your specific needs, I\'d recommend reaching out directly or visiting our pricing page. We\'re here to help! 😊';
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const response = findBestMatch(message);

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
