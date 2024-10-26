import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { App } from '../App'

const searchSchema = z.object({
	docId: z.string().optional(),
})

export const Route = createFileRoute('/')({
	validateSearch(search: Record<string, unknown>) {
		return searchSchema.parse(search)
	},
	component: () => (
		<div>
			<App />
		</div>
	),
})
