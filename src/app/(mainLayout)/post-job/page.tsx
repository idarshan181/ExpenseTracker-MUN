/* eslint-disable react/no-array-index-key */
import { CreateJobForm } from '@/components/forms/CreateJobForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ArcjetLogo from '@/public/logos/arcjet.jpg';
import InngestLogo from '@/public/logos/inngest-locale.png';
import Image from 'next/image';

const companies = [
  {
    id: 0,
    name: 'ArcJet',
    logo: ArcjetLogo,
  },
  {
    id: 1,
    name: 'Inngest',
    logo: InngestLogo,
  },
  {
    id: 2,
    name: 'ArcJet',
    logo: ArcjetLogo,
  },
  {
    id: 3,
    name: 'Inngest',
    logo: InngestLogo,
  },
  {
    id: 4,
    name: 'ArcJet',
    logo: ArcjetLogo,
  },
  {
    id: 5,
    name: 'Inngest',
    logo: InngestLogo,
  },
];

const testimonials = [
  {
    quote:
      'We found our ideal candidate within 48 hours of posting. The quality of applicants was exceptional!',
    author: 'Sarah Chen',
    company: 'TechCorp',
  },
  {
    quote:
      'The platform made hiring remote talent incredibly simple. Highly recommended!',
    author: 'Mark Johnson',
    company: 'StartupX',
  },
  {
    quote:
      'We\'ve consistently found high-quality candidates here. It\'s our go-to platform for all our hiring needs.',
    author: 'Emily Rodriguez',
    company: 'InnovateNow',
  },
];

const stats = [
  { id: 0, value: '10k+', label: 'Monthly active job seekers' },
  { id: 1, value: '48h', label: 'Average time to hire' },
  { id: 2, value: '95%', label: 'Employer satisfaction rate' },
  { id: 3, value: '500+', label: 'Companies hiring monthly' },
];

export default function PostJobPage() {
  return (
    <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">

      <CreateJobForm />

      <div className="col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Trusted by Industry Leaders
            </CardTitle>
            <CardDescription>
              Join thousands of companies hiring top talent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {companies.map(company => (
                <div key={company.id}>
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={80}
                    height={80}
                    className="rounded-lg opacity-75 transition-opacity hover:opacity-100"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <blockquote key={index} className="border-l-2 border-primary pl-4">
                  <p className="text-sm italic text-muted-foreground">
                    "
                    {testimonial.quote}
                    {' '}
                    "
                  </p>
                  <footer className="mt-2 text-sm font-medium">
                    -
                    {' '}
                    {testimonial.author}
                    ,
                    {' '}
                    {testimonial.company}
                  </footer>
                </blockquote>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map(stat => (
                <div key={stat.id} className="rounded-lg bg-muted p-4">
                  <h4 className="text-2xl font-bold">{stat.value}</h4>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
