# Getting BrickedUp: Smash & Collapse onto the App Store: your steps

These are the steps only you can do, on your Mac and in your Apple accounts. Everything else (the Xcode project, icon, launch screen, privacy policy, store text and screenshots) is already in this repo. Do the parts in order. The first time through takes an afternoon, plus Apple's review, which is usually one to two days.

You'll need: a Mac, your iPhone and its cable, and your Apple Developer account login.

---

## Part 1. Set up your Mac (once)

1. **Install Xcode.** Open the App Store on your Mac, search for **Xcode**, and install it. It's big, so it can take a while.
2. **Open Xcode once.** Agree to the licence. If it asks which platforms to install, tick **iOS** and let it download.
3. **Sign in to Xcode.** In Xcode, go to **Xcode > Settings > Accounts**, click **+**, choose **Apple ID**, and sign in with the Apple ID that has your Developer account. You should see your team listed with the role "Admin" or "Account Holder".
4. **Install Node.js.** Go to nodejs.org, download the **LTS** installer for macOS, and run it. This is what builds the game files into the app.

## Part 2. Get the code and build the project

5. **Get the repo onto your Mac.** The easiest way is GitHub Desktop (desktop.github.com): sign in, then **File > Clone Repository** and pick `slamdunkltd/bricked-up`. Once the pull request is merged, stay on the `main` branch. Before that, switch to the `claude/project-thread-79v8cz` branch to try it.
6. **Open Terminal** (press Cmd + Space, type Terminal, press Return).
7. **Go into the app folder.** Type `cd ` (with a space), drag the `app` folder from inside the repo onto the Terminal window, and press Return.
8. **Install and build.** Paste these one at a time, pressing Return after each and waiting for it to finish:
   ```
   npm install
   npm run sync
   npm run open
   ```
   The last one opens the project in Xcode. The first time, Xcode spends a minute fetching packages (you'll see "Resolving Package Graph" at the top). Wait until that finishes.

## Part 3. Signing (once)

9. In Xcode's left sidebar, click the blue **App** icon at the very top. In the middle, under **TARGETS**, click **App**, then the **Signing & Capabilities** tab.
10. Tick **Automatically manage signing**.
11. Next to **Team**, pick your developer team.
12. Check **Bundle Identifier** says `com.itschefff.brickedup`, the ID you registered in your Apple Developer account. If you ever change it, also change `appId` in `app/capacitor.config.json` to match, and use the new one in App Store Connect.
13. Any red error under Signing should disappear within a few seconds. If it says the bundle ID isn't registered, click **Try Again** or **Register**.

## Part 4. Try it on your iPhone

14. Plug your iPhone into the Mac and unlock it. Tap **Trust** if asked.
15. At the top of Xcode, click the device menu (it may say "Any iOS Device" or a simulator name) and pick your iPhone.
16. Press the **▶ Run** button. The first time, your iPhone asks you to turn on **Developer Mode**: go to **Settings > Privacy & Security > Developer Mode**, turn it on, and let the phone restart. Then press Run again.
17. Play a few levels and check:
    - It opens with the dark launch screen, then the game.
    - Nothing sits under the notch or Dynamic Island, and the bottom isn't under the home bar.
    - Flip the silent switch on (or the Action button set to Silent): the game should go quiet. Off: sound comes back.
    - You feel a tap on your fingers when you smash bricks.
    - Turn on Airplane Mode, close the app fully, and reopen it: it should still work and look the same.

## Part 5. Create the app in App Store Connect (once)

18. Go to **appstoreconnect.apple.com** and sign in.
19. Check **Business** (or "Agreements, Tax, and Banking"): the **Free Apps** agreement should be active. If anything there says "Action needed", do that first.
20. Click **Apps**, then the blue **+** button, then **New App**. Fill in:
    - Platforms: **iOS**
    - Name: **BrickedUp: Smash & Collapse** (you've already set this). On the home screen the app still shows as "BrickedUp".
    - Primary language: **English (U.K.)** or **English (U.S.)**
    - Bundle ID: pick `com.itschefff.brickedup` from the list (it appears once it is registered in your Developer account, or after step 13)
    - SKU: `brickedup-ios-1`
    - User access: **Full Access**
21. Fill in each page using `app/store/LISTING.md`, which has every field ready to paste:
    - **App Information**: subtitle, categories, content rights, age rating.
    - **Pricing and Availability**: Free, all countries.
    - **App Privacy**: privacy policy URL, then "No, we do not collect data".
    - **iOS App > 1.0**: screenshots, promotional text, description, keywords, support URL, copyright, and App Review notes.
22. **EU trader status.** App Store Connect will ask whether you're a trader under the EU Digital Services Act. If you sell or plan to make money from your apps as a business, you're a trader, and your address and contact details will show on the EU listing. If you aren't a trader, say so. If you'd rather not decide now, you can leave out EU countries under Pricing and Availability and add them later.

## Part 6. Upload the build

23. Back in Xcode, set the version: under **TARGETS > App > General**, **Version** should be `1.0` and **Build** `1`. (For every later upload, raise Build to 2, 3 and so on.)
24. In the device menu at the top, choose **Any iOS Device (arm64)**.
25. In the menu bar, choose **Product > Archive**. Wait for it to finish; the **Organizer** window opens.
26. Select the new archive and click **Distribute App**, then **App Store Connect**, then **Upload**. Keep the default options and click through to **Upload**.
27. Wait for the email from Apple saying the build has finished processing (usually 10 to 30 minutes).

## Part 7. Submit for review

28. In App Store Connect, open your app's **1.0** page. Scroll to **Build**, click **+**, and pick the build you uploaded. It won't ask about encryption, because the project already answers "no special encryption".
29. Optional but useful: under the **TestFlight** tab, add yourself as an internal tester and install the build through the TestFlight app, to check the exact version Apple will review.
30. Click **Add for Review**, then **Submit for Review**.
31. Wait for the email. If Apple approves, the app goes live (or you press **Release** if you chose manual release). If Apple rejects it, paste their message here and Claude will help with the fix and reply.

---

## Version 1.1: Game Center leaderboard

The code is done: the app signs players in to Game Center at launch, sends their score to the **Original** leaderboard at every game over, and has a **Leaderboard** button on the start and game over screens that opens Apple's leaderboard screen. (The website is unchanged and shows no button.) These are the steps only you can do. Do the App Store Connect part first, because the app can only post scores to a leaderboard that exists there.

**A. Create the leaderboard in App Store Connect**

1. In App Store Connect, open **BrickedUp: Smash & Collapse** and find **Game Center** in the left sidebar (under **Services** or **Features**, depending on the layout Apple shows you). If it asks, choose to use Game Center for this app (not a group).
2. Next to **Leaderboards**, click **+** and choose **Classic Leaderboard**. Fill in:
   - Reference Name: **Original**
   - Leaderboard ID: **`brickedup.original`** (exactly this; the app uses it, and it can never be changed or reused)
   - Score Format Type: **Integer**
   - Score Submission Type: **Best Score**
   - Sort Order: **High to Low**
   - Score Range: leave empty
3. Under **Leaderboard Localization**, click **+**, choose your language, and set Display Name: **Original**, Score Format: **Integer**. Leave the image empty (optional) and click **Save**.

Later play styles each get their own leaderboard the same way (for example ID `brickedup.zen`, name **Zen**). Claude adds the matching line to the game when the style is built.

**B. Build and try it on your iPhone**

4. Get the latest code (GitHub Desktop: **Fetch origin**, then **Pull** on `main`, or switch to the `claude/project-thread-v3zj1l` branch to try it before merging).
5. In Terminal, in the `app` folder: `npm run sync`, then `npm run open`.
6. In Xcode, **TARGETS > App > Signing & Capabilities** should now list **Game Center**. If it doesn't, click **+ Capability** and double-click **Game Center**. Any signing error should clear on its own; if it doesn't, click **Try Again**.
7. Run it on your iPhone (Part 4). Make sure you're signed in under **Settings > Game Center**. When the game opens you should see a "Welcome back" banner from Game Center at the top.
8. Play a quick game (tap **End game** twice to finish early), then tap **Leaderboard**. Your score should appear on **Original**. Builds run from Xcode use Apple's test (sandbox) Game Center, so these test scores never show on the real leaderboard.

**C. Release 1.1**

9. In App Store Connect, on the app page, click **+** next to **iOS App** and create version **1.1**.
10. On the **1.1** page, scroll to **Game Center**, turn it on, click **+** next to Leaderboards and add **Original**. (The leaderboard goes live with this version, so it has to be added here.)
11. Paste the **What's New** text from `app/store/LISTING.md`.
12. In Xcode, check **TARGETS > App > General** shows Version **1.1** and Build **2** (already set in the project), then upload as in Part 6 and submit as in Part 7.
13. App Privacy can stay at **Data Not Collected**: Apple runs Game Center and the app sends nothing to you. The privacy policy page on the website already mentions Game Center.

---

## Updating the app later

The App Store version does not update itself when the website changes. To ship a new version:

1. Get the latest code (in GitHub Desktop, **Fetch origin**, then **Pull**).
2. In Terminal, in the `app` folder: `npm run sync`.
3. In Xcode, raise **Version** (for example 1.1) and **Build** (for example 2).
4. Repeat Part 6 and Part 7, and fill in **What's New** for the release.
