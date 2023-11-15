import { Template, build } from './build'
import ConfirmationMail from './templates/ConfirmationMail'

const templates: Template[] = [
  {
    name: 'confirmation',
    data: (
      <ConfirmationMail
        host="https://ivy-chess.com"
        dest="{{ .ConfirmationURL }}"
        mail="{{ .Email }}"
        support="help@ivy-chess.com"
      />
    ),
  },
]

build(templates).catch((error) => {
  console.error(error)
  process.exit(1)
})
