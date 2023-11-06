import UserInfoCard from '@/components/(card)/UserInfoCard/UserInfoCard'
import Section from '@/components/(view)/SectionedView/Section'
import SectionedView from '@/components/(view)/SectionedView/SectionedView'
import UserActionsView from '@/components/(view)/UserActionsView/UserActionsView'
import UserManagementView from '@/components/(view)/UserManagementView/UserManagementView'
import { isManager } from '@/lib/api/auth/access/roles'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { AuthClient } from '@/lib/api/clients/AuthClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ivy - Profile',
  description: 'Your account with Ivy',
}

export default async function Profile() {
  const strategy = serverStrategy()
  const client = new AuthClient(strategy)
  const profile = await client.profile()
  const edit = await isManager(strategy)

  if (!profile.success) {
    throw new Error(profile.error.message)
  }

  return (
    <article className="p-4">
      <UserInfoCard
        name={profile.result.name}
        email={profile.result.email}
        role={profile.result.role}
      />
      <SectionedView>
        <Section title="Actions">
          <UserActionsView />
        </Section>
        {edit && (
          <Section title="Manage Users">
            <UserManagementView />
          </Section>
        )}
      </SectionedView>
    </article>
  )
}
