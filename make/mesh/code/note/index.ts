import { LinkHint, code } from '~'
import type { MeshInputType } from '~'

export function process_codeCard_note(
  input: MeshInputType,
): void {
  code.assumeNest(input).nest.forEach((nest, index) => {
    process_codeCard_note_nestedChildren(
      code.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_note_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.StaticText:
      break
    default:
      code.throwError(
        code.generateUnhandledTermCaseError(input),
      )
  }
}