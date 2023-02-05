import Link from 'next/link'
export const metadata = {
	title: "Portfolio",
	description: "My Projects",
};

import { getRepos } from "lib/metrics";

export default async function Portfolio() {
	const [ getRepo ] = await Promise.all([
		getRepos()
	]);
	
	return (
		<section>
			<h1 className='font-bold text-3xl'>Portfolio</h1>
			<div className='prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200'>
			{getRepo.getRepo.map((repo, index) => {
				return (
					<div key={index}>
						<h2>{repo.name}</h2>
						<Link href={repo.url}>{repo.full_name}</Link>
						<p>Stars: {repo.stars} - Watchers: {repo.watchers} - Forks {repo.forks}</p>
						<p>{repo.language}</p>
						<p>{new Date(repo.created_at).toLocaleString()}</p>
						<p>{new Date(repo.updated_at).toLocaleString()}</p>
					</div>
				);
			})}
			</div>
		</section>
	);
}
