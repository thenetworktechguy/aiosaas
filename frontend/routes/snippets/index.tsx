import { usePocketBase } from '@/use-pocketbase'
import { Editor } from '@monaco-editor/react'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/snippets/')({
	component() {
		const pb = usePocketBase()
		const snippets = useQuery({
			queryKey: ['snippets'],
			queryFn() {
				return pb.collection('snippets').getFullList()
			},
		})

		return (
			<div className='w-full grid grid-cols-5'>
				<div className='col-span-1'>
					{snippets.data?.map((snippet) => {
						return <span key={snippet.id}>{snippet.title}</span>
					})}
				</div>
				<div className='col-span-4'>
					<Editor height={`50vh`} theme='vs-dark' language='markdown' />
				</div>
			</div>
		)
	},
})
