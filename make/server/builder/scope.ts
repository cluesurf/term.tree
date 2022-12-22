import {
  Scope,
  ScopeAliasType,
  ScopeKeyListType,
  ScopeSetType,
  ScopeTableType,
  ScopeType,
  ScopeValueType,
} from '~server/type'

export function extendScope<
  S extends Scope,
  P extends unknown = unknown,
>(
  like: S,
  data: ScopeTableType[S],
  parent?: P extends ScopeType<infer T extends Scope, infer Q>
    ? ScopeType<T, Q>
    : never,
): ScopeType<S, P> {
  return { data, like, parent }
}

export function getPropertyValueFromScope<
  L extends Scope,
  S extends ScopeType<L>,
  K extends ScopeKeyListType<L, S>,
>(scope: S, path: K): ScopeValueType<L, S, K> | undefined {
  let source: ScopeAliasType<S> | undefined = scope

  while (source) {
    if (path in source.data) {
      break
    } else {
      source = source.parent
    }
  }

  if (!source) {
    return
  }

  return source.data[path]
}

export function setPropertyValueOnScope<
  L extends Scope,
  S extends ScopeType<L>,
  K extends ScopeKeyListType<L, S>,
>(scope: S, property: K, value: ScopeValueType<L, S, K>): void {
  if (property in scope.data) {
    scope.data[property] = value
  } else if (scope.parent) {
    setPropertyValueOnScope(scope.parent, property, value)
  } else {
    throw new Error(`Property not defined on scope`)
  }
}
