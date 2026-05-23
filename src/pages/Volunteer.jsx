import { useState } from 'react';
import { ArrowRight, Heart, Clock, Users, Star, CheckCircle, Shield, Truck, Wrench, Coffee, BookOpen, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { base44 } from '@/api/base44Client';
import { generateRefId } from '../lib/generateRefId';
import PageHero from '../components/shared/PageHero';
import SectionHeading from '../components/shared/SectionHeading';
import FormSuccess from '../components/shared/FormSuccess';

const volunteerRoles = [
  { icon: UserCheck, title: 'Mentor', desc: 'Meet 2 hours/month with a resident to provide guidance, accountability, and encouragement on their reentry journey.', commitment: '2 hrs/month' },
  { icon: Truck, title: 'Driver', desc: 'Transport residents to court dates, job interviews, medical appointments, and program activities across Austin.', commitment: 'Flexible' },
  { icon: Wrench, title: 'Skilled Trades', desc: 'Share your skills in plumbing, electrical, carpentry, HVAC, or general maintenance at our properties.', commitment: 'Project-based' },
  { icon: Coffee, title: 'Meal Provider', desc: 'Prepare or donate a meal for residents. Community meals build connection and show residents they are valued.', commitment: 'Weekly/Monthly' },
  { icon: BookOpen, title: 'Education Coach', desc: 'Help residents work through Pathways Hub OS classes, practice job interview skills, or improve their resume.', commitment: '2-4 hrs/month' },
  { icon: Shield, title: 'Legal or Medical Pro', desc: 'Offer your professional expertise in legal aid, healthcare, financial planning, or counseling on a pro bono basis.', commitment: 'As available' },
];

const impactStats = [
  { number: '140+', label: 'Classes in Pathways Hub OS' },
  { number: '3', label: 'Populations Served' },
  { number: '100%', label: 'Drug & Alcohol Free Housing' },
  { number: '0', label: 'Volunteers Turned Away' },
];

const steps = [
  { step: '01', title: 'Submit Your Interest', desc: 'Fill out the form below. Takes less than 3 minutes. Tell us your skills and availability.' },
  { step: '02', title: 'Complete Orientation', desc: 'Complete our free 7-class Volunteer Orientation through Pathways Hub OS. Covers trauma-informed care, confidentiality, and your role.' },
  { step: '03', title: 'Background Check', desc: 'Complete a background check. Required for all volunteers who interact with residents. Processed within 3-5 business days.' },
  { step: '04', title: 'Start Serving', desc: 'Get matched to opportunities that fit your skills and schedule. Log your hours and track your impact.' },
];

const skills = ['Mentor/Coach', 'Driver', 'Plumbing', 'Electrical', 'Carpentry', 'HVAC', 'Meal Preparation', 'Resume Help', 'Job Interview Coaching', 'Legal Aid', 'Medical/Healthcare', 'Financial Counseling', 'Administrative Support', 'Photography/Videography', 'Social Media', 'Other'];
const availability = ['Weekday Mornings', 'Weekday Afternoons', 'Weekday Evenings', 'Saturday', 'Sunday', 'On-Call/Flexible'];

export default function Volunteer() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedAvail, setSelectedAvail] = useState([]);
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '', bio: '', waiver: false });

  const toggleSkill = (s) => setSelectedSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleAvail = (a) => setSelectedAvail(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  const update = (f, v) => setForm(prev => ({ ...prev, [f]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.waiver) { alert('Please agree to the volunteer agreement to continue.'); return; }
    setLoading(true);
    const reference_id = generateRefId('VOL');
    await base44.entities.ContactSubmission.create({
      name: `${form.first_name} ${form.last_name}`,
      email: form.email,
      phone: form.phone,
      inquiry_type: 'Volunteer Interest',
      subject: 'Volunteer Application',
      message: `Skills: ${selectedSkills.join(', ')} | Availability: ${selectedAvail.join(', ')} | About: ${form.bio}`,
      reference_id,
      source: 'volunteer_page',
      status: 'new',
    });
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <>
      <PageHero
        eyebrow="Volunteer with HOH"
        title="Be the Hand That Lifts Someone Up"
        description="Veterans, returning citizens, and turned-out foster youth walk through our doors every day. They are rebuilding their lives — and they need people like you standing with them."
      />

      {/* Impact Stats */}
      <section className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-heading font-black text-secondary mb-1">{s.number}</div>
                <div className="text-xs text-white/70 font-display uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Why Volunteer" title="Your Time Changes Lives" desc="Every hour you give directly supports a person rebuilding their life. Here is what that looks like." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {volunteerRoles.map((role) => (
              <div key={role.title} className="bg-white border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <role.icon className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-heading font-bold text-lg text-primary mb-2">{role.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{role.desc}</p>
                <span className="inline-block text-xs font-display font-bold tracking-wide uppercase text-secondary bg-secondary/10 px-3 py-1 rounded-full">{role.commitment}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="The Process" title="How to Get Started" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {steps.map((s) => (
              <div key={s.step} className="relative">
                <div className="text-5xl font-heading font-black text-secondary/20 mb-3">{s.step}</div>
                <h3 className="font-heading font-bold text-base text-primary mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intake Form */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Apply Now" title="Volunteer Interest Form" desc="Tell us about yourself. Our volunteer coordinator will follow up within 2 business days." />
          {submitted ? (
            <div className="mt-10">
              <FormSuccess
                title="Application Received!"
                message="Thank you for stepping up. Our volunteer coordinator will reach out within 2 business days. In the meantime, you can get a head start on your orientation through Pathways Hub OS."
                referenceId=""
              />
              <div className="mt-6 p-6 bg-primary rounded-xl text-center">
                <h4 className="font-heading font-semibold text-white mb-2">Start Your Volunteer Orientation</h4>
                <p className="text-sm text-white/70 mb-4">Complete 7 free classes in Pathways Hub OS before your first shift.</p>
                <a href="https://pathwayshubos.org" target="_blank" rel="noreferrer">
                  <Button className="bg-secondary hover:bg-secondary/90 text-primary font-display text-xs uppercase tracking-wide">
                    Access Pathways Hub OS <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>First Name *</Label><Input required value={form.first_name} onChange={e => update('first_name', e.target.value)} /></div>
                <div><Label>Last Name *</Label><Input required value={form.last_name} onChange={e => update('last_name', e.target.value)} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Email *</Label><Input type="email" required value={form.email} onChange={e => update('email', e.target.value)} /></div>
                <div><Label>Phone</Label><Input value={form.phone} onChange={e => update('phone', e.target.value)} /></div>
              </div>

              <div>
                <Label className="mb-3 block">Skills I Can Offer *</Label>
                <div className="flex flex-wrap gap-2">
                  {skills.map(s => (
                    <button type="button" key={s} onClick={() => toggleSkill(s)}
                      className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                        selectedSkills.includes(s)
                          ? 'bg-secondary text-primary border-secondary'
                          : 'border-border text-muted-foreground hover:border-secondary'
                      }`}>{s}</button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-3 block">My Availability *</Label>
                <div className="flex flex-wrap gap-2">
                  {availability.map(a => (
                    <button type="button" key={a} onClick={() => toggleAvail(a)}
                      className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                        selectedAvail.includes(a)
                          ? 'bg-primary text-white border-primary'
                          : 'border-border text-muted-foreground hover:border-primary'
                      }`}>{a}</button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Tell us about yourself</Label>
                <Textarea rows={4} placeholder="What motivates you to volunteer? Any relevant experience?" value={form.bio} onChange={e => update('bio', e.target.value)} />
              </div>

              <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <input type="checkbox" id="waiver" className="mt-1" checked={form.waiver} onChange={e => update('waiver', e.target.checked)} />
                <label htmlFor="waiver" className="text-sm text-muted-foreground leading-relaxed">
                  I understand that volunteering with HOH Foundation requires a background check and completion of the Volunteer Orientation (Track 12) before interacting with residents. I agree to maintain confidentiality regarding all resident information.
                </label>
              </div>

              <Button type="submit" size="lg" disabled={loading || selectedSkills.length === 0}
                className="w-full bg-secondary hover:bg-secondary/90 text-primary font-display uppercase tracking-wide gap-2">
                {loading ? 'Submitting...' : 'Submit Volunteer Application'} <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Mission CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-10 h-10 text-secondary mx-auto mb-4" fill="currentColor" />
          <h2 className="font-heading font-bold text-3xl text-white mb-4">Every Person Deserves a Second Chance</h2>
          <p className="text-white/70 leading-relaxed mb-6">HOH Foundation exists because people believed in someone else&apos;s potential. That person is waiting for you to show up. Be the reason someone makes it.</p>
          <p className="text-sm text-white/50">Questions? Call us at <a href="tel:7372558355" className="text-secondary">737-255-8355</a> or email <a href="mailto:info@headquartersofhope.org" className="text-secondary">info@headquartersofhope.org</a></p>
        </div>
      </section>
    </>
  );
}
