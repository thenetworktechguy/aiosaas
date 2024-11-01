import { Editor } from '@monaco-editor/react'

export function EditorView(props: {
	value: string
	onChange: (content?: string) => void
}) {
	return (
		<>
			<Editor
				height={`50vh`}
				theme='vs-dark'
				language='markdown'
				onChange={props.onChange}
				value={props.value}
			/>
		</>
	)
}
