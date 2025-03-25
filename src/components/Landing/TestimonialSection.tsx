import { cn } from '@/lib/utils';
import { AnimateInView } from '../ui/animation';

const testimonials = [
  {
    quote: 'ExpenseVision has completely transformed how I manage my finances. The insights have helped me save $400 monthly.',
    name: 'Emma Johnson',
    title: 'Marketing Director',
    delay: 100,
  },
  {
    quote: 'The budgeting tools are incredibly intuitive. I\'ve never had such clarity about where my money is going.',
    name: 'Michael Chen',
    title: 'Software Engineer',
    delay: 200,
  },
  {
    quote: 'I love how I can customize categories to match my specific needs. It\'s made tracking expenses actually enjoyable.',
    name: 'Sophia Martinez',
    title: 'Freelance Designer',
    delay: 300,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative overflow-hidden py-24">

      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-16 text-center">
          <AnimateInView animation="fade-up">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              What Our Users Say
            </h2>
          </AnimateInView>
          <AnimateInView animation="fade-up" delay={100}>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Join thousands of satisfied users who have transformed their financial habits.
            </p>
          </AnimateInView>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <AnimateInView
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              animation="fade-up"
              delay={testimonial.delay}
              className={cn(
                index === 1 ? 'md:transform md:-translate-y-4' : '',
              )}
            >
              <div className="relative flex h-full flex-col rounded-2xl p-8">
                <svg
                  className="absolute right-6 top-6 size-8 text-primary/20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.96.41-3.03.32-1.06.799-2.052 1.439-2.976.64-.925 1.4-1.685 2.28-2.282.88-.597 1.81-.975 2.79-1.135.404-.074.773.17.773.615 0 1.256-.37 2.382-1.108 3.378-.738.997-1.98 1.71-3.726 2.137.19.307.396.584.615.838.34.355.77.65 1.29.888.52.24 1.07.36 1.63.36 1.63 0 2.46-.952 2.46-2.856 0-.76-.21-1.398-.63-1.917-.42-.52-.96-.78-1.63-.78-.16 0-.39.03-.69.09-.23.06-.56.12-.9.18-.253.047-.468-.188-.392-.435.285-.935.773-1.804 1.467-2.598.69-.795 1.56-1.413 2.6-1.854 1.03-.44 2.21-.66 3.55-.66.76 0 1.4.13 1.94.39s.98.6 1.32 1.03c.34.43.6.94.78 1.54.18.6.27 1.22.27 1.86 0 2.01-.55 3.48-1.65 4.39-1.1.91-2.58 1.36-4.44 1.36-.56 0-1.11-.08-1.66-.23-.55-.15-1.05-.38-1.5-.69-.45-.31-.84-.68-1.17-1.12-.3-.45-.54-.94-.7-1.48-.1.02-1.62 2.87-1.63 2.91-.07.12-.22.18-.36.14-.09-.02-.17-.06-.24-.12-.6.56-1.29.92-2.07 1.09-.79.17-1.56.11-2.31-.16-.771-.297-1.394-.818-1.87-1.56-.476-.745-.714-1.64-.714-2.687 0-1.024.24-1.917.714-2.676.476-.758 1.1-1.307 1.87-1.645.77-.34 1.54-.425 2.31-.255.78.17 1.47.55 2.07 1.13-.08-.11-.03-.99.03-2.578.06-1.582.42-3.32 1.09-5.22.38-1.07 1.64-1.41 2.5-.69.88.73 1.69 1.5 2.42 2.33.74.82 1.34 1.71 1.8 2.65.46.94.77 1.91.93 2.93.16 1.02.05 2.05-.33 3.08 0 0-1.77 4.15-1.81 4.26-.04.12-.13.21-.25.23-.12.02-.22-.01-.31-.09l-1.45-1.38c-.4.99-.94 1.76-1.62 2.31-.68.54-1.51.82-2.47.82-1.76 0-2.64-.82-2.64-2.46Zm9.467-12.01c0-.83.22-1.448.66-1.854.44-.406 1-.61 1.68-.61.74 0 1.33.214 1.77.64.44.427.66 1.035.66 1.824 0 .787-.22 1.413-.66 1.875-.44.465-1.03.698-1.77.698-.68 0-1.24-.226-1.68-.677-.44-.45-.66-1.085-.66-1.895Z" />
                </svg>
                <p className="mb-6 text-lg">{testimonial.quote}</p>
                <div className="mt-auto">
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>

        <AnimateInView animation="fade-up" delay={400} className="mt-12 text-center">
          <div className="inline-block rounded-2xl p-6">
            <div className="flex items-center justify-center space-x-1">
              {[...Array.from({ length: 5 })].map((_, i) => (
                <svg
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  className="size-5 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              ))}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Rated 4.8/5 from over 1,200 reviews</p>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
};

export default TestimonialsSection;
