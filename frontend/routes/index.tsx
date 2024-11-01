import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const searchSchema = z.object({
	docId: z.string().optional(),
})

export const Route = createFileRoute('/')({
	validateSearch(search: Record<string, unknown>) {
		return searchSchema.parse(search)
	},
	component: () => (
		<div>
			<h1 className='text-3xl font-bold'>Welcome to pocket-react</h1>
			<p className='py-6'>
				pocket-react is a starter kit that puts together PocketBase and React
				SPA with Vite.
			</p>
		</div>
	),
})
