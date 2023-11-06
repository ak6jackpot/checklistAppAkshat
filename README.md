Create a to-do app that allows a user to create a simple checklist, and tick items off that checklist.

Functional Requirements:

• A single task contains the text of the task itself, and a creation timestamp. Tasks are sorted by
timestamp, ascending. The content of a task can be at most 250 characters long – the textbox
must not accept more characters than that and inform users that they have reached the
character limit in an alert.

• When a task is tapped, its completion status is toggled. An incomplete task is marked as
completed when tapped, and a completed task marked as incomplete. Completed and
incomplete tasks must appear in separate, collapsible sections. When an incomplete task is
marked as complete, it should move to the completed list. When a completed task is marked as
incomplete, it should move to the incomplete list.

• Tasks both complete and incomplete should be deleted if long pressed. An alert should appear,
asking the user to confirm deletion before removing the task.

• Items in the checklist must be saved to a file such that they persist when the app is stopped and
reopened. The list in the app and in the file must be in sync at all times. The user may trigger
multiple updates at the same time before one of them concludes; your program should be able
to handle this.

Non-Functional Requirements:

• Your solution must be in TypeScript/TSX and run with React Native version 0.71.7.

• For reading/writing to the filesystem, use the react-native-fs library.

Submission Requirements:

• Submit your assignment through GitHub. Use any Git workflow you're comfortable with; your
Git history and commit practices will be reviewed as part of the submission.

• Document your code, following the JSDoc standard.

• Using ESLint, ensure your code lints with no errors (having a few warnings is fine).

• Provide a README detailing how to run your program, any assumptions you made, notes on
your design choices if any, along with any other considerations you'd like us to make while
reviewing your assignment.
