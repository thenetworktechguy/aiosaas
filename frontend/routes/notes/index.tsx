import { usePocketBase } from '@/use-pocketbase'
import { Editor } from '@monaco-editor/react'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { createRef } from 'react'

export const Route = createFileRoute('/notes/')({
	component() {
		const dialogRef = createRef<HTMLDialogElement>()
		const pb = usePocketBase()
		const snippets = useQuery({
			queryKey: ['notes'],
			queryFn() {
				return pb.collection('snippets').getFullList()
			},
		})

		return (
			<div className='w-full grid grid-cols-5'>
				<div className='col-span-1 grid grid-flow-col p-2'>
					<button
						className='btn btn-primary'
						type='button'
						onClick={() => {
							if (dialogRef.current) {
								dialogRef.current.showModal()
							}
						}}
					>
						Create
					</button>
					{snippets.data?.map((snippet) => {
						return <span key={snippet.id}>{snippet.title}</span>
					})}
				</div>
				<div className='col-span-4'>
					<Editor height={`50vh`} theme='vs-dark' language='markdown' />
				</div>
				<dialog id='my_modal_3' className='modal' ref={dialogRef}>
					<div className='modal-box'>
						<form method='dialog'>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
								✕
							</button>
						</form>
						<h3 className='font-bold text-lg'>Hello!</h3>
						<p className='py-4'>Press ESC key or click on ✕ button to close</p>
					</div>
				</dialog>
			</div>
		)
	},
})
