import { Template, build } from './build'
import ConfirmationMail from './templates/ConfirmationMail'

const templates: Template[] = [
  {
    name: 'confirmation',
    data: (
      <ConfirmationMail
        host="http://localhost:3000"
        dest="http://localhost:3000"
        mail="someone@example.com"
        support="help@example.com"
      />
    ),
  },
]

build(templates).catch((error) => {
  console.error(error)
  process.exit(1)
})
