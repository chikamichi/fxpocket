This directory contains BDD-style so-called "features", written using the [Gherkin language](https://cucumber.io/docs/reference). Features are high-level specifications describing what the app aims at, looks like and behaves like, from the user's point of view.

Descriptive features in this directory may be transformed into functional tests, for instance using [cucumber-js](https://github.com/cucumber/cucumber-js). This project does not go that extra mile, and rather sticks with using BDD features as conceptual guidelines.

Benefits:

- When discovering an existing app, reading through its features should help with grasping what the app is all about.
- When writing your own app, laying out a feature's scenario prior to implementing the required code is a great way of "nailing it down".
