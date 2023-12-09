import CreateGameForm from '@/components/(form)/CreateGameForm/CreateGameForm'

export const metadata = {
  title: 'Ivy - Create Game',
  description: 'Create a new live game',
}

export default async function AddGame() {
  return <CreateGameForm />
}
