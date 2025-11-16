// @ts-check
import { ReflectionKind } from 'typedoc'
import { MarkdownPageEvent } from 'typedoc-plugin-markdown'

/**
 * @param {import('typedoc-plugin-markdown').MarkdownApplication} app
 */
export function load(app) {
  app.renderer.on(
    MarkdownPageEvent.BEGIN,
    /** @param {import('typedoc-plugin-markdown').MarkdownPageEvent} page */
    (page) => {
      if (page.filename === 'README.md') {
        page.frontmatter = {
          title: 'Overview',
          sidebar: { order: 0 },
          ...page.frontmatter,
        }
      }
      const frontmatterKinds = [
        ReflectionKind.Class,
        ReflectionKind.Function,
        ReflectionKind.Interface,
        ReflectionKind.Module,
        ReflectionKind.Enum,
        ReflectionKind.TypeAlias,
        ReflectionKind.ClassMember,
        ReflectionKind.SomeMember,
      ]
      if (frontmatterKinds.includes(page.model?.kind)) {
        page.frontmatter = {
          title: page.model?.name,
          ...page.frontmatter,
        }
      }
    },
  )
}
