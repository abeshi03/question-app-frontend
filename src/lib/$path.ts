export const pagesPath = {
  "tests": {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/tests/[id]' as const, query: { id }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/tests' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
