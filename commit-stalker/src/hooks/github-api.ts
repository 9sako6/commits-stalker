import { useQuery } from '@tanstack/react-query'
import { mdToHtml } from '../lib/md-to-html';
import { Commits } from '../models/commits';

export const URL = 'https://api.github.com'

export type SearchQueryParams = {
  owner: string;
  repository: string;
  page: number;
}

export const useSearchQuery = ({ owner, repository, page }: SearchQueryParams) =>
  useQuery({
    queryKey: ['searchCommits'],
    queryFn: () =>
      fetch(`${URL}/repos/${owner}/${repository}/commits?per_page=100&page=${page}`)
        .then(res => res.json())
        .then(json => Commits.parse(json))
        .then(async commits => await Promise.all(commits.map(async commit => {
          const html = await mdToHtml(commit.commit.message)
          commit.commit.message = html
          return commit
        }))),
    enabled: !!owner && !!repository && !!page,
    refetchOnWindowFocus: false,
  })
