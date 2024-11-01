import { CreateNoteDialog } from '@/components/create-note-dialog'
import { NotesList } from '@/components/notes-list'
import { createFileRoute } from '@tanstack/react-router'
import { createRef } from 'react'

export const Route = createFileRoute('/notes/')({
	component() {
		const dialogRef = createRef<HTMLDialogElement>()
		const inputTitleRef = createRef<HTMLInputElement>()

		return (
			<div className='w-full grid grid-cols-5'>
				<div className='col-span-1 flex flex-col gap-2 p-2'>
					<button
						className='btn btn-primary'
						type='button'
						onClick={() => {
							if (dialogRef.current) {
								dialogRef.current.showModal()
								inputTitleRef.current?.focus()
							}
						}}
					>
						Create
					</button>
					<NotesList />
				</div>
				<div className='col-span-4'>
					<p>Select a note or create a new one</p>
				</div>
				<CreateNoteDialog ref={dialogRef} inputTitleRef={inputTitleRef} />
			</div>
		)
	},
})
