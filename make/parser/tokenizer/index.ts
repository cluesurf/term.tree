import { api } from '~'

export enum Text {
  CloseEvaluation = 'text-close-evaluation',
  CloseInterpolation = 'text-close-interpolation',
  CloseParenthesis = 'text-close-parenthesis',
  CloseText = 'text-close-text',
  Comma = 'text-comma',
  Comment = 'text-comment',
  Decimal = 'text-decimal',
  Hashtag = 'text-hashtag',
  Line = 'text-line',
  OpenEvaluation = 'text-open-evaluation',
  OpenIndentation = 'text-open-indentation',
  OpenInterpolation = 'text-open-interpolation',
  OpenNesting = 'text-open-nesting',
  OpenParenthesis = 'text-open-parenthesis',
  OpenText = 'text-open-text',
  Path = 'text-path',
  SignedInteger = 'text-signed-integer',
  String = 'text-string',
  TermFragment = 'text-term-fragment',
  UnsignedInteger = 'text-unsigned-integer',
}

// eslint-disable-next-line sort-exports/sort-exports
export const TEXT_TYPE = [
  Text.CloseEvaluation,
  Text.CloseInterpolation,
  Text.CloseParenthesis,
  Text.CloseText,
  Text.Comma,
  Text.Comment,
  Text.Decimal,
  Text.Hashtag,
  Text.Line,
  Text.OpenEvaluation,
  Text.OpenIndentation,
  Text.OpenInterpolation,
  Text.OpenNesting,
  Text.OpenParenthesis,
  Text.OpenText,
  Text.Path,
  Text.SignedInteger,
  Text.String,
  Text.TermFragment,
  Text.UnsignedInteger,
]

// eslint-disable-next-line sort-exports/sort-exports
export const TEXT_PATTERN_LIST = [
  Text.CloseEvaluation,
  Text.CloseInterpolation,
  Text.CloseParenthesis,
  Text.CloseText,
  Text.Comma,
  Text.Comment,
  Text.Decimal,
  Text.Hashtag,
  Text.OpenEvaluation,
  Text.OpenIndentation,
  Text.OpenInterpolation,
  Text.OpenNesting,
  Text.OpenParenthesis,
  Text.OpenText,
  Text.Path,
  Text.SignedInteger,
  Text.TermFragment,
  Text.UnsignedInteger,
]

// eslint-disable-next-line sort-exports/sort-exports
export const TEXT_STRING_PATTERN_LIST = [
  Text.CloseInterpolation,
  Text.CloseText,
  Text.String,
]

export type TextCloseEvaluationTokenType = TextTokenBaseType & {
  like: Text.CloseEvaluation
}

export type TextInputType = {
  path: string
  text: string
}

type TextLineTokenType = TextTokenBaseType & {
  like: Text.Line
}

type TextOpenIndentationTokenType = TextTokenBaseType & {
  like: Text.OpenIndentation
}

type TextDecimalTokenType = TextTokenBaseType & {
  like: Text.Decimal
}

type TextSignedIntegerTokenType = TextTokenBaseType & {
  like: Text.SignedInteger
}

type TextUnsignedIntegerTokenType = TextTokenBaseType & {
  like: Text.UnsignedInteger
}

type TextOpenNestingTokenType = TextTokenBaseType & {
  like: Text.OpenNesting
}

type TextOpenParenthesisTokenType = TextTokenBaseType & {
  like: Text.OpenParenthesis
}

type TextCloseParenthesisTokenType = TextTokenBaseType & {
  like: Text.CloseParenthesis
}

type TextOpenTextTokenType = TextTokenBaseType & {
  like: Text.OpenText
}

type TextCloseTextTokenType = TextTokenBaseType & {
  like: Text.CloseText
}

type TextOpenInterpolationTokenType = TextTokenBaseType & {
  like: Text.OpenInterpolation
}

type TextCloseInterpolationTokenType = TextTokenBaseType & {
  like: Text.CloseInterpolation
}

export type TextLineRangeType = {
  character: number
  line: number
}

type TextOpenNestTokenType = TextTokenBaseType & {
  like: Text.OpenEvaluation
}

type TextCloseNestTokenType = TextTokenBaseType & {
  like: Text.CloseEvaluation
}

type TextCommaTokenType = TextTokenBaseType & {
  like: Text.Comma
}

type TextHashtagTokenType = TextTokenBaseType & {
  like: Text.Hashtag
}

type TextCommentTokenType = TextTokenBaseType & {
  like: Text.Comment
}

export type TextOpenEvaluationTokenType = TextTokenBaseType & {
  like: Text.OpenEvaluation
}

export type TextPathTokenType = TextTokenBaseType & {
  like: Text.Path
}

export type TextPatternConfigType = {
  pattern: RegExp
}

export type TextRangeType = {
  end: number
  start: number
}

export type TextResultType = TextSplitInputType & {
  tokenList: Array<TextTokenType<Text>>
}

export type TextSplitInputType = TextInputType & {
  textInLines: Array<string>
}

export enum TextState {
  Text = 'text',
  Tree = 'tree',
}

export type TextStringTokenType = TextTokenBaseType & {
  like: Text.String
}

export type TextTermFragmentTokenType = TextTokenBaseType & {
  like: Text.TermFragment
}

export type TextTokenBaseType = {
  end: TextLineRangeType
  offset: TextRangeType
  start: TextLineRangeType
  text: string
}

const PATTERN: Record<Text, TextPatternConfigType> = {
  [Text.CloseEvaluation]: {
    pattern: /^ *\] */,
  },
  [Text.CloseInterpolation]: {
    pattern: /^\}+/,
  },
  [Text.CloseParenthesis]: {
    pattern: /^\)/,
  },
  [Text.CloseText]: {
    pattern: /^>/,
  },
  [Text.Comma]: {
    pattern: /^, +/,
  },
  [Text.Comment]: {
    pattern: /^# [^\n]+/,
  },
  [Text.Decimal]: {
    pattern: /^-?\d+\.\d+/,
  },
  [Text.Hashtag]: {
    pattern: /^#\w+/,
  },
  [Text.Line]: {
    pattern: /^\n/,
  },
  [Text.OpenEvaluation]: {
    pattern: /^ *\[ */,
  },
  [Text.OpenIndentation]: {
    pattern: /^  /,
  },
  [Text.OpenInterpolation]: {
    pattern: /^\{+/,
  },
  [Text.OpenNesting]: {
    pattern: /^ /,
  },
  [Text.OpenParenthesis]: {
    pattern: /^\(/,
  },
  [Text.OpenText]: {
    pattern: /^</,
  },
  [Text.Path]: {
    pattern:
      /^(?:(?:@[^\s\/]+(?:\/[^\s\/]*)*)|(?:\.{1,2}(?:\/[^\s\/]*)*)|(?:\/[^\s\/]+)+)/,
  },
  [Text.SignedInteger]: {
    pattern: /^-\d+(?=\b)/,
  },
  [Text.TermFragment]: {
    pattern:
      /^-?(?:[*~]?[a-z][a-z0-9]*(?:-[a-z0-9]+)*\??)(?:\/[a-z][a-z0-9]*(?:-[a-z0-9]+)*\??)*-?/,
  },
  [Text.UnsignedInteger]: {
    pattern: /^\d+(?=\b)/,
  },
  // eslint-disable-next-line sort-keys/sort-keys-fix
  [Text.String]: {
    pattern: /^(?:\\[<>\{\}])+|[^\{>\\]+/,
  },
}

export type TextTokenMappingType = {
  'text-close-evaluation': TextCloseEvaluationTokenType
  'text-close-interpolation': TextCloseInterpolationTokenType
  'text-close-parenthesis': TextCloseParenthesisTokenType
  'text-close-text': TextCloseTextTokenType
  'text-comma': TextCommaTokenType
  'text-comment': TextCommentTokenType
  'text-decimal': TextDecimalTokenType
  'text-hashtag': TextHashtagTokenType
  'text-line': TextLineTokenType
  'text-open-evaluation': TextOpenEvaluationTokenType
  'text-open-indentation': TextOpenIndentationTokenType
  'text-open-interpolation': TextOpenInterpolationTokenType
  'text-open-nesting': TextOpenNestingTokenType
  'text-open-parenthesis': TextOpenParenthesisTokenType
  'text-open-text': TextOpenTextTokenType
  'text-path': TextPathTokenType
  'text-signed-integer': TextSignedIntegerTokenType
  'text-string': TextStringTokenType
  'text-term-fragment': TextTermFragmentTokenType
  'text-unsigned-integer': TextUnsignedIntegerTokenType
}

export type TextTokenType<T extends Text> =
  TextTokenMappingType[T]

export function tokenizeLinkText(
  input: TextInputType,
): TextResultType {
  const tokenList: Array<TextTokenType<Text>> = []

  let source: TextSplitInputType = {
    ...input,
    textInLines: input.text.split('\n'),
  }

  let typeStack = [TextState.Tree]

  let line = 0
  let character = 0
  let offset = 0

  let i = 0
  lineLoop: for (let textLine of source.textInLines) {
    processLoop: while (textLine) {
      const state: TextState =
        typeStack[typeStack.length - 1] || TextState.Tree

      const patternList =
        state === TextState.Tree
          ? TEXT_PATTERN_LIST
          : TEXT_STRING_PATTERN_LIST

      patternLoop: for (const type of patternList) {
        const config = PATTERN[type as Text]
        if (config && config.pattern instanceof RegExp) {
          const match = textLine.match(config.pattern)
          if (match) {
            const matchedLength = match[0].length
            const matchedText = textLine.slice(0, matchedLength)
            const token: TextTokenType<Text> = {
              end: {
                character: character + matchedLength,
                line: line,
              },
              like: type as Text,
              offset: {
                end: offset + matchedLength,
                start: offset,
              },
              start: {
                character: character,
                line: line,
              },
              text: matchedText,
            }
            tokenList.push(token)

            textLine = textLine.slice(matchedLength)
            offset += matchedLength

            switch (type) {
              case Text.OpenInterpolation: {
                typeStack.push(TextState.Tree)
                break
              }
              case Text.CloseInterpolation: {
                typeStack.pop()
                break
              }
              case Text.OpenText: {
                typeStack.push(TextState.Text)
                break
              }
              case Text.CloseText: {
                typeStack.pop()
                break
              }
            }

            break patternLoop
          }
        }
      }
    }

    if (textLine.length) {
      api.throwError(
        api.generateSyntaxTokenError(
          source,
          tokenList[tokenList.length - 1],
        ),
      )
    }

    if (i < source.textInLines.length - 2) {
      const token: TextTokenType<Text.Line> = {
        end: {
          character: character + 1,
          line: line,
        },
        like: Text.Line,
        offset: {
          end: offset + 1,
          start: offset,
        },
        start: {
          character: character,
          line: line,
        },
        text: '\n',
      }

      line++
      character = 0

      tokenList.push(token)
    }
  }

  const token: TextTokenType<Text.Line> = {
    end: {
      character: character + 1,
      line: line,
    },
    like: Text.Line,
    offset: {
      end: offset + 1,
      start: offset,
    },
    start: {
      character: character,
      line: line,
    },
    text: '\n',
  }

  tokenList.push(token)

  return {
    ...source,
    tokenList,
  }
}
