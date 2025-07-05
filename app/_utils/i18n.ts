export const I18N = defineI18N({
  en: {
    'not-found.submit-issue': 'Submit Issue',
    'not-found.caption': 'Not Found',
    'search.placeholder': 'Search',
    'lastUpdated.text': 'Last updated on',
    'toc.title': 'On this page',
    'toc.backToTop': 'Back to top',
    'themeSwitch.dark': 'Dark',
    'themeSwitch.light': 'Light',
    'themeSwitch.system': 'System',
  },
  zh: {
    'not-found.submit-issue': '提交 Issue',
    'not-found.caption': '页面未找到',
    'search.placeholder': '搜索',
    'lastUpdated.text': '最近更新于',
    'toc.title': '目录',
    'toc.backToTop': '回到顶部',
    'themeSwitch.dark': '黑暗模式',
    'themeSwitch.light': '明亮模式',
    'themeSwitch.system': '跟随系统',
  },
})

const I18N_KEYS = Object.getOwnPropertyNames(I18N)

function verifyLanguage(language: string): language is keyof typeof I18N {
  return I18N_KEYS.includes(language)
}

export function mustAccessI18N(language: string) {
  if (!verifyLanguage(language)) {
    throw new Error(`Bad language: ${language}`)
  }

  return I18N[language]
}

type Pass = unknown
type I18n = Record<string, Record<string, string>>

declare const ERROR_SYMBOL: unique symbol
interface I18nError<T extends string> {
  [ERROR_SYMBOL]: T
}

type IsEqual<A, B, T = A, F1 = B, F2 = F1> = [A] extends [B]
  ? [B] extends [A]
      ? T
      : F2
  : F1

type CheckLanguages<T extends I18n> = IsEqual<
  keyof T,
  'en' | 'zh',
  Pass,
  I18nError<'Too many language definitions'>,
  I18nError<'Missing language definitions'>
>

type GetAllTranslationKeys<T extends I18n> = {
  [K in keyof T]: keyof T[K];
}[keyof T]

type CheckTranslationKeys<
  T extends I18n,
  A extends string = GetAllTranslationKeys<T> & string,
  K = keyof {
    [K in keyof T as IsEqual<keyof T[K], A, never, K>]: never;
  },
> = IsEqual<
  K,
  never,
  Pass,
  I18nError<`Missing keys for language '${K & string}'`>
>

type ResolveInterpolations<
  T extends string,
  Res extends string = never,
> = T extends `${string}{${infer Key}}${infer Rest}`
  ? ResolveInterpolations<Rest, Res | Key>
  : Res

type CheckInterpolations<T, L extends string, V extends string> = keyof {
  [K in keyof T as IsEqual<
    T[K][L & keyof T[K]],
    ResolveInterpolations<V>,
    never,
    K
  >]: never;
}

type CheckTranslationValues<
  T extends I18n,
  U = {
    [K in keyof T]: {
      [M in keyof T[K]]: ResolveInterpolations<T[K][M]>;
    };
  },
  V = {
    [K in keyof T]: {
      [M in keyof T[K]]: CheckInterpolations<U, M & string, T[K][M]>;
    };
  },
> = IsEqual<
  never,
  {
    [K in keyof V]: {
      [M in keyof V[K]]: IsEqual<
        V[K][M],
        never,
        never,
        I18nError<`In definition of '${K & string}', translation with key '${M &
        string}' does not share the same interpolations with that of '${V[K][M] &
        string}'`>
      >;
    }[keyof V[K]];
  }[keyof V],
  unknown
>

type DoChecks<T extends I18n> = IsEqual<
  Pass,
  CheckLanguages<T>,
  IsEqual<
    Pass,
    CheckTranslationKeys<T>,
    IsEqual<Pass, CheckTranslationValues<T>>
  >
>

function defineI18N<const T extends I18n>(
  resource: {
    [K in keyof T]: { -readonly [M in keyof T[K]]: T[K][M] };
  } & DoChecks<T>,
) {
  return resource
}
