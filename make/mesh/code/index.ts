import {
  Base,
  DEFAULT_CONTAINER_SCOPE,
  Mesh,
  MeshCodeModuleType,
  MeshFullType,
  Nest,
  NestCodeModuleType,
  code,
} from '~'
import type { MeshPartialType, SiteProcessInputType } from '~'

export * from './bear/index.js'
export * from './bind/index.js'
export * from './bond/index.js'
export * from './call/index.js'
export * from './face/index.js'
export * from './form/index.js'
export * from './fuse/index.js'
export * from './head/index.js'
export * from './hide/index.js'
export * from './hold/index.js'
export * from './hook/index.js'
export * from './host/index.js'
export * from './like/index.js'
export * from './link/index.js'
export * from './load/index.js'
export * from './note/index.js'
export * from './risk/index.js'
export * from './save/index.js'
export * from './show/index.js'
export * from './slot/index.js'
export * from './stem/index.js'
export * from './suit/index.js'
export * from './take/index.js'
export * from './task/index.js'
export * from './term/index.js'
export * from './test/index.js'
export * from './time/index.js'
export * from './tree/index.js'
export * from './void/index.js'
export * from './wait/index.js'
export * from './walk/index.js'
export * from './zone/index.js'

export function handle_codeCard(base: Base, link: string): void {
  if (link in base.cards) {
    return
  }
  code.process_codeCard(base, link)
  code.resolve_codeCard(base, link)
}

export function process_codeCard(base: Base, link: string): void {
  const parse = code.loadLinkModule(base, link)
  const card = base.card(link)
  const container = code.createContainerScope(DEFAULT_CONTAINER_SCOPE)
  const scope = code.createStepScope(container)
  const seed: NestCodeModuleType = {
    ...parse,
    base,
    children: [],
    like: Nest.CodeModule,
    scope,
  }

  const input: SiteProcessInputType = code.createInput(
    base,
    seed,
    scope,
    seed,
    seed,
  )

  card.bind(seed)

  if (seed.text.trim()) {
    code.processNestedChildren(
      input,
      seed.link,
      code.process_codeCard_nestedChildren,
    )
  }
}

export function process_codeCard_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case 'dynamic-text':
    case 'dynamic-term':
      code.throwError(
        code.generateUnhandledTermInterpolationError(input),
      )
      break
    case 'static-term':
      code.process_codeCard_nestedChildren_staticTerm(input)
      break
    default: {
      code.throwError(code.generateUnhandledNestCaseError(input, type))
    }
  }
}

export function process_codeCard_nestedChildren_staticTerm(
  input: SiteProcessInputType,
): void {
  const term = code.resolveTerm(input)
  switch (term) {
    case 'bear': {
      code.process_codeCard_bear(input)
      break
    }
    case 'load': {
      code.process_codeCard_load(input)
      break
    }
    case 'fuse': {
      code.process_codeCard_fuse(input)
      break
    }
    case 'tree': {
      code.process_codeCard_tree(input)
      break
    }
    case 'face': {
      code.process_codeCard_face(input)
      break
    }
    case 'host': {
      code.process_codeCard_host(input)
      break
    }
    case 'form': {
      code.process_codeCard_form(input)
      break
    }
    case 'suit': {
      code.process_codeCard_suit(input)
      break
    }
    case 'task': {
      code.process_codeCard_task(input)
      break
    }
    case 'note': {
      code.process_codeCard_note(input)
      break
    }
    default: {
      code.throwError(code.generateUnhandledTermCaseError(input))
    }
  }
}

export function resolve_codeCard(base: Base, link: string): void {
  const card = base.card(link)

  if (code.isNest(card.seed, Nest.CodeModule)) {
    if (code.childrenAreMesh(card.seed)) {
      const seed: MeshCodeModuleType = {
        allClassInterfaceMesh: {},
        allClassMesh: {},
        allComponentMesh: {},
        allConstantMesh: {},
        allFunctionMesh: {},
        allTemplateMesh: {},
        allTestMesh: {},
        base: card.seed.base,
        callbackMesh: {},
        complete: false,
        constantMesh: {},
        directory: card.seed.directory,
        exportList: [],
        importTree: [],
        like: Mesh.CodeModule,
        link: card.seed.link,
        nativeClassInterfaceMesh: {},
        path: card.seed.path,
        publicClassInterfaceMesh: {},
        publicClassMesh: {},
        publicComponentMesh: {},
        publicConstantMesh: {},
        publicFunctionMesh: {},
        publicNativeClassInterfaceMesh: {},
        publicTemplateMesh: {},
        publicTestMesh: {},
        scope: card.seed.scope,
        text: card.seed.text,
        textByLine: card.seed.textByLine,
      }

      card.seed.children.forEach(node => {
        switch (node.like) {
          case Mesh.Constant: {
            code.assertMesh(node, Mesh.Constant)
            if (!node.hidden) {
              seed.publicConstantMesh[node.name] = node
            }
            seed.allConstantMesh[node.name] = node
            break
          }
          case Mesh.ClassInterface: {
            code.assertMesh(node, Mesh.ClassInterface)
            if (!node.hidden) {
              seed.publicClassInterfaceMesh[node.name] = node
            }
            seed.allClassInterfaceMesh[node.name] = node
            break
          }
          case Mesh.Function: {
            code.assertMesh(node, Mesh.Function)
            if (!node.hidden) {
              seed.publicFunctionMesh[node.name] = node
            }
            seed.allFunctionMesh[node.name] = node
            break
          }
          case Mesh.Class: {
            code.assertMesh(node, Mesh.Class)
            if (!node.hidden) {
              seed.publicClassMesh[node.name] = node
            }
            seed.allClassMesh[node.name] = node
            break
          }
          case Mesh.Template: {
            code.assertMesh(node, Mesh.Template)
            if (!node.hidden) {
              seed.publicTemplateMesh[node.name] = node
            }
            seed.allTemplateMesh[node.name] = node
            break
          }
          case Mesh.Import: {
            code.assertMesh(node, Mesh.Import)
            seed.importTree.push(node)
            break
          }
          case Mesh.Export: {
            code.assertMesh(node, Mesh.Export)
            seed.exportList.push(node)
            break
          }
          default:
            code.throwError(
              code.generatedNotImplementedYetError(node.like),
            )
        }
      })

      const input: SiteProcessInputType = code.createInput(
        base,
        card.seed,
        card.seed.scope,
        card.seed,
        card.seed,
      )

      code.replaceSeed(input, seed)

      seed.importTree.forEach(node => {
        // HACK: TODO: figure out how to get the different file types.
        if (
          node.absolutePath.match('/drumwork/deck/([^/]+)/base.link')
        ) {
          code.handle_deckCard(seed.base, node.absolutePath)
        } else {
          code.handle_codeCard(seed.base, node.absolutePath)
        }
      })

      seed.exportList.forEach(node => {
        // HACK: TODO: figure out how to get the different file types.
        if (
          node.absolutePath.match('/drumwork/deck/([^/]+)/base.link')
        ) {
          code.handle_deckCard(seed.base, node.absolutePath)
        } else {
          code.handle_codeCard(seed.base, node.absolutePath)
        }
      })
    } else {
      card.seed.children.forEach(node => {
        switch (node.like) {
          case Nest.Import:
            break
          case Nest.Export:
            break
          case Nest.Class: {
            break
          }
          case Nest.Function: {
            break
          }
          case Nest.Template: {
            break
          }
          case Nest.Inject: {
            break
          }
          case Mesh.Import:
            if (
              node.absolutePath.match(
                '/drumwork/deck/([^/]+)/base.link',
              )
            ) {
              code.handle_deckCard(base, node.absolutePath)
            } else {
              code.handle_codeCard(base, node.absolutePath)
            }
            break
          case Mesh.Export:
            break
          case Mesh.Class: {
            break
          }
          case Mesh.Function: {
            break
          }
          case Mesh.Template: {
            break
          }
          case Mesh.Inject: {
            break
          }
          default:
            code.throwError(
              code.generatedNotImplementedYetError(node.like),
            )
        }
      })
    }
  }
}
