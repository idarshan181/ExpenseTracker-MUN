import { AnimateInView } from '@/components/ui/animation';
import {
  BarChart3,
  FileSpreadsheet,
  FolderKanban,
  PieChart,
  Wallet,
} from 'lucide-react';

const features = [
  {
    icon: <Wallet className="size-6" />,
    title: 'Track Expenses',
    description: 'Add, remove, or edit transactions easily with our intuitive interface.',
    delay: 100,
  },
  {
    icon: <BarChart3 className="size-6" />,
    title: 'Budgeting Tools',
    description: 'Set personalized budgets and get alerts when you\'re approaching your limits.',
    delay: 200,
  },
  {
    icon: <FolderKanban className="size-6" />,
    title: 'Custom Categories',
    description: 'Create and manage your own expense categories to match your lifestyle.',
    delay: 300,
  },
  {
    icon: <PieChart className="size-6" />,
    title: 'Analytics & Insights',
    description: 'Gain valuable insights with interactive charts and detailed spending reports.',
    delay: 400,
  },
  {
    icon: <FileSpreadsheet className="size-6" />,
    title: 'Report Downloads',
    description: 'Export your transaction history as Excel files for offline access and review.',
    delay: 500,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative overflow-hidden py-24">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-16 text-center">
          <AnimateInView animation="fade-up">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Powerful Features
            </h2>
          </AnimateInView>
          <AnimateInView animation="fade-up" delay={100}>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Our comprehensive suite of tools helps you manage your finances with precision and ease.
            </p>
          </AnimateInView>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <AnimateInView
              key={index}
              animation="fade-up"
              delay={feature.delay}
            >
              <div className="flex h-full flex-col rounded-2xl p-6">
                <div className="mb-4 w-fit rounded-xl bg-primary/10 p-3">
                  <div className="text-primary">{feature.icon}</div>
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
