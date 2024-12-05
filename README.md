# Filament Map Picker Testbed

This Laravel site is created solely for the purpose of testing the
[Filament Map Picker](https://github.com/dotswan/filament-map-picker) custom field for
Filament.

It has a single Model "Places" and is tested on sqlite saving lat and lng info as json in a text field.

## Setup

- Clone the repo
- `composer install`
- Create the .env adding DEV_LOGIN_NAME, DEV_LOGIN_USER, and DEV_LOGIN_PASSWORD to get an account to login to .
- `php artisan migrate:fresh --seed`

## Usage

Get the version of the map you want in vendor/dotswan/filament-map-picker and `php artisan filament:assets` to get
the correct assets in place and then test locally.

## Test Procedure

- Get the correct version/branch of the filament-map-picker installed. (See "Useful git alias" below)
- cd to that dir
- npm install
- npm run dev:scritps
- cd to project
- php artisan filament:assets
- php artisan serve
- open browser at the given url from above
- open dev tools
- make sure the "disable cache" is turned on

- Go to /find
- Does the map show
- Are there console errors, there shouldn't be
- Does changing the range draw a matching circle.
- Click on a point, remember it's location.
- click "back" on the browser, then "forward". Does the same point still show? It should.
- Submit - Do we see a lat and lng - we should

- Go to /admin/login
- Login with the details setup as per above
- Go to places
- View the "Spanish places" - do the maps show? They should.
- Are the maps all at different zoom levels?
- Go to Edit. Are all the places different? They should be.
- Press Save Do we see a confirmation notification. We should.
- Refresh the page. Are all the maps still the same as they were?
- Change Each map's selected point.
- Change each distance and see that the map it's meant for is changed, and only that map.
- Remember the points. Save. Refresh - do we see the correct points come back?
- Change Each map's selected point, remember the points.
- click "back" on the browser, then "forward". Does the same points still show? They should.
- Turn on the live position on one of the maps.
- Save the map once the animation finishes.
- Refresh the page, is your location there?

- Go to create a place.
- Are all three maps defaulting to different locations?



## Useful git alias

Run this to add the git alias `git pr {pr-number}` to get a branch of the given pull request:

```bash
 git config --global alias.pr '!f() { git fetch -fu ${2:-origin} refs/pull/$1/head:pr/$1 && git checkout pr/$1; }; f'
```
