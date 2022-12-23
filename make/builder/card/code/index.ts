import {
  Base,
  Mesh,
  MeshCodeCardInputType,
  MeshCodeCardType,
  NestInputType,
  Tree,
  api,
} from '~'

export * from './bear'
export * from './bind'
export * from './bond'
export * from './call'
export * from './face'
export * from './form'
export * from './fuse'
export * from './head'
export * from './hide'
export * from './hold'
export * from './host'
export * from './like'
export * from './link'
export * from './load'
export * from './note'
export * from './risk'
export * from './save'
export * from './show'
export * from './slot'
export * from './stem'
export * from './suit'
export * from './take'
export * from './task'
export * from './test'
export * from './time'
export * from './tree'
export * from './wait'
export * from './walk'
export * from './zone'

export function process_codeCard(
  base: Base,
  link: string,
): void {
  const text = api.readTextFile(base, link)
  const textTree = api.parseTextIntoTree(text)
  const linkHost = api.getLinkHost(link)
  const card = base.card(link)
  const seed: MeshCodeCardType = {
    allSuitMesh: {},
    allTaskMesh: {},
    allTestMesh: {},
    allTreeMesh: {},
    allZoneMesh: {},
    base,
    bearList: [],
    dependencyWatcherMap: new Map(),
    directory: linkHost,
    faceMesh: {},
    formMesh: {},
    hookMesh: {},
    hostMesh: {},
    like: Mesh.CodeCard,
    loadList: [],
    parseTree: textTree,
    path: link,
    publicFaceMesh: {},
    publicFormMesh: {},
    publicHostMesh: {},
    publicSuitMesh: {},
    publicTaskMesh: {},
    publicTestMesh: {},
    publicTreeMesh: {},
    publicZoneMesh: {},
    textByLine: text.split('\n'),
  }
  const input: MeshCodeCardInputType = {
    card: seed,
    fork: {
      data: seed,
      like: Mesh.Fork,
    },
  }

  card.bind(seed)

  api.assertNest(textTree)

  textTree.nest.forEach((nest, index) => {
    api.process_codeCard_nestedChildren({
      ...input,
      index,
      nest,
    })
  })

  // this.mintCodeCardMesh(fork)
}

export function process_codeCard_nestedChildren(
  input: NestInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case 'dynamic-text':
    case 'dynamic-term':
      api.throwError(
        api.generateUnhandledTermInterpolationError(input),
      )
      break
    case 'static-term':
      api.process_codeCard_nestedChildren_staticTerm(input)
      break
  }
}

export function process_codeCard_nestedChildren_staticTerm(
  input: NestInputType,
): void {
  const term = api.resolveStaticTerm(input)
  switch (term) {
    case 'bear': {
      api.process_codeCard_bear(input)
      break
    }
    case 'load': {
      api.process_codeCard_load(input)
      break
    }
    case 'fuse': {
      api.process_codeCard_fuse(input)
      break
    }
    case 'tree': {
      api.process_codeCard_tree(input)
      break
    }
    case 'face': {
      api.process_codeCard_face(input)
      break
    }
    case 'host': {
      api.process_codeCard_host(input)
      break
    }
    case 'form': {
      api.process_codeCard_form(input)
      break
    }
    case 'suit': {
      api.process_codeCard_suit(input)
      break
    }
    case 'task': {
      api.process_codeCard_task(input)
      break
    }
    case 'note': {
      api.process_codeCard_note(input)
      break
    }
    default: {
      api.throwError(api.generateUnknownTermError(input))
    }
  }
}
