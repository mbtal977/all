import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@alloul.one' },
    update: {},
    create: { name: 'Demo User', email: 'demo@alloul.one', role: 'founder' }
  });

  const company = await prisma.company.upsert({
    where: { slug: 'alloul-labs' },
    update: {},
    create: { name: 'Alloul Labs', slug: 'alloul-labs', owner_id: user.id }
  });

  await prisma.companyMember.create({
    data: { company_id: company.id, user_id: user.id, role: 'owner', permissions: { full: true } }
  });

  const project = await prisma.project.create({
    data: {
      company_id: company.id,
      title: 'ALLoul One MVP',
      description: 'Build hybrid social/work/AI memory platform',
      status: 'active'
    }
  });

  await prisma.task.create({
    data: {
      project_id: project.id,
      title: 'Ship auth and company onboarding',
      description: 'Implement signup/login and invitation flow',
      assignee_id: user.id,
      priority: 'high',
      status: 'in_progress'
    }
  });

  await prisma.memoryThread.create({
    data: {
      company_id: company.id,
      project_id: project.id,
      type: 'project',
      summary: 'Kickoff completed. MVP priorities aligned.',
      links_json: { project_id: project.id }
    }
  });
}

main().finally(async () => prisma.$disconnect());
