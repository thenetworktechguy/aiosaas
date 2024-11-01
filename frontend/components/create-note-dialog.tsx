import { usePocketBase } from '@/use-pocketbase'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { type RefObject, forwardRef } from 'react'

export const CreateNoteDialog = forwardRef<
	HTMLDialogElement,
	{
		inputTitleRef: RefObject<HTMLInputElement>
	}
>((props, dialogRef) => {
	const pb = usePocketBase()
	const navigate = useNavigate()
	const createNotes = useMutation({
		mutationFn(params: { title: string; content: string }) {
			return pb.collection('notes').create(params)
		},
		onSuccess(data) {
			if (dialogRef && typeof dialogRef !== 'function') {
				dialogRef?.current?.close()
			}

			navigate({
				to: '/notes/$noteId',
				params: {
					noteId: data.id,
				},
			})
		},
	})

	return (
		<dialog id='my_modal_3' className='modal sm:modal-middle' ref={dialogRef}>
			<div className='modal-box'>
				<form method='dialog'>
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
						✕
					</button>
				</form>
				<h3 className='font-bold text-lg'>Create a new note</h3>
				<form
					className='pt-4 flex'
					onSubmit={(e) => {
						e.preventDefault()
						const title = new FormData(e.target as HTMLFormElement).get('title')

						if (!title) {
							return
						}

						createNotes.mutate({
							content: `# Your new note`,
							title: title.toString(),
						})
					}}
				>
					<input
						name='title'
						type='text'
						required
						placeholder='Write a title'
						className='input input-bordered w-full max-w-xs flex-2'
						ref={props.inputTitleRef}
					/>

					<button type='submit' className='btn btn-primary flex-1 ml-2'>
						Create
					</button>
				</form>
			</div>
		</dialog>
	)
})
