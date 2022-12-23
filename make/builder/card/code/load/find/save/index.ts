import { NestInputType, api } from '~'

export function process_codeCard_load_find_save(
  input: NestInputType,
): void {
  input.nest.nest.forEach((nest, index) => {
    api.process_codeCard_load_find_save_nestedChildren({
      ...input,
      index,
      nest,
    })
  })
}

export function process_codeCard_load_find_save_nestedChildren(
  input: NestInputType,
): void {
  const type = api.determineNestType(input)
  if (type === 'static-term') {
  } else {
    api.throwError(api.generateUnhandledTermCaseError(input))
  }
}