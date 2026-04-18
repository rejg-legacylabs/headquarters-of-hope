import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Try to get authenticated user (optional for public forms)
    let user = null;
    try {
      user = await base44.auth.me();
    } catch (e) {
      // Public submission — no auth required
    }

    const payload = await req.json();
    const { type } = payload;

    // Validate required fields
    if (!type) {
      return Response.json({ error: 'Missing required field: type' }, { status: 400 });
    }

    let result = null;
    const timestamp = new Date().toISOString();

    // Route by intake type
    switch (type) {
      case 'resident_application':
        result = await processResidentApplication(base44, payload, timestamp);
        break;
      case 'partner_referral':
        result = await processPartnerReferral(base44, payload, timestamp);
        break;
      case 'employer_intake':
        result = await processEmployerIntake(base44, payload, timestamp);
        break;
      case 'resource_provider':
        result = await processResourceProvider(base44, payload, timestamp);
        break;
      default:
        return Response.json({ error: `Unknown intake type: ${type}` }, { status: 400 });
    }

    return Response.json({
      success: true,
      type,
      reference_id: result.reference_id,
      entity_id: result.entity_id,
      timestamp,
    });
  } catch (error) {
    console.error('processIntakeSubmission error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function processResidentApplication(base44, payload, timestamp) {
  const {
    first_name, last_name, dob, phone, email, housing_status, employment_status, notes, source
  } = payload;

  // Validate required fields with better error messages
  if (!first_name?.trim() || !last_name?.trim()) {
    throw new Error('First name and last name are required');
  }
  if (!phone?.trim() && !email?.trim()) {
    throw new Error('At least one contact method (phone or email) is required');
  }

  // Create WebsiteIntake record
  const reference_id = `INT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const intake = await base44.asServiceRole.entities.WebsiteIntake.create({
    first_name: first_name.trim(),
    last_name: last_name.trim(),
    date_of_birth: dob || null,
    phone: phone.trim(),
    email: email?.trim() || null,
    current_situation: notes || '',
    primary_needs: ['Employment', 'Housing'].filter(n => {
      if (n === 'Employment' && employment_status === 'seeking') return true;
      if (n === 'Housing' && housing_status === 'seeking') return true;
      return false;
    }),
    housing_need: housing_status === 'seeking',
    employment_need: employment_status === 'seeking',
    consent_to_contact: true,
    reference_id,
    source: source || 'website',
    status: 'pending_review',
  });

  // Log submission
  console.log(`✓ Resident application created: ${reference_id} (${intake.id})`);

  return { reference_id, entity_id: intake.id };
}

async function processPartnerReferral(base44, payload, timestamp) {
  const {
    partner_name, partner_organization, partner_email, partner_phone,
    resident_first_name, resident_last_name, resident_dob, resident_phone, resident_email,
    referral_notes, source
  } = payload;

  // Validate required fields
  if (!partner_name?.trim() || !partner_organization?.trim()) {
    throw new Error('Partner name and organization are required');
  }
  if (!resident_first_name?.trim() || !resident_last_name?.trim()) {
    throw new Error('Participant first name and last name are required');
  }
  if (!partner_email?.trim() && !partner_phone?.trim()) {
    throw new Error('At least one partner contact method (email or phone) is required');
  }

  // Create PartnerReferral record
  const reference_id = `REF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const referral = await base44.asServiceRole.entities.PartnerReferral.create({
    referrer_name: partner_name.trim(),
    referrer_organization: partner_organization.trim(),
    referrer_email: partner_email?.trim() || null,
    referrer_phone: partner_phone?.trim() || null,
    participant_first_name: resident_first_name.trim(),
    participant_last_name: resident_last_name.trim(),
    participant_phone: resident_phone?.trim() || null,
    participant_email: resident_email?.trim() || null,
    reason_for_referral: referral_notes || '',
    primary_needs: extractNeeds(referral_notes),
    urgency: 'Standard',
    consent_obtained: true,
    reference_id,
    source: source || 'website_partner_referral',
    status: 'pending_review',
  });

  // Log submission
  console.log(`✓ Partner referral created: ${reference_id} (${referral.id})`);

  return { reference_id, entity_id: referral.id };
}

async function processEmployerIntake(base44, payload, timestamp) {
  const {
    company_name, contact_name, contact_email, contact_phone, job_title, job_description, job_type, pay_range, location, source
  } = payload;

  // Validate required fields
  if (!company_name?.trim() || !contact_name?.trim()) {
    throw new Error('Company name and contact name are required');
  }
  if (!contact_email?.trim() && !contact_phone?.trim()) {
    throw new Error('At least one contact method (email or phone) is required');
  }

  // Create EmployerInquiry record
  const reference_id = `EMP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const inquiry = await base44.asServiceRole.entities.EmployerInquiry.create({
    company_name: company_name.trim(),
    contact_name: contact_name.trim(),
    contact_email: contact_email?.trim() || null,
    contact_phone: contact_phone?.trim() || null,
    industry: extractIndustry(job_type),
    company_size: 'Unknown',
    interest_type: job_type ? job_type.split(',').map(t => t.trim()) : ['Hire Participants'],
    positions_available: `${job_title || 'Various'} - ${pay_range || 'Competitive'}`,
    second_chance_friendly: true,
    additional_notes: job_description || '',
    reference_id,
    source: source || 'website_employer',
    status: 'pending_review',
  });

  // Log submission
  console.log(`✓ Employer inquiry created: ${reference_id} (${inquiry.id})`);

  return { reference_id, entity_id: inquiry.id };
}

async function processResourceProvider(base44, payload, timestamp) {
  const {
    organization_name, contact_name, contact_email, contact_phone, services_offered, service_area, notes, source
  } = payload;

  // Validate required fields
  if (!organization_name?.trim() || !contact_name?.trim()) {
    throw new Error('Organization name and contact name are required');
  }
  if (!contact_email?.trim() && !contact_phone?.trim()) {
    throw new Error('At least one contact method (email or phone) is required');
  }

  // Create WebsitePartnerInquiry record
  const reference_id = `PROV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const inquiry = await base44.asServiceRole.entities.WebsitePartnerInquiry.create({
    organization_name: organization_name.trim(),
    contact_name: contact_name.trim(),
    contact_email: contact_email?.trim() || null,
    contact_phone: contact_phone?.trim() || null,
    organization_type: extractOrgType(services_offered),
    service_area: service_area?.trim() || 'Statewide',
    partnership_interest: ['Resource Sharing', 'Co-Programming'],
    how_they_want_to_help: services_offered?.trim() || '',
    notes: notes?.trim() || '',
    reference_id,
    source: source || 'website_provider',
    status: 'new',
  });

  // Log submission
  console.log(`✓ Resource provider registered: ${reference_id} (${inquiry.id})`);

  return { reference_id, entity_id: inquiry.id };
}

// Helper functions
function extractNeeds(text) {
  if (!text) return [];
  const needKeywords = {
    'Employment': ['employment', 'job', 'work', 'career'],
    'Housing': ['housing', 'home', 'shelter', 'accommodation'],
    'Transportation': ['transport', 'ride', 'car', 'bus'],
    'Document Assistance': ['document', 'id', 'ssn', 'birth certificate'],
  };

  const found = [];
  Object.entries(needKeywords).forEach(([need, keywords]) => {
    if (keywords.some(kw => text.toLowerCase().includes(kw))) {
      found.push(need);
    }
  });
  return found.length > 0 ? found : ['Other'];
}

function extractIndustry(jobType) {
  if (!jobType) return 'Other';
  if (jobType.toLowerCase().includes('tech')) return 'Technology';
  if (jobType.toLowerCase().includes('construction')) return 'Construction';
  if (jobType.toLowerCase().includes('healthcare')) return 'Healthcare';
  if (jobType.toLowerCase().includes('retail')) return 'Retail';
  return 'Other';
}

function extractOrgType(services) {
  if (!services) return 'Community Group';
  const text = services.toLowerCase();
  if (text.includes('housing')) return 'Nonprofit';
  if (text.includes('healthcare') || text.includes('medical')) return 'Healthcare Provider';
  if (text.includes('government') || text.includes('agency')) return 'Government Agency';
  if (text.includes('faith') || text.includes('church')) return 'Faith-Based Organization';
  return 'Nonprofit';
}