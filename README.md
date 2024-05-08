
# Bakeably - A React Native App

## Introduction

Bakeably is a **cloud based** mobile app built with React Native this is just a prototype without firebase is nothing. It's me the crazy man I built it with bunch of bugs so you can fix :), allowing users to bake better with family. This documentation serves as a guide for developers working on the Bakeably codebase.

## Getting Started

Firebase is a key in order to launch and use the app.

Database example:

```json
{
  "app": {
    "app_title": "Find the best recipe for cooking",
    "token": {
      "adUnitId": "<adUnitId-Is-Here>"
    }
  },
  "greet": {
    "description": "Let's make the best dish for the family",
    "image": "<IMAGE-URL-IS-HERE-start-with-https>",
    "title": "Cooking Experience Like A Chef"
  },
  "recipes": [
    {
      "Cooking_time": "40 mins",
      "author": "Who made this :)",
      "calories": "280kcal",
      "d_description": "5 stars, Servings 12 slices and 280kcal of Calories | 55 mins | Preparing 15 mins | Cooking 40 mins",
      "d_title": "The Perfect Chocolate Cake",
      "image": "<IMAGE-URL-IS-HERE-start-with-https>",
      "ingredients": [
        "1 ¾ cups (219 g) | all-purpose flour",
        "2 cups (400 g) | granulated sugar",
        "¾ cup (90 g) good quality unsweetened cocoa powder",
        "2 teaspoons baking soda",
        "1 teaspoon baking powder",
        "1 teaspoon kosher salt",
        "1 cup (240 g) buttermilk, room temperature",
        "½ cup (112 g) vegetable oil",
        "2 large eggs, room temperature",
        "2 teaspoons McCormick pure vanilla extract",
        "1 cup (237 g) freshly brewed hot coffee, regular or decaf, or hot water",
        "chocolate buttercream frosting"
      ],
      "ingredients_value": [
        "Preheat the oven to 350°F. Spray 2, 8-inch x 3-inch..."
      ],
      "isFavorite": false,
      "preparing_time": "15 mins",
      "rate": "5 stars",
      "servings": "12 slices"
    },
}
```

# Preview

![App Image](https://github.com/muhammadriy3d/Bakeably/blob/main/docs/UI/app01.png?raw=true)

![App Image](https://github.com/muhammadriy3d/Bakeably/blob/main/docs/UI/app02.png?raw=true)

![App Image](https://github.com/muhammadriy3d/Bakeably/blob/main/docs/UI/app03.png?raw=true)

![App Image](https://github.com/muhammadriy3d/Bakeably/blob/main/docs/UI/app04.png?raw=true)

![App Image](https://github.com/muhammadriy3d/Bakeably/blob/main/docs/UI/app05.png?raw=true)

![App Image](https://github.com/muhammadriy3d/Bakeably/blob/main/docs/UI/app06.png?raw=true)

![App Image](https://github.com/muhammadriy3d/Bakeably/blob/main/docs/UI/app07.png?raw=true)

## Prerequisites

* Node.js and npm (or Yarn) installed on your system.
* A code editor of your choice (e.g., Visual Studio Code, Atom).
* Basic understanding of React and JavaScript.
* Firebase and admob account is required so the app can run because I didn't handle null values for APIs:
   1. First make a firebase project and make an app.
   2. make .env file and add your credientials in it **See .env.example**.
   3. make an admob account and place your app id in app.json:

      ```json
      {
         "name": "Bakeably",
         "displayName": "Bakeably",
         
         "react-native-google-mobile-ads": {
            "android_app_id": "ca-app-pub-<Identifier-here>"
         }
      }
      ```

   4. or you can just fix the code :) or comment out BannerAd components but firebase is required.

## Installation

1. Clone the Bakeably repository from

   ```bash
   git clone https://github.com/muhammadriy3d/Bakeably
   ```

2. Navigate to the project directory in your terminal.

   ```bash
   cd Bakeably
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   (or using Yarn)

   ```bash
   yarn install
   ```

## Running the App

1. Start the Metro bundler:

   ```bash
   npm start
   ```

   (or using Yarn)

   ```bash
   yarn start
   ```

2. In a separate terminal window, run the app for your desired platform:

   **Android**

   ```bash
   npm run android
   ```

   (or using Yarn)

   ```bash
   yarn android
   ```

   **iOS**

   **Note:** Setting up iOS development environment requires additional steps. Refer to the official React Native documentation for details on [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup).

   Assuming you have an iOS development environment set up:

   ```bash
   npm run ios
   ```

   (or using Yarn)

   ```bash
   yarn ios
   ```

This will launch the Bakeably app in your Android device/emulator or iOS simulator.

## Code Structure

* All app code is located at `src/` directory. and each directory is a screen and `assets/` include the splash background image

## Testing

* no test has been applied yet.

## Contributing

You are welcome to contribute to this app and fix bugs. as this app contains a lot of bugs :).

1. Fork this repo
2. Make change.
3. make pull request to this repo so i can approve it and merge it.

## License

COPYRIGHTS (c) 2023 - 2024 Muhammad Riyad, All rights reserved.
