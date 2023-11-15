import { render } from '@react-email/render'
import { writeFile } from 'fs/promises'
import path from 'path'

export interface Template {
  name: string
  data: JSX.Element
}

export async function build(templates: Template[]) {
  console.log('🚀 Compiling email templates...\n')

  for (const template of templates) {
    const html = render(template.data, { pretty: true })
    const file = path.resolve(__dirname, `./dist/${template.name}.html`)

    console.log(`📝 Writing '${template.name}' at "file://${file}"`)

    await writeFile(file, html)
  }

  console.log('\n🎉 Compiled all email templates!')
}
