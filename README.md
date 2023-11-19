⦿ DECLARATIONS

‣ This is a single screen app in which components are being renedered conditionally. Therefore majority of the code is written in App.tsx itself. Although generally only the navigatior/sheet provider is called in the App.tsx file. In our case since there is no requirement of navigation, this practice works efficiently.
‣ Currently the app will only run on android 10 or below, because from android 11 onwards Google has removed the concept of storage permissions as they have migrated Android to scoped storage.
‣ When I first started developing the app, made some mistake in setting up the environment.(This code is present in "main" branch). When I picked up the assignment again, was able to setup succesfully.(This code is present in "master" branch). 
‣ I haven't deleted the original branch only so you can check all commits and history, but please note: "master" branch has the correct code.

⦿ RUNNING THE APP

  Method 1:
‣ Install the apk present in outputs/ and run the app in phones with Android version 10 or below, because of reasons specified above.

  Method 2:
‣ Clone the repo by using "git clone <repo url>"
‣ Switch branch to "master" using "git checkout master"
‣ Setup android emulator with Android version 10 or below, because of reasons specified above.
‣ Run "yarn"
‣ Run "yarn android"

⦿ ASSUMPTIONS MADE
‣ The user cannot edit a task once created.
‣ The app creates a file tasks.json in the user's downloads folders and modifies that file. We assume that such file does not already exist in the user's downloads folder because then the app can load irrelevant data.

⦿ DESIGN CHOICES
‣ I've followed a simple monochrome approach, to make the app look as simple as its functioning.
‣ The CTAs are all either filled or bordered.
‣ Input and Button are fixed at the bottom, the list above them is scrollable. If a user keeps on adding tasks, the input and button will stay in their place and not vanish, instead the user will have to scroll in the list component to access all tasks.
‣ Used a simple stock image for the app icon that conveys the purpose of the app.
