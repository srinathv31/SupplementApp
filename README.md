# Codename Project Asceplius
This is the codebase for the Supplement App, Vital (final name pending) [App Store Link](https://apps.apple.com/us/app/supplementapp/id1612971376). 

The goal of Vital is to assist individuals seeking to optimize their physical and mental health via a user-friendly tracking system for mood, food and water intake, supplementation and exercise. Additionally, Vital provides users with access to the latest peer-reviewed research on a variety of dietary supplements.
### Beta Invite - https://docs.google.com/forms/d/1v5-KyHnOMVaSlnyx3vvoeis8ReU-gdKghMWqVGyX2GI/edit
(if you would like to test and be involved in the future development of this app)

# Technologies
This project is built using:
| Technology        | Use Case/Reason
| ------------- |:-------------:|
| <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />      | Mobile framework to develop iOS and Android versions at once.
| <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />      | Enjoyed the typesafe and Interface characteristics of TS     
| <img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" /> | Cloud Saving, Social Authentication, In-App Messaging, Campaign Push Notifications, Analytics.       |
<img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" /> | To keep uniform code style.
<img src="https://img.shields.io/badge/App_Store-0D96F6?style=for-the-badge&logo=app-store&logoColor=white" /> | Using **App Store Connect** to release the app on iOS devices/App Store. **TestFlight** (through App Store Connect) - to beta test app with select users (up to 10,000 users).
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" /> | (Packages used listed below)

# Workflow
### **_This ensures that only stable builds are on the master branch_**

| Technology       | Step           | Action |
| ------------- |:-------------:|------------- |
| <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" /> | **Plan** | The "Projects" tab holds the kanban boards "SupplementApp MVP" [CLOSED] and "SupplementApp Beta" |
| <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" /> | **Execute** | Features, bugs, and other tasks are broken up into cards (issues) with relevant information, pictures and pull requests tagged to them. These cards are then organized from To-Do -> In-Progress -> Done, automatically as pull requests are merged to the main. |
| <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" /> | **Checks** | After PRs are merged, I created a github Actions **(.github/workflows/build.yml)** that: ***First*** (install and test): installs all npm packages, checks eslint, and runs tests. ***Second*** (build-android): builds Android Release and creates an "app-release.apk" file that can be used to run the app on any android device |

# Customer Discovery

| Source        | Action           |
| ------------- |:-------------:|
| <img src="https://img.shields.io/badge/Reddit-FF4500?style=for-the-badge&logo=reddit&logoColor=white" /> | Posting on popular subreddits on reddit.com: r/Supplements, r/reactnative |
| <img src="https://img.shields.io/badge/Google%20Sheets-34A853?style=for-the-badge&logo=google-sheets&logoColor=white" /> | Using **Google Forms** to invite users to the beta to test new features and build a list of potential customers. |

# Packages Used (npm)
### React-native Packages:
* @react-native-async-storage/async-storage
* react-native-tab-view
* react-native-webview
* victory-native
* @react-native-community/datetimepicker
* @react-native-community/slider
* react-native-calendars
* react-native-dropdown-picker
* react-native-gesture-handler
* react-native-image-picker
* react-native-linear-gradient
* react-native-modal
* react-native-modalize
* react-native-onboarding-swiper
* react-native-pager-view
* react-native-progress
* react-native-share
* react-native-swipe-gestures
* react-native-toast-message
* react-native-vector-icons
* rn-tooltip

### Firebase and Authentication Packages
* @react-native-firebase/app
* @react-native-firebase/analytics
* @react-native-firebase/auth
* @react-native-firebase/firestore
* @react-native-firebase/in-app-messaging
* @react-native-firebase/messaging
* @react-native-firebase/storage
* @react-native-google-signin/google-signin
* @invertase/react-native-apple-authentication
