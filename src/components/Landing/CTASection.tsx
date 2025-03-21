import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { AnimateInView } from '../ui/animation';

const benefits = [
  'Free 14-day trial, no credit card required',
  'Cancel anytime, no questions asked',
  'Unlimited expense tracking and categorization',
  'Secure cloud storage for your financial data',
];

const CTASection = () => {
  return (
    <section id="sign-up" className="relative overflow-hidden py-24">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10" />

      {/* Floating Elements */}
      <div className="absolute right-[15%] top-1/4 -z-10 size-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-1/3 left-[10%] -z-10 size-64 rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <AnimateInView animation="fade-up">
                  <h2 className=" mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                    Start Tracking
                    {' '}
                    <br />
                    <span className="text-primary">Your Expenses Today</span>
                  </h2>
                </AnimateInView>

                <AnimateInView animation="fade-up" delay={100}>
                  <p className="mb-8 text-muted-foreground">
                    Join thousands of users who have transformed their financial habits with our intuitive expense tracking tools.
                  </p>
                </AnimateInView>

                <AnimateInView animation="fade-up" delay={200}>
                  <form className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full"
                        required
                      />
                    </div>
                    <Button type="submit" className="group w-full">
                      Get Started
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </form>
                </AnimateInView>

                <AnimateInView animation="fade-up" delay={300} className="mt-6">
                  <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckCircle2 className="mr-2 size-4 shrink-0 text-primary" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </AnimateInView>
              </div>

              <div className="relative hidden md:block">
                <div className="absolute inset-0 bg-primary/90">
                  <div className="absolute inset-0 bg-[url('/app-screenshot.png')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                </div>
                <div className="relative flex h-full flex-col items-center justify-center p-12 text-white">
                  <AnimateInView animation="fade-up">
                    <div className="text-center">
                      <div className="mb-2 text-5xl font-bold">94%</div>
                      <p className="mb-8 text-white/90">of users report better financial awareness after 30 days</p>

                      <div className="mb-2 flex justify-center space-x-1">
                        {[...Array.from({ length: 5 })].map((_, i) => (
                          <svg
                            key={i}
                            className="size-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-white/80">Based on 1,246 reviews</p>
                    </div>
                  </AnimateInView>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
