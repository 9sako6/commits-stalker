import Head from 'next/head'
import { Inter } from '@next/font/google'
import { Readme } from '../components/organisms/readme'
import { SearchForm } from '../components/organisms/search-form'
import { Commits } from '../components/organisms/commits'
import { useSearchQuery } from '../hooks/github-api'
import type { Commits as CommitsType } from '../models/commits'
import { useRouter } from 'next/router'
import { parseInputQuery } from '../lib/parse-input-query'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const { repository: rawInputQuery } = router.query
  const { owner, repository } = parseInputQuery(rawInputQuery)

  let commits: CommitsType = []
  const { isLoading, data, error, isError } = useSearchQuery({ owner, repository })

  if (isLoading) { console.log('loading...') }
  if (error) { console.error(error) }
  if (data) { commits = data }

  return (
    <>
      <Head>
        <title>Commit Stalker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={inter.className}>
        <h1>Commit Stalker Title</h1>
        <SearchForm />
        <Commits commits={commits} />
        <Readme />
      </main>
    </>
  )
}
