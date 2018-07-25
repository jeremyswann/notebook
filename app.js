const yargs = require('yargs')

const notes = require('./notes')

const titleOptions = {
	describe: 'Title of note',
	demand: true,
	alias: 't',
}
const argv = yargs
	.command('add', 'Add a new note', {
		title: titleOptions,
		body: {
			describe: 'Body of note',
			demand: true,
			alias: 'b',
		},
	})
	.command('list', 'List all notes')
	.command('read', 'Read a note', {
		title: titleOptions,
	})
	.command('remove', 'Remove a note', {
		title: titleOptions,
	})
	.version('1.0')
	.help().argv

const command = argv._[0]

if (command === 'add') {
	const note = notes.addNote(argv.title, argv.body)
	const message = note
		? notes.logNote('Note Created!', note)
		: 'Note title taken'
	console.log(message)
	return note
} else if (command === 'list') {
	const allNotes = notes.getAll()
	console.log(`Printing ${allNotes.length} note(s).`)
	allNotes.forEach((note, i) => {
		const message = notes.logNote(`\n[Note ${i + 1}]`, note)
		console.log(message)
	})
} else if (command === 'read') {
	const note = notes.getNote(argv.title)
	const message = note ? notes.logNote('Note Found!', note) : `Note not found`
	console.log(message)
} else if (command === 'remove') {
	const note = notes.removeNote(argv.title)
	const message = note
		? `Note Removed!\n--\nTitle: ${argv.title}`
		: `Note title doesn't exist`
	console.log(message)
} else {
	console.log('Command not recognised')
}
