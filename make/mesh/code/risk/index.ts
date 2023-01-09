import { Link, LinkHint, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_risk(
  input: SiteProcessInputType,
): void {
  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_risk_nestedChildren(
      code.withEnvironment(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_risk_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.StaticText:
      break
    default:
      code.throwError(code.generateUnhandledTermCaseError(input))
  }
}
